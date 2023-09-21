import DrawerAppBar from '@/components/DrawerAppBar';
import { Box, Stack } from '@mui/material';
import type { Metadata } from 'next';
import { Montserrat } from 'next/font/google';
import Footer from './Footer';

const MontserratFont = Montserrat({
  weight: ['400', '500', '600', '700'],
  style: 'normal',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Jouluristeily 2023',
  description: 'Luonnontieteilijöiden jouluristeily 2023',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={MontserratFont.className}>
        <Stack justifyContent="space-between" minHeight="100vh" minWidth="100vw">
          <DrawerAppBar />
          {children}
          <Footer />
        </Stack>
      </body>
    </html>
  );
}
