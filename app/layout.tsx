import type {Metadata} from 'next';
import {Playfair_Display, Inter} from 'next/font/google';
import './globals.css'; // Global styles

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-serif',
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Shree Interior Designer | Luxury Architectural Spaces in Kharghar',
  description: 'Immersive, ultra-premium interior design styling and execution at Omkar Empire, Kharghar, Navi Mumbai.',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable} scroll-smooth`}>
      <body className="bg-[#FAF9F6] text-[#222222] font-sans antialiased selection:bg-[#D4AF37] selection:text-black min-h-screen overflow-x-hidden" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
