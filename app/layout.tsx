import type { Metadata } from 'next';
import './globals.css';
import { CartProvider } from '@/lib/cartContext';
import { AuthProvider } from '@/lib/authContext';
import { OrdersProvider } from '@/lib/ordersContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CartDrawer from '@/components/CartDrawer';

export const metadata: Metadata = {
  title: 'Sky Chemicals UK Ltd | Professional Cleaning & Disinfection Products',
  description:
    'Sky Chemicals UK Ltd supplies high-quality, competitively priced professional cleaning and disinfection products across the UK.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <CartProvider>
            <OrdersProvider>
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
