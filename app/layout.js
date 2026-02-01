'use client';

import { Inter } from 'next/font/google';
import StoreProvider from '../src/components/providers/StoreProvider';
import Header from '../src/components/common/Header';
import Footer from '../src/components/common/Footer';
import '../src/styles/globals.scss';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>Modern eCommerce - Your Ultimate Shopping Destination</title>
        <meta name="description" content="Discover amazing products at unbeatable prices." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className={inter.className}>
        <StoreProvider>
          <div className="app">
            <Header />
            <main className="main-content">
              {children}
            </main>
            <Footer />
          </div>
        </StoreProvider>
      </body>
    </html>
  );
}