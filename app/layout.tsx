"use client"
import { ChakraProvider, CSSReset } from '@chakra-ui/react';
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Navbar from '@/components/Navbar'
import './global.css';
import ScrollToTopButton from '@/components/ScrollToTopButton';

const inter = Inter({ subsets: ['latin'] })
import Head from 'next/head'


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (

    <html lang="en">
    <head>

      <link rel="shortcut icon" href="https://i.imgur.com/fW42vAv.png" />
      <title>Seeing Asthma</title>
    </head>

      <body>

        <ChakraProvider>


          <Navbar/>
          
          {children}
          <ScrollToTopButton/>
          </ChakraProvider></body>
    </html>
  )
}