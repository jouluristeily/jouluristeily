import { Metadata } from 'next';
import Footer from './Footer';
import ResponsiveNav from '@/components/ResponsiveNav';
import './globals.css';

export const metadata: Metadata = {
  title: 'Jouluristeily 2023',
  description: 'Luonnontieteilijöiden jouluristeily 2023',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="font-montserrat">
        <div className="flex flex-col min-h-screen min-w-screen">
          <ResponsiveNav />
          <main className="flex-grow">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
