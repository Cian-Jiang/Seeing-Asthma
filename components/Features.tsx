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
import {QuestionIcon, StarIcon, ViewIcon } from '@chakra-ui/icons'
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
  return (
    <Container maxW={'5xl'} py={12}>
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10} spacingY='90px'>

        <Stack spacing={4}>
          <Link href="/AsthmaLibrary"
                fontWeight={600}
                fontSize={'sm'}
                bg={useColorModeValue('blue.50', 'blue.900')}
                p={2}
                alignSelf={'flex-start'}
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
            Library


          </Text>
            </Link>
          <Heading>Understanding symptoms</Heading>
          <Text color={'gray.500'} fontSize={'lg'}>
            XXXXXXX
          </Text>
          <Stack
            spacing={4}
            divider={
              <StackDivider borderColor={useColorModeValue('gray.100', 'gray.700')} />
            }>
            <Feature
              icon={<Icon as={IoAnalyticsSharp} color={'yellow.500'} w={5} h={5} />}
              iconBg={useColorModeValue('yellow.100', 'yellow.900')}
              text={'XXX'}
            />
            <Feature
              icon={<Icon as={IoLogoBitcoin} color={'green.500'} w={5} h={5} />}
              iconBg={useColorModeValue('green.100', 'green.900')}
              text={'XXX'}
            />
            <Feature
              icon={<Icon as={IoSearchSharp} color={'purple.500'} w={5} h={5} />}
              iconBg={useColorModeValue('purple.100', 'purple.900')}
              text={'XXX'}
            />
          </Stack>
        </Stack>

        <Flex>
          <Image
            rounded={'md'}
            alt={'feature image'}
            src={
              'https://images.unsplash.com/photo-1554200876-56c2f25224fa?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
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
          <Link href="/AsthmaGame"
                fontWeight={600}
                fontSize={'sm'}
                bg={useColorModeValue('blue.50', 'blue.900')}
                p={2}
                alignSelf={'flex-start'}
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
            thunderstorm asthma
          </Text>
            </Link>
          <Heading>learning in play</Heading>
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
        </Stack>

      </SimpleGrid>
    </Container>
  )
}