import { google } from 'googleapis';
import { NextResponse } from 'next/server';

const propertyId = process.env.GA4_PROPERTY_ID;
const clientId = process.env.GOOGLE_CLIENT_ID;
const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
const refreshToken = process.env.GOOGLE_REFRESH_TOKEN;

async function runReport(token: string, propertyId: string, body: object) {
  const res = await fetch(
    `https://analyticsdata.googleapis.com/v1beta/properties/${propertyId}:runReport`,
    {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    }
  );
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`GA4 API ${res.status}: ${text}`);
  }
  return res.json();
}

export async function GET() {
  if (!propertyId || !clientId || !clientSecret || !refreshToken) {
    return NextResponse.json({ error: 'GA4 credentials not configured' }, { status: 503 });
  }

  try {
    // Exchange refresh token for a short-lived access token
    const auth = new google.auth.OAuth2(clientId, clientSecret);
    auth.setCredentials({ refresh_token: refreshToken });
    const { token } = await auth.getAccessToken();
    if (!token) throw new Error('Could not obtain access token');

    const [overviewData, topPagesData, conversionData, deviceData] = await Promise.all([
      // 30-day overview
      runReport(token, propertyId, {
        dateRanges: [{ startDate: '30daysAgo', endDate: 'today' }],
        metrics: [
          { name: 'sessions' },
          { name: 'totalUsers' },
          { name: 'screenPageViews' },
          { name: 'bounceRate' },
          { name: 'averageSessionDuration' },
        ],
      }),

      // Top 8 pages
      runReport(token, propertyId, {
        dateRanges: [{ startDate: '30daysAgo', endDate: 'today' }],
        dimensions: [{ name: 'pagePath' }],
        metrics: [{ name: 'screenPageViews' }, { name: 'totalUsers' }],
        orderBys: [{ metric: { metricName: 'screenPageViews' }, desc: true }],
        limit: 8,
      }),

      // Conversion events
      runReport(token, propertyId, {
        dateRanges: [{ startDate: '30daysAgo', endDate: 'today' }],
        dimensions: [{ name: 'eventName' }],
        metrics: [{ name: 'eventCount' }],
        dimensionFilter: {
          filter: {
            fieldName: 'eventName',
            inListFilter: {
              values: ['add_to_cart', 'begin_checkout', 'purchase', 'generate_lead', 'view_item'],
            },
          },
        },
      }),

      // Device breakdown
      runReport(token, propertyId, {
        dateRanges: [{ startDate: '30daysAgo', endDate: 'today' }],
        dimensions: [{ name: 'deviceCategory' }],
        metrics: [{ name: 'sessions' }],
        orderBys: [{ metric: { metricName: 'sessions' }, desc: true }],
      }),
    ]);

    // ── Parse overview ──
    const overviewRow = overviewData.rows?.[0]?.metricValues ?? [];
    const overview = {
      sessions:           parseInt(overviewRow[0]?.value ?? '0'),
      users:              parseInt(overviewRow[1]?.value ?? '0'),
      pageViews:          parseInt(overviewRow[2]?.value ?? '0'),
      bounceRate:         parseFloat(overviewRow[3]?.value ?? '0'),
      avgSessionDuration: parseFloat(overviewRow[4]?.value ?? '0'),
    };

    // ── Parse top pages ──
    const topPages = (topPagesData.rows ?? []).map((row: { dimensionValues: {value:string}[]; metricValues: {value:string}[] }) => ({
      path:  row.dimensionValues?.[0]?.value ?? '/',
      views: parseInt(row.metricValues?.[0]?.value ?? '0'),
      users: parseInt(row.metricValues?.[1]?.value ?? '0'),
    }));

    // ── Parse conversion events ──
    const eventMap: Record<string, number> = {};
    for (const row of (conversionData.rows ?? []) as { dimensionValues: {value:string}[]; metricValues: {value:string}[] }[]) {
      eventMap[row.dimensionValues?.[0]?.value ?? ''] = parseInt(row.metricValues?.[0]?.value ?? '0');
    }
    const conversions = {
      viewItem:      eventMap['view_item']      ?? 0,
      addToCart:     eventMap['add_to_cart']    ?? 0,
      beginCheckout: eventMap['begin_checkout'] ?? 0,
      purchase:      eventMap['purchase']       ?? 0,
      generateLead:  eventMap['generate_lead']  ?? 0,
    };

    // ── Parse devices ──
    const devices = (deviceData.rows ?? []).map((row: { dimensionValues: {value:string}[]; metricValues: {value:string}[] }) => ({
      device:   row.dimensionValues?.[0]?.value ?? 'unknown',
      sessions: parseInt(row.metricValues?.[0]?.value ?? '0'),
    }));

    return NextResponse.json({ overview, topPages, conversions, devices });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    console.error('[GA4 API]', message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
