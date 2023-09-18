import Image from 'next/image'
import HeroSection from '@/components/HeroSection'
import Features from '@/components/Features'
import Introduction from '@/components/Introduction'
import Footer from '@/components/Footer'
import Statistics from '@/components/Statistic'
import AboutAsthma from '@/components/AboutAsthma'
import Head from 'next/head'
export default function Home() {
  return (

    <>



    <HeroSection/>
    <AboutAsthma/>
    <Statistics/>
    <Features/>
    <Introduction/>
    <Footer/>
    </>
  )
}