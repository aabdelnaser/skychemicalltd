import { BetaAnalyticsDataClient } from '@google-analytics/data';
import { NextResponse } from 'next/server';

const propertyId = process.env.GA4_PROPERTY_ID;
const clientEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
const privateKey = process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY?.replace(/\\n/g, '\n');

export async function GET() {
  if (!propertyId || !clientEmail || !privateKey) {
    return NextResponse.json({ error: 'GA4 credentials not configured' }, { status: 503 });
  }

  try {
    const analyticsClient = new BetaAnalyticsDataClient({
      credentials: { client_email: clientEmail, private_key: privateKey },
    });

    const property = `properties/${propertyId}`;

    // Run all reports in parallel
    const [overviewRes, topPagesRes, conversionRes, deviceRes] = await Promise.all([
      // 30-day overview: sessions, users, page views, bounce rate
      analyticsClient.runReport({
        property,
        dateRanges: [{ startDate: '30daysAgo', endDate: 'today' }],
        metrics: [
          { name: 'sessions' },
          { name: 'totalUsers' },
          { name: 'screenPageViews' },
          { name: 'bounceRate' },
          { name: 'averageSessionDuration' },
        ],
      }),

      // Top 8 pages by views
      analyticsClient.runReport({
        property,
        dateRanges: [{ startDate: '30daysAgo', endDate: 'today' }],
        dimensions: [{ name: 'pagePath' }],
        metrics: [{ name: 'screenPageViews' }, { name: 'totalUsers' }],
        orderBys: [{ metric: { metricName: 'screenPageViews' }, desc: true }],
        limit: 8,
      }),

      // Conversion / ecommerce events
      analyticsClient.runReport({
        property,
        dateRanges: [{ startDate: '30daysAgo', endDate: 'today' }],
        dimensions: [{ name: 'eventName' }],
        metrics: [{ name: 'eventCount' }],
        dimensionFilter: {
          filter: {
            fieldName: 'eventName',
            inListFilter: {
              values: [
                'add_to_cart',
                'begin_checkout',
                'purchase',
                'generate_lead',
                'view_item',
              ],
            },
          },
        },
      }),

      // Traffic by device
      analyticsClient.runReport({
        property,
        dateRanges: [{ startDate: '30daysAgo', endDate: 'today' }],
        dimensions: [{ name: 'deviceCategory' }],
        metrics: [{ name: 'sessions' }],
        orderBys: [{ metric: { metricName: 'sessions' }, desc: true }],
      }),
    ]);

    // ── Parse overview ──
    const overviewRow = overviewRes[0].rows?.[0]?.metricValues ?? [];
    const overview = {
      sessions: parseInt(overviewRow[0]?.value ?? '0'),
      users: parseInt(overviewRow[1]?.value ?? '0'),
      pageViews: parseInt(overviewRow[2]?.value ?? '0'),
      bounceRate: parseFloat(overviewRow[3]?.value ?? '0'),
      avgSessionDuration: parseFloat(overviewRow[4]?.value ?? '0'),
    };

    // ── Parse top pages ──
    const topPages = (topPagesRes[0].rows ?? []).map((row) => ({
      path: row.dimensionValues?.[0]?.value ?? '/',
      views: parseInt(row.metricValues?.[0]?.value ?? '0'),
      users: parseInt(row.metricValues?.[1]?.value ?? '0'),
    }));

    // ── Parse conversion events ──
    const eventMap: Record<string, number> = {};
    for (const row of conversionRes[0].rows ?? []) {
      const name = row.dimensionValues?.[0]?.value ?? '';
      eventMap[name] = parseInt(row.metricValues?.[0]?.value ?? '0');
    }
    const conversions = {
      viewItem: eventMap['view_item'] ?? 0,
      addToCart: eventMap['add_to_cart'] ?? 0,
      beginCheckout: eventMap['begin_checkout'] ?? 0,
      purchase: eventMap['purchase'] ?? 0,
      generateLead: eventMap['generate_lead'] ?? 0,
    };

    // ── Parse devices ──
    const devices = (deviceRes[0].rows ?? []).map((row) => ({
      device: row.dimensionValues?.[0]?.value ?? 'unknown',
      sessions: parseInt(row.metricValues?.[0]?.value ?? '0'),
    }));

    return NextResponse.json({ overview, topPages, conversions, devices });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    console.error('[GA4 API]', message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
