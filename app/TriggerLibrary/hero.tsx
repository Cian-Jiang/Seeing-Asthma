'use client'

import {
  Container,
  Stack,
  Flex,
  Box,
  Heading,
  Text,
  Button,
  Image,
  Icon,
  IconButton,
  createIcon,
  IconProps,
  useColorModeValue,
} from '@chakra-ui/react'

export default function TriggerLibraryHeroSection() {
  return (
      <Box textAlign="center"
           alignItems='center'
           justifyContent='center'>
          <br/>
          <br/>
          <br/>
          <br/>
          <Heading
            lineHeight={1.1}
            fontWeight={600}
            fontSize={{ base: '3xl', sm: '4xl', lg: '6xl' }}>
            <Text
              as={'span'}
              position={'relative'}
              _after={{
                content: "''",
                width: 'full',
                height: '30%',
                position: 'absolute',
                bottom: 1,
                left: 0,
                bg: 'blue.400',
                zIndex: -1,
              }}>
              Potential
            </Text>
            <br />
            <Text as={'span'} color={'blue.400'}>
              Asthma Triggers
            </Text>
          </Heading>
          
      </Box>

  )
}
