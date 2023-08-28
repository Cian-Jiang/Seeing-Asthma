'use client'

import {
  Box,
  Heading,
  Image,
  Text,
  Divider,
  HStack,
  Tag,
  Wrap,
  WrapItem,
  SpaceProps,
  useColorModeValue,
  Container,
  VStack,
} from '@chakra-ui/react'

interface IBlogTags {
  tags: Array<string>
  marginTop?: SpaceProps['marginTop']
}

interface Props {
  marginTop?: number
  tags: any[]
}

const BlogTags = (props: Props) => {
  const { marginTop = 0, tags } = props

  return (
    <HStack spacing={2} marginTop={marginTop}>
      {tags.map((tag) => {
        return (
          <Tag size={'md'} variant="solid" colorScheme="orange" key={tag}>
            {tag}
          </Tag>
        )
      })}
    </HStack>
  )
}

interface BlogAuthorProps {
  date: Date
  name: string
}

const BlogAuthor = (props: BlogAuthorProps) => {
  return (
    <HStack marginTop="2" spacing="2" display="flex" alignItems="center">
      <Image
        borderRadius="full"
        boxSize="40px"
        src="https://100k-faces.glitch.me/random-image"
        alt={`Avatar of ${props.name}`}
      />
      <Text fontWeight="medium">{props.name}</Text>
      <Text>—</Text>
      <Text>{props.date.toLocaleDateString()}</Text>
    </HStack>
  )
}

const ArticleList = () => {
  return (
    <Container maxW={'7xl'} p="12">
      <Heading as="h1">You have to know about asthma</Heading>
      <Box
        marginTop={{ base: '1', sm: '5' }}
        display="flex"
        flexDirection={{ base: 'column', sm: 'row' }}
        justifyContent="space-between">
        <Box
          display="flex"
          flex="1"
          marginRight="3"
          position="relative"
          alignItems="center">
          <Box
            width={{ base: '100%', sm: '85%' }}
            zIndex="2"
            marginLeft={{ base: '0', sm: '5%' }}
            marginTop="5%">
            <Box textDecoration="none" _hover={{ textDecoration: 'none' }}>
              <Image
                borderRadius="lg"
                src={
                  'https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=800&q=80'
                }
                alt="some good alt text"
                objectFit="contain"
              />
            </Box>
          </Box>
          <Box zIndex="1" width="100%" position="absolute" height="100%">
            <Box
              bgGradient={useColorModeValue(
                'radial(orange.600 1px, transparent 1px)',
                'radial(orange.300 1px, transparent 1px)',
              )}
              backgroundSize="20px 20px"
              opacity="0.4"
              height="100%"
            />
          </Box>
        </Box>
        <Box
          display="flex"
          flex="1"
          flexDirection="column"
          justifyContent="center"
          marginTop={{ base: '3', sm: '0' }}>
          
          <Heading marginTop="1">
            <Text textDecoration="none" _hover={{ textDecoration: 'none' }}>
            What is Asthma? 
            </Text>
          </Heading>
          <Text
            as="p"
            marginTop="2"
            color={useColorModeValue('gray.700', 'gray.200')}
            fontSize="lg">
            Asthma is a medical condition that effects the airways (the tubes that transport
            oxygen to and from the lungs). At times, individuals with asthma have difficulty
            inhaling because the airways in their lungs become constricted, but at other times, 
            their breathing is normal.
            Asthma is incurable, but it can typically be well managed. Most individuals with
            asthma can maintain an active lifestyle and live a healthy existence (National Asthma 
            Council Australia, 2019)
          </Text>
          
        </Box>
      </Box>
      
      <VStack paddingTop="40px" spacing="2" alignItems="flex-start">
        <Heading as="h2">Impact of Asthma</Heading>
        <Text as="p" fontSize="lg">
        All age groups are affected by the chronic respiratory disease asthma. 
        It is caused by inflammation and tightening of the muscles around the airways, 
        which results in respiratory difficulties.
        </Text>
        <Text as="p" fontSize="lg">
        People with untreated asthma may experience sleep disturbances, daytime fatigue, 
        and concentration difficulties. People with asthma and their families may miss 
        school and employment, which can have a financial impact on their families and 
        the larger community. When asthma symptoms are severe, hospitalisation for treatment 
        and observation may be necessary. In extreme circumstances, asthma can result in death.

        </Text>
        <Text as="p" fontSize="lg">
        Asthma leads to constricted airways and respiratory difficulties. It causes coughing, 
        congestion, shortness of breath, and chest tightness as well. Asthma can be controlled 
        with the proper treatment, despite being a potentially serious condition. Consult a 
        medical professional if you are experiencing asthma symptoms (World Health Organization, 2023).

        </Text>
      </VStack>

      <VStack paddingTop="40px" spacing="2" alignItems="flex-start">
        <Heading as="h2">Impact of Asthma on children</Heading>
        <Text as="p" fontSize="lg">
        Asthma is typically one of the most prevalent reasons why children visit the doctor, miss school, 
        or have to go to the hospital. About one in ten Australian adolescents have asthma. If your child&apos;s
        asthma is under control, they should be able to live a healthy and active existence (better health channel, 2012).

        </Text>
        <Heading as="h2">What are the symptoms of Asthma?</Heading>
        <Text as="p" fontSize="lg">
        Asthma symptoms are signs, effects, or feelings that occur as a result of asthma. Asthma symptoms are 
        caused by changes in the airways (breathing passages) of the lungs. These changes can lead to difficulty 
        in breathing. However, depending on the asthma patient is usually accompanied by different symptoms, while
         not all asthma patients show all symptoms.

        </Text>
        
      </VStack>
    </Container>
  )
}

export default ArticleList