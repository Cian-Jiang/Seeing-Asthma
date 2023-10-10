import React from 'react'
import Cards from './cards'
import Footer from '@/components/Footer'
import TriggerLibraryHeroSection from './hero'

export default function page() {
  return (
    <>
    <TriggerLibraryHeroSection/>
    <Cards/>
    <Footer/>
    </>
  )
}
