import './globals.css';
import Script from 'next/script';
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
      <head>
        <Script
          id="microsoft-clarity"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(c,l,a,r,i,t,y){
                  c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                  t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                  y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
              })(window, document, "clarity", "script", "yqcyx68dlm");
            `,
          }}
        />
      </head>
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
