import type { Metadata } from 'next';
import Script from 'next/script';
import './globals.css';
import { CartProvider } from '@/lib/cartContext';
import { AuthProvider } from '@/lib/authContext';
import { OrdersProvider } from '@/lib/ordersContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CartDrawer from '@/components/CartDrawer';
import AnalyticsProvider from '@/components/AnalyticsProvider';
import { GA_ID } from '@/lib/analytics';

export const metadata: Metadata = {
  title: 'Sky Chemicals UK Ltd | Professional Cleaning & Disinfection Products',
  description:
    'Sky Chemicals UK Ltd supplies high-quality, eco-friendly professional cleaning and disinfection products across the UK.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* Google Analytics 4 — replace G-XXXXXXXXXX with your Measurement ID */}
        {GA_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="ga4-init" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_ID}', {
                  page_path: window.location.pathname,
                  send_page_view: false
                });
              `}
            </Script>
          </>
        )}
      </head>
      <body>
        <AuthProvider>
          <CartProvider>
            <OrdersProvider>
              {/* Tracks every client-side route change as a page_view */}
              <AnalyticsProvider />
              <Header />
              <CartDrawer />
              <main className="min-h-screen">{children}</main>
              <Footer />
            </OrdersProvider>
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
