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
      <Heading as="h1">What are the symptoms of Asthma in Children?</Heading>
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
            Overview

            </Text>
          </Heading>
          <Text
            as="p"
            marginTop="2"
            color={useColorModeValue('gray.700', 'gray.200')}
            fontSize="lg">
            Asthma symptoms in children may be more difficult to detect. Children have much smaller breathing tubes than adults. This means that even small changes in the way their airways work can have a big impact on their breathing, so this requires more attention from guardians and parents, as children are unable to tell us exactly what's going on with them, so it's more important for us to learn more about the subject and keep an eye on them when we're with them, and consult with authority on the subject to be prepared for the best possible scenario and to be aware of the signs and symptoms (Asthma Australia, 2021). 
          </Text>
          
        </Box>
      </Box>
      
      <VStack paddingTop="40px" spacing="2" alignItems="flex-start">
        <Heading as="h2">Symptoms of asthma vary from child to child and include:</Heading>
        <Heading as="h3" size="lg">Shortness of breath or difficulty breathing</Heading>

        <Text as="p" fontSize="lg">
        Think about how your child breathes when they are healthy. This makes it easier to spot symptoms when they are unwell. For all children, especially younger ones, look out for signs and symptoms of difficulty breathing or breath-holding:  

        </Text>
        <Heading as="h3" size="md">Is your child breathing through their mouth or nose?</Heading>
        <Text as="p" fontSize="lg">
        If they have a virus or a blocked nose due to allergies, breathing through their nose can be more difficult. Breathing air through their mouth may irritate their small breathing tubes when their nose can't filter, warm, or moisten the air they breathe.
        </Text>
        <Heading as="h3" size="md">Changes in the way your child breathes: </Heading>
        <Text as="p" fontSize="lg">
        Observe their body as they breathe. Are they breathing faster than usual, or do they make a sound when they breathe? 
Are they using their body to help them breathe? For example, lifting their shoulders while breathing.

        </Text>
        <Heading as="h3" size="md">Please observe the following symptoms in depth: </Heading>
        <Text as="p" fontSize="lg">
        Does your child get out of breath while playing, or does it take longer than usual to catch their breath?<br />
Is your child avoiding activities because they are having trouble breathing?<br />
Are they quieter or more irritable than usual?<br />
Have they said they have a tummy ache?<br />

High priority: More serious signs that your child is having trouble breathing and needs emergency help include:<br />

Breathing in and out of the soft area at the bottom of the throat (where it meets the chest) <br />
Drawing in or jerking up and down the abdomen <br />
Muscles between the ribs are sucked in when breathing <br />
Blue lips <br />
Inability to finish a sentence or eat because of difficulty breathing <br />
        </Text>
        <Text as="p" fontSize="lg">Any sign of difficulty breathing should be seen by a doctor. These symptoms help the doctor understand your child's condition and decide what treatment is best for them. It is important to tell the doctor about all of your child's symptoms, even if you think they are normal. </Text>
        <Heading as="h3" size="md">Wheezing </Heading>
        <Text as="p" fontSize="lg">
        Wheezing is a high-pitched whistling sound made when the airway is narrowed. It is sometimes easy to hear, or the doctor may hear it when listening to your child's breathing with a stethoscope. Wheezing can be caused by many things, including asthma. However, not all children with asthma will wheeze. 

        </Text>
        <Text as="p" fontSize="lg">
        Asthma is more likely if it occurs <br />
        <br />
Is very frequent <br />
Is worse at night or early in the morning <br />
Occurs when your child doesn't have a cold <br />
Responds to a certain trigger.<br />
Consult your doctor if your child is wheezing.<br />


        </Text>
        <Heading as="h3" size="md">Cough </Heading>
        <Text as="p" fontSize="lg">
        There are many causes and different types of coughs in children. Sometimes coughing up mucus or phlegm. Regardless of the sound of the cough, consult your doctor if your child has any of the following conditions <br />

Has a persistent or long-lasting cough <br />
Coughing only at night or early in the morning <br />
Coughs during sports or activities <br />
Coughs when excited or laughing.<br />

        </Text>
        <Heading as="h3" size="md">Chest tightness </Heading>
        <Text as="p" fontSize="lg">
        When the airways are very narrow and it is difficult for air to move in and out, children may feel tightness in their chest. This may make them feel like there is a weight on their chest. Your child may say "I don't feel good" or "I have a tummy ache".
        </Text>
        <Text as="p" fontSize="lg">
        High priority: If your child or a child in your care is experiencing this symptom, it's important to see a doctor to check their symptoms or seek a diagnosis.

        </Text>
        <Text as="p" fontSize="lg">
        What causes asthma?<br />

Experts aren't sure why some people get asthma and others don't. You are more likely to develop asthma if someone in your immediate family has asthma, hay fever, allergies, or eczema (Healthdirect, 2019).

        </Text>
        <Text as="p" fontSize="lg">
        Children are at a higher risk of developing asthma if they are<br />
        They are born prematurely or with a low birth weight<br />
The mother smoked during the pregnancy<br />
lived with a smoker<br />
Have been exposed to air pollution or mold<br />

        </Text>
      </VStack>
    </Container>
  )
}

export default ArticleList