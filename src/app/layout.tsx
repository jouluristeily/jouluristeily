import DrawerAppBar from '@/components/DrawerAppBar';
import { Box } from '@mui/material';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Jouluristeily 2023',
  description: 'Luonnontieteilijöiden jouluristeily 2023',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <DrawerAppBar />
        <Box sx={{ px: { xs: 2, sm: 4, md: 10 }, py: 2 }}>{children}</Box>
      </body>
    </html>
  );
}
