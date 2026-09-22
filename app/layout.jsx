import './globals.css';
import { CartProvider } from '../context/CartContext';
import SiteNav from '../components/SiteNav';
import SiteFooter from '../components/SiteFooter';

export const viewport = {
  width: 'device-width',
  initialScale: 1,
};

export const metadata = {
  title: 'IVA Essentials | Ancient Rituals Reimagined for Modern Life',
  description: 'Thoughtfully curated sacred essentials for everyday devotion, meaningful journeys, and moments that matter. Assembled in Hyderabad. Rooted in Kashi.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <CartProvider>
          <SiteNav />
          <main>{children}</main>
          <SiteFooter />
        </CartProvider>
      </body>
    </html>
  );
}
