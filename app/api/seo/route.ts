import { NextResponse } from 'next/server';

// ── Mock SEO data (replace with real Search Console integration when ready) ──

const queries = [
  { query: 'peracetic acid disinfectant uk',       clicks: 312, impressions: 4210, ctr: 7.4, position: 3.2  },
  { query: 'sky chemicals uk ltd',                  clicks: 287, impressions: 1830, ctr: 15.7, position: 1.4 },
  { query: 'professional cleaning products uk',     clicks: 198, impressions: 6540, ctr: 3.0, position: 8.1  },
  { query: 'peracide disinfectant',                 clicks: 174, impressions: 2290, ctr: 7.6, position: 2.7  },
  { query: 'hospital grade disinfectant uk',        clicks: 143, impressions: 5870, ctr: 2.4, position: 11.3 },
  { query: 'en1276 approved disinfectant',          clicks: 121, impressions: 1940, ctr: 6.2, position: 5.6  },
  { query: 'janitorial cleaning supplies wholesale',clicks:  98, impressions: 3310, ctr: 3.0, position: 14.8 },
  { query: 'defra approved disinfectant',           clicks:  87, impressions: 1560, ctr: 5.6, position: 4.9  },
  { query: 'floor cleaner commercial uk',           clicks:  76, impressions: 4890, ctr: 1.6, position: 18.2 },
  { query: 'buy chloricide disinfectant',           clicks:  64, impressions:  820, ctr: 7.8, position: 2.1  },
];

const pages = [
  { page: '/',                          clicks: 498, impressions: 8120, ctr: 6.1, position: 3.4  },
  { page: '/peracide',                  clicks: 374, impressions: 5430, ctr: 6.9, position: 2.8  },
  { page: '/products',                  clicks: 261, impressions: 4780, ctr: 5.5, position: 6.2  },
  { page: '/about',                     clicks: 189, impressions: 2940, ctr: 6.4, position: 4.1  },
  { page: '/detergents-janitorial',     clicks: 156, impressions: 3870, ctr: 4.0, position: 9.7  },
  { page: '/products/peracide-5l',      clicks: 134, impressions: 1820, ctr: 7.4, position: 3.6  },
  { page: '/products/chloricide-5l',    clicks: 112, impressions: 1540, ctr: 7.3, position: 4.2  },
  { page: '/contact',                   clicks:  98, impressions: 1230, ctr: 8.0, position: 2.3  },
  { page: '/products/viraguard-5l',     clicks:  76, impressions: 1090, ctr: 7.0, position: 5.8  },
  { page: '/products/foggable-peracide',clicks:  61, impressions:  870, ctr: 7.0, position: 7.1  },
];

// Generate 28 days of realistic daily trend data
function generateTrend() {
  const trend = [];
  const today = new Date();
  for (let i = 27; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);
    const dayOfWeek = date.getDay();
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
    // Weekend traffic dips ~40%
    const base = isWeekend ? 60 : 100;
    const jitter = () => Math.floor((Math.random() - 0.5) * 20);
    trend.push({
      date:        date.toISOString().split('T')[0],
      clicks:      Math.max(0, Math.floor(base * 0.75 + jitter())),
      impressions: Math.max(0, Math.floor(base * 12 + jitter() * 10)),
    });
  }
  return trend;
}

export async function GET() {
  const trend = generateTrend();

  const overview = {
    clicks:      queries.reduce((s, q) => s + q.clicks, 0),
    impressions: queries.reduce((s, q) => s + q.impressions, 0),
    ctr:         0.052,   // 5.2%
    position:    5.8,
  };

  return NextResponse.json({ overview, queries, pages, trend });
}
