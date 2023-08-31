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
import { Link } from '@chakra-ui/react';
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
      <Heading as="h1">Authoritative articles, news, etc.</Heading>
      
      
      <VStack paddingTop="40px" spacing="2" alignItems="flex-start">
      <Heading as="h3" size="lg" color={'cyan.600'}>Gov Articles: </Heading>
      <Link href="https://www.rch.org.au/kidsinfo/fact_sheets/asthma/" 
      textDecoration="underline"
      target="_blank">
        <Text as="p" fontSize="xl">
        Kids Health Information : Asthma (rch.org.au)
          </Text>
      </Link>
      <Link href="https://asthma.org.au/what-we-do/current-projects/improving-childhood-asthma-management-in-melbourne/" 
      textDecoration="underline"
      target="_blank">
        <Text as="p" fontSize="xl">
        Improving Childhood Asthma Management in Melbourne - Asthma Australia
          </Text>
      </Link>
      <Link href="https://www.health.vic.gov.au/improving-childhood-asthma-management-in-melbournes-inner-west" 
      textDecoration="underline"
      target="_blank">
        <Text as="p" fontSize="xl">
        Improving childhood asthma management in Melbourne's inner west | health.vic.gov.au
          </Text>
      </Link>
      <Link href="https://www.aihw.gov.au/reports/children-youth/australias-children/contents/health/asthma-prevalence-children" 
      textDecoration="underline"
      target="_blank">
        <Text as="p" fontSize="xl">
        Australia's children, Asthma prevalence among children - Australian Institute of Health and Welfare (aihw.gov.au)
          </Text>
      </Link>
      <Link href="https://pubmed.ncbi.nlm.nih.gov/15012564/" 
      textDecoration="underline"
      target="_blank">
        <Text as="p" fontSize="xl">
        Asthma prevalence in Melbourne schoolchildren: have we reached the peak? - PubMed (nih.gov)
          </Text>
      </Link>
      <Link href="Childhood asthma management - North Western Melbourne Primary Health Network (nwmphn.org.au)" 
      textDecoration="underline"
      target="_blank">
        <Text as="p" fontSize="xl">
        Childhood asthma management - North Western Melbourne Primary Health Network (nwmphn.org.au)
          </Text>
      </Link>
      <Heading as="h3" size="lg" color={'cyan.600'}>News: </Heading>
      <Link href="https://www.abc.net.au/news/2023-07-26/kids-with-food-allergies-may-be-more-likely-to-develop-asthma/102651942" 
      textDecoration="underline"
      target="_blank">
        <Text as="p" fontSize="xl">
          Kids with food allergies more likely to develop asthma: research - ABC News
          </Text>
      </Link>
      <Link href="https://www.abc.net.au/news/2018-08-24/asthma-what-causes-asthmatic-children-ventolin-puffer/10156910" 
      textDecoration="underline"
      target="_blank">
        <Text as="p" fontSize="xl">
        Asthma: what causes it? Here's what we now know - ABC News
          </Text>
      </Link>
      <Link href="https://www.abc.net.au/news/health/2020-04-07/asthma-and-risk-of-severe-coronavirus-infection/12117680" 
      textDecoration="underline"
      target="_blank">
        <Text as="p" fontSize="xl">
        I have asthma. Am I more at risk of having a severe coronavirus infection? - ABC News
          </Text>
      </Link>
      <Link href="https://www.abc.net.au/news/health/2020-09-07/hay-fever-or-covid-19-coronavirus-allergies-pollen-asthma/12623060" 
      textDecoration="underline"
      target="_blank">
        <Text as="p" fontSize="xl">
        Have you got COVID-19 or hay fever? - ABC News
          </Text>
      </Link>
      <Link href="https://www.9news.com.au/asthma" 
      textDecoration="underline"
      target="_blank">
        <Text as="p" fontSize="xl">
        Asthma - 9News - Latest news and headlines from Australia and the world
          </Text>
      </Link>
      <Link href="https://www.nbcnews.com/health/health-news/asthma-deaths-rose-pandemic-climate-change-may-make-worse-rcna43798" 
      textDecoration="underline"
      target="_blank">
        <Text as="p" fontSize="xl">
        Asthma deaths rose during the pandemic. Climate change may make it worse.
          </Text>
      </Link>
        
        
      </VStack>
    </Container>
  )
}

export default ArticleList