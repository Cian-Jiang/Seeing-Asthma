'use client'

import {
  Button,
  Heading,
  Text,
} from '@chakra-ui/react'

import { Card, CardHeader, CardBody, CardFooter } from '@chakra-ui/react'


import React from 'react'

export default function Cards() {
  return (
    <>
    <br/>
    <br/>
    <br/>
    <Card align='center'>
  <CardHeader>
    <Heading size='md'> Customer dashboard</Heading>
  </CardHeader>
  <CardBody>
    <Text>View a summary of all your customers over the last month.</Text>
  </CardBody>
  <CardFooter>
    <Button colorScheme='blue'>View here</Button>
  </CardFooter>
</Card>
<br/>
<Card align='center'>
  <CardHeader>
    <Heading size='md'> Customer dashboard</Heading>
  </CardHeader>
  <CardBody>
    <Text>View a summary of all your customers over the last month.</Text>
  </CardBody>
  <CardFooter>
    <Button colorScheme='blue'>View here</Button>
  </CardFooter>
</Card>
<br/>
<Card align='center'>
  <CardHeader>
    <Heading size='md'> Customer dashboard</Heading>
  </CardHeader>
  <CardBody>
    <Text>View a summary of all your customers over the last month.</Text>
  </CardBody>
  <CardFooter>
    <Button colorScheme='blue'>View here</Button>
  </CardFooter>
</Card>
    </>
    
  )
}
