import React from 'react'
import Title from './title'
import Gamelink from './game'
import ReactPlayer from 'react-player'
import Video from './video'
import Footer from "@/components/Footer";

export default function page() {
  return (
    <>
    <Title/>
    <Video/>
    {/*<Gamelink/>*/}
    <Footer/>
    </>
  )
}
