'use client';
import React from 'react'
import { Text } from '@chakra-ui/react';

export default function Gamelink() {
  return (
    <>
    <Text textAlign="center" fontSize="4xl" py={10} fontWeight="bold">
        Have fun with the game
      </Text>
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <iframe
        src="https://cian-jiang.github.io/AsthmaGame/" 
        title="External Content"
        width="1024"
        height="676"
      >
        Your browser does not support iframes.
      </iframe>
    </div>
    </>
    
  )
}
