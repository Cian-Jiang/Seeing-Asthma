"use client"
import { ChakraProvider, CSSReset } from '@chakra-ui/react';
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Navbar from '@/components/Navbar'
import './global.css';
import ScrollToTopButton from '@/components/ScrollToTopButton';
import Head from 'next/head';

const inter = Inter({ subsets: ['latin'] })



export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <Head>
        <title>Seeing Asthma</title>
        <link rel="icon" href="/2.png" />
      </Head>
      <body>
        <ChakraProvider>
          
          <Navbar/>
          
          {children}
          <ScrollToTopButton/>
          </ChakraProvider></body>
    </html>
  )
}
