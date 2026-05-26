import { google } from 'googleapis';
import { NextResponse } from 'next/server';

const siteUrl   = process.env.SEARCH_CONSOLE_SITE_URL;
const clientId  = process.env.GOOGLE_CLIENT_ID;
const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
const refreshToken = process.env.GOOGLE_REFRESH_TOKEN;

async function gscQuery(token: string, site: string, body: object) {
  const encoded = encodeURIComponent(site);
  const res = await fetch(
    `https://www.googleapis.com/webmasters/v3/sites/${encoded}/searchAnalytics/query`,
    {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    }
  );
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Search Console API ${res.status}: ${text}`);
  }
  return res.json();
}

export async function GET() {
  if (!siteUrl || !clientId || !clientSecret || !refreshToken) {
    return NextResponse.json({ error: 'Search Console credentials not configured' }, { status: 503 });
  }

  try {
    const auth = new google.auth.OAuth2(clientId, clientSecret);
    auth.setCredentials({ refresh_token: refreshToken });
    const { token } = await auth.getAccessToken();
    if (!token) throw new Error('Could not obtain access token');

    const endDate   = new Date();
    const startDate = new Date();
    startDate.setDate(endDate.getDate() - 28);
    const fmt = (d: Date) => d.toISOString().split('T')[0];

    const [overviewData, queriesData, pagesData, trendData] = await Promise.all([
      // Overall totals (no dimension)
      gscQuery(token, siteUrl, {
        startDate: fmt(startDate),
        endDate:   fmt(endDate),
      }),

      // Top 10 queries
      gscQuery(token, siteUrl, {
        startDate:  fmt(startDate),
        endDate:    fmt(endDate),
        dimensions: ['query'],
        rowLimit:   10,
        orderBy:    [{ fieldName: 'clicks', sortOrder: 'DESCENDING' }],
      }),

      // Top 10 pages
      gscQuery(token, siteUrl, {
        startDate:  fmt(startDate),
        endDate:    fmt(endDate),
        dimensions: ['page'],
        rowLimit:   10,
        orderBy:    [{ fieldName: 'clicks', sortOrder: 'DESCENDING' }],
      }),

      // Daily trend (last 28 days)
      gscQuery(token, siteUrl, {
        startDate:  fmt(startDate),
        endDate:    fmt(endDate),
        dimensions: ['date'],
        rowLimit:   28,
        orderBy:    [{ fieldName: 'date', sortOrder: 'ASCENDING' }],
      }),
    ]);

    // ── Parse overview ──
    const ov = overviewData.rows?.[0] ?? {};
    const overview = {
      clicks:      Math.round(ov.clicks ?? 0),
      impressions: Math.round(ov.impressions ?? 0),
      ctr:         parseFloat((ov.ctr ?? 0).toFixed(4)),
      position:    parseFloat((ov.position ?? 0).toFixed(1)),
    };

    // ── Parse queries ──
    const queries = (queriesData.rows ?? []).map((r: {keys:string[]; clicks:number; impressions:number; ctr:number; position:number}) => ({
      query:       r.keys[0],
      clicks:      Math.round(r.clicks),
      impressions: Math.round(r.impressions),
      ctr:         parseFloat((r.ctr * 100).toFixed(1)),
      position:    parseFloat(r.position.toFixed(1)),
    }));

    // ── Parse pages ──
    const pages = (pagesData.rows ?? []).map((r: {keys:string[]; clicks:number; impressions:number; ctr:number; position:number}) => {
      const url = r.keys[0];
      const path = url.startsWith('http') ? new URL(url).pathname : url;
      return {
        page:        path,
        clicks:      Math.round(r.clicks),
        impressions: Math.round(r.impressions),
        ctr:         parseFloat((r.ctr * 100).toFixed(1)),
        position:    parseFloat(r.position.toFixed(1)),
      };
    });

    // ── Parse daily trend ──
    const trend = (trendData.rows ?? []).map((r: {keys:string[]; clicks:number; impressions:number}) => ({
      date:        r.keys[0],
      clicks:      Math.round(r.clicks),
      impressions: Math.round(r.impressions),
    }));

    return NextResponse.json({ overview, queries, pages, trend });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    console.error('[SEO API]', message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
