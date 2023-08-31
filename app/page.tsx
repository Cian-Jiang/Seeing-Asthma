import Image from 'next/image'
import HeroSection from '@/components/HeroSection'
import Features from '@/components/Features'
import Introduction from '@/components/Introduction'
import Footer from '@/components/Footer'
import Statistics from '@/components/Statistic'


export default function Home() {
  return (
    <>
    <HeroSection/>
    <Statistics/>
    <Features/>
    <Introduction/>
    <Footer/>

    </>
  )
}
