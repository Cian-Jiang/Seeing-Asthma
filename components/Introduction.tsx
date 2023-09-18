'use client'
//Asthma introduction section in the homepage
import { Avatar, Box, Flex, Stack, Text, useColorModeValue } from '@chakra-ui/react'

export default function Introduction() {
  return (

    <Stack
      bg={useColorModeValue('gray.50', 'gray.800')}
      py={16}
      px={8}
      spacing={{ base: 8, md: 10 }}
      align={'center'}
      direction={'column'}>
        <Text fontSize={{ base: '3xl', md: '3xl' }} textAlign={'center'} maxW={'5xl'} as='b' color='skyblue'>
            Our Goals
        </Text>
      <Text fontSize={{ base: 'xl', md: '2xl' }} textAlign={'center'} maxW={'3xl'}>
          Asthma is a disease that can&apos;t be seen with the naked eye and has no cure, but it can usually be managed well.
          The mission of our team is to convert the invisible asthma into tangible data and information to communicate to you,
          and to better spread knowledge about asthma to children to help them and their parents live better lives.
      </Text>
        
    </Stack>
  )
}