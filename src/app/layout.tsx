'use client';
import DrawerAppBar from '@/components/DrawerAppBar';
import { Box, CssBaseline, Stack, ThemeProvider } from '@mui/material';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Footer from './Footer';
import theme from '@/theme';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Jouluristeily 2023',
  description: 'Luonnontieteilijöiden jouluristeily 2023',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Stack justifyContent="space-between" minHeight="100vh" minWidth="100vw">
            <DrawerAppBar />
            <Box sx={{ px: { xs: 2, sm: 4, md: 10 }, py: 2, minHeight: '100vh' }}>{children}</Box>
            <Footer />
          </Stack>
        </ThemeProvider>
      </body>
    </html>
  );
}
