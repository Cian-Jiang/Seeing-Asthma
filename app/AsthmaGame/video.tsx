'use client';
import React from 'react'
  
import { Text } from '@chakra-ui/react';


export default function Video() {
  return (
    <>
    <Text textAlign="center" fontSize="4xl" py={10} fontWeight="bold">
        Watch the video
      </Text>
    <div style={{ display: 'flex', justifyContent: 'center' }}>
        <iframe width="560" height="315" src="https://www.youtube.com/embed/_dTtfCesHhQ?si=hB7jddSrai44tgn9" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
    </div>
    
    </>
    
  )
}
