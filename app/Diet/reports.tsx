'use client'

import {
  Container,
  SimpleGrid,
  Image,
  Flex,
  Heading,
  Text,
  Stack,
  StackDivider,
  Icon,
  useColorModeValue,
} from '@chakra-ui/react'
import { IoAnalyticsSharp, IoLogoBitcoin, IoSearchSharp } from 'react-icons/io5'
import { ReactElement } from 'react'

interface FeatureProps {
  text: string
  iconBg: string
  icon?: ReactElement
}

const Feature = ({ text, icon, iconBg }: FeatureProps) => {
  return (
    <Stack direction={'row'} align={'center'}>
      <Flex w={8} h={8} align={'center'} justify={'center'} rounded={'full'} bg={iconBg}>
        {icon}
      </Flex>
      <Text fontWeight={600}>{text}</Text>
    </Stack>
  )
}

export default function Reports() {
  return (
    <Container maxW={'5xl'} py={12}>
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
      <Flex>
          <Image
            rounded={'md'}
            alt={'feature image'}
            src={
              './MicrosoftTeams-image (5).png'
            }
            objectFit={'cover'}
          />
        </Flex>
        <Stack spacing={4}>
        
        <Heading marginTop="1">
            <Text textDecoration="none" _hover={{ textDecoration: 'none' }} color={'cyan.800'} align='center'>
            Walking  
            </Text>
          </Heading>
          <Text
            as="p"
            marginTop="2"
            color={useColorModeValue('gray.700', 'gray.200')}
            fontSize="lg"
            align='justify'>
            <strong>Benefit:</strong> Walking is a gentle form of exercise that helps in maintaining lung health and makes breathing easier.
            <br/><br/>
          
            <strong>Reason:</strong> Walking is a low-intensity aerobic exercise that is good for both the lungs as well as heart.
            <br/><br/>
            
            <strong>Caution:</strong> Walking should preferably be done in warm weather. Cold and dry air may trigger or worsen asthma symptoms. Some people may require medication before exercise. Warming up and cooling down is essential to prevent any asthma flare ups.
          </Text>
          
        </Stack>
        
      </SimpleGrid>
      <br/>
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
        <Stack spacing={4}>
          
        <Heading marginTop="1">
            <Text textDecoration="none" _hover={{ textDecoration: 'none' }} color={'cyan.800'} align='center'>
            Swimming
            </Text>
          </Heading>
          <Text
            as="p"
            marginTop="2"
            color={useColorModeValue('gray.700', 'gray.200')}
            fontSize="lg"
            align="justify">
            <strong>Benefit:</strong> Swimming is considered one of the best exercises for asthmatics due to favourable conditions inside a swimming pool.
            <br/><br/>
            <strong>Reason:</strong> Warm water and moist air can reduce the risk of asthma symptoms while exercising your lungs.
            <br/><br/>
            <strong>Caution:</strong> Chlorine in swimming pools may worsen symptoms or even cause asthma attacks in some people. Some people may require medication before exercise. Warming up before exercise and cooling down afterwards can help alleviate some symptoms.
          </Text>
          
        </Stack>
        <Flex>
          <Image
            rounded={'md'}
            alt={'feature image'}
            src={
              './MicrosoftTeams-image (4).png'
            }
            objectFit={'cover'}
          />
        </Flex>
      </SimpleGrid>
      <br/>
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
        <Flex>
          <Image
            rounded={'md'}
            alt={'feature image'}
            src={
              './Hiking.png'
            }
            objectFit={'cover'}
          />
        </Flex>
        
        <Stack spacing={4}>
          
        <Heading marginTop="1">
            <Text textDecoration="none" _hover={{ textDecoration: 'none' }} color={'cyan.800'} align='center'>
            Hiking
            </Text>
          </Heading>
          <Text
            as="p"
            marginTop="2"
            color={useColorModeValue('gray.700', 'gray.200')}
            fontSize="lg"
            align='justify'>
            <strong>Benefit:</strong> Hiking provides an opportunity to exercise in nature and enjoy fresh air.
            <br/><br/>
            <strong>Reason:</strong> Choosing a route that is relatively flat or has a slow and steady incline can provide a good way to exercise the lungs without putting too much strain on them.
            <br/><br/>
            <strong>Caution:</strong> Allergens (like pollens), cold and dry weather conditions can aggravate asthma symptoms. Some people may require pre-exercise medications may be required. It is important to follow proper warm up and cool down routines before and after the activity.
          </Text>
          
        </Stack>
        
      </SimpleGrid>
    </Container>
  )
}