'use client'

import { Avatar, Box, Flex, Stack, Text, useColorModeValue } from '@chakra-ui/react'

export default function AboutAsthma() {
  return (

    <Stack
      bg={useColorModeValue('gray.50', 'gray.800')}
      py={16}
      px={8}
      spacing={{ base: 8, md: 10 }}
      align={'center'}
      direction={'column'}
      id="middle-section">
        <Text fontSize={{ base: '3xl', md: '3xl' }} textAlign={'center'} maxW={'5xl'} as='b' color='skyblue'>
            What is Asthma?
        </Text>
      <Text fontSize={{ base: 'xl', md: '2xl' }} textAlign={'center'} maxW={'3xl'}>
        Asthma is a medical condition that effects the airways (the tubes that transport oxygen to and from the lungs). At times, individuals with asthma have difficulty inhaling because the airways in their lungs become constricted, but at other times, their breathing is normal. 
        Asthma is incurable, but it can typically be well managed. Most individuals with asthma can maintain an active lifestyle and live a healthy existence (National Asthma Council Australia, 2019). 
          
      </Text>
        
    </Stack>
  )
}