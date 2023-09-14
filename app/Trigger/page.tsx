import React from 'react'
import TriggerHeroSection from './hero'
import ScrollToTopButton from '@/components/ScrollToTopButton'
// @ts-ignore
//import Upload from './image'

export default function Trigger() {
  return (
      <><TriggerHeroSection/>
          <ScrollToTopButton/>
        {/*<Upload/>*/}
      </>
  )
}
