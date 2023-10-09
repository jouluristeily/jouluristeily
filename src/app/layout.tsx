import { Metadata } from 'next';
import Footer from './Footer';
import ResponsiveNav from '@/app/ResponsiveNav';
import { Passion_One, Patua_One, Open_Sans } from 'next/font/google';
import './globals.css';

const passionOne = Passion_One({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-passionone',
});

const patuaOne = Patua_One({
  subsets: ['latin'],
  weight: ['400'],
  display: 'swap',
  variable: '--font-patuaone',
});

const openSans = Open_Sans({
  subsets: ['latin'],
  weight: ['400', '700', '800'],
  display: 'swap',
  variable: '--font-opensans',
});

export const metadata: Metadata = {
  title: 'Jouluristeily 2023',
  description: 'Luonnontieteilijöiden jouluristeily 2023',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${passionOne.variable} ${patuaOne.variable} ${openSans.variable}  font-sans`}
    >
      <body className="font-opensans">
        <div className="flex flex-col min-h-screen min-w-screen">
          <ResponsiveNav />
          <main className="flex-grow py-8">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
