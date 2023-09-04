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
  SkipNavLink,
  Link,
} from '@chakra-ui/react'
import { IoAnalyticsSharp, IoLogoBitcoin, IoSearchSharp } from 'react-icons/io5'
import { ReactElement } from 'react'
import {InfoIcon, QuestionIcon, StarIcon, ViewIcon, WarningIcon } from '@chakra-ui/icons'
import App from 'next/app'

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

export default function Features() {
  // @ts-ignore
  return (
    <Container maxW={'5xl'} py={12}>
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10} spacingY='90px'>

        <Stack spacing={4}   >
          
          <Heading>Understanding symptoms</Heading>
          <Text color={'gray.500'} fontSize={'lg'}>
            We provide authoritative artivles for you to learn about Asthma and expecially Asthma on children so that you can protect you kids.
          </Text>
          <Stack
            spacing={4}
            divider={
              <StackDivider borderColor={useColorModeValue('gray.100', 'gray.700')} />
            }>
            <Feature
              icon={<Icon as={InfoIcon} color={'yellow.500'} w={5} h={5} />}
              iconBg={useColorModeValue('yellow.100', 'yellow.900')}
              text={'Information About Asthma'}
            />
            <Feature
              icon={<Icon as={WarningIcon} color={'green.500'} w={5} h={5} />}
              iconBg={useColorModeValue('green.100', 'green.900')}
              text={'Asthma symptoms'}
            />
            <Feature
              icon={<Icon as={IoSearchSharp} color={'purple.500'} w={5} h={5} />}
              iconBg={useColorModeValue('purple.100', 'purple.900')}
              text={'Asthma in Children'}
            />
          </Stack>
          <br/>
          <Link href="/AsthmaLibrary"
                fontWeight={600}
                fontSize={'sm'}
                bg={useColorModeValue('blue.50', 'blue.900')}
                p={2}
                alignSelf={'center'}
                rounded={'md'}>
          <Text
            textTransform={'uppercase'}
            color={'blue.400'}
            fontWeight={600}
            fontSize={'sm'}
            bg={useColorModeValue('blue.50', 'blue.900')}
            p={2}
            alignSelf={'flex-start'}
            rounded={'md'}>
            Click to learn about Asthma


          </Text>
          </Link>
        </Stack>
        

        <Flex>
          <Image
            rounded={'md'}
            alt={'feature image'}
            src={
              'https://i.imgur.com/rxLEeoM.jpg'
            }
            objectFit={'cover'}
          />
        </Flex>
        <Flex>
        <Image
            rounded={'md'}
            alt={'image'}
            src={
              'https://i.imgur.com/luhDUTJ.jpg'
            }
            objectFit={'cover'}
        />
      </Flex>

        <Stack spacing={4}>
          
          <Heading>Learning in game</Heading>
          <Text color={'gray.500'} fontSize={'lg'}>
            Epidemic thunderstorm asthma is thought to be triggered by an uncommon combination of high pollen levels
            and a certain type of thunderstorm, causing a large number of people to develop asthma symptoms over a
            short period of time.
          </Text>
          <Stack
              spacing={4}
              divider={
                <StackDivider borderColor={useColorModeValue('gray.100', 'gray.700')} />
              }>
            <Feature
                icon={<Icon as={ViewIcon} color={'yellow.500'} w={5} h={5} />}
                iconBg={useColorModeValue('yellow.100', 'yellow.900')}
                text={'Watch a cartoon about thunderstorm asthma'}
            />
            <Feature
                icon={<Icon as={StarIcon} color={'green.500'} w={5} h={5} />}
                iconBg={useColorModeValue('green.100', 'green.900')}
                text={'Consolidate knowledge by playing game'}
            />
            <Feature
                icon={<Icon as={QuestionIcon} color={'purple.500'} w={5} h={5} />}
                iconBg={useColorModeValue('purple.100', 'purple.900')}
                text={'Expand brain in thinking questions'}
            />
          </Stack>
          <br/>
          <Link href="/AsthmaGame"
                fontWeight={600}
                fontSize={'sm'}
                bg={useColorModeValue('blue.50', 'blue.900')}
                p={2}
                alignSelf={'center'}
                rounded={'md'}>
          <Text
              textTransform={'uppercase'}
              color={'blue.400'}
              fontWeight={600}
              fontSize={'sm'}
              bg={useColorModeValue('blue.50', 'blue.900')}
              p={2}
              alignSelf={'flex-start'}
              rounded={'md'}>
           Click to start journey to prevention it
          </Text>
            </Link>
        </Stack>

      </SimpleGrid>
    </Container>
  )
}
