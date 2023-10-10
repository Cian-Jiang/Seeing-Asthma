'use client'

import {
    Avatar,
    Box,
    chakra,
    Container,
    Stack,
    Text,
    useColorModeValue,
    VisuallyHidden,
} from '@chakra-ui/react'
import { FaInstagram, FaTwitter, FaYoutube, FaEnvelopeOpenText } from 'react-icons/fa'
import { ReactNode } from 'react'

const SocialButton = ({
  children,
  label,
  href,
}: {
  children: ReactNode
  label: string
  href: string
}) => {
  return (
    <chakra.button
      bg={useColorModeValue('blackAlpha.100', 'whiteAlpha.100')}
      rounded={'full'}
      w={8}
      h={8}
      cursor={'pointer'}
      as={'a'}
      href={href}
      display={'inline-flex'}
      alignItems={'center'}
      justifyContent={'center'}
      transition={'background 0.3s ease'}
      _hover={{
        bg: useColorModeValue('blackAlpha.200', 'whiteAlpha.200'),
      }}>
      <VisuallyHidden>{label}</VisuallyHidden>
      {children}
    </chakra.button>
  )
}

export default function Footer() {
  return (
    <Box
      bg={useColorModeValue('gray.250', 'gray.800')}
      color={useColorModeValue('gray.700', 'gray.200')}>
      <Container
        as={Stack}
        // maxW={'6xl'}
        py={4}
        direction={{ base: 'column', md: 'column' }}
        spacing={4}
        justify={{ base: 'center', md: 'space-between' }}
        align={{ base: 'center', md: 'center' }}>
          <br/>
          <Avatar
              size="2xl"
              src={
                  '/MicrosoftTeams-image (2).png'
              }
              mb={4}
          />
          <Text fontWeight={600}>Seeing Asthma</Text>
        <Text>© 2023 health coder </Text>
        <Stack direction={'row'} spacing={6}>
          {/*<SocialButton label={'Twitter'} href={'#'}>*/}
          {/*  <FaTwitter />*/}
          {/*</SocialButton>*/}
          <SocialButton label={'YouTube'} href={'https://www.youtube.com/channel/UC31qrqvS8rh_SvUVrUY0XQw'}>

            <FaYoutube />
          </SocialButton>
          <SocialButton label={'Instagram'} href={'https://mahara.infotech.monash.edu/group/view.php?id=2416'}>
            <FaEnvelopeOpenText />
          </SocialButton>
        </Stack>
      </Container>
    </Box>
  )
}