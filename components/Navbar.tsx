'use client'

import {
  Box,
  Flex,
  Text,
  IconButton,
  Button,
  Stack,
  Collapse,
  Icon,
  Popover,
  PopoverTrigger,
  PopoverContent,
  useColorModeValue,
  useBreakpointValue,
  useDisclosure,
  Image,
} from '@chakra-ui/react'
import {
  HamburgerIcon,
  CloseIcon,
  ChevronDownIcon,
  ChevronRightIcon,
} from '@chakra-ui/icons'
import { useState } from 'react'

export default function Navbar() {
  const { isOpen, onToggle } = useDisclosure()
  return (
      <Box className="sticky-navbar">
        <Flex
            bg={useColorModeValue('blue.100', 'gray.800')}
            color={useColorModeValue('gray.600', 'white')}
            minH={'60px'}
            py={{ base: 2 }}
            px={{ base: 4 }}
            borderBottom={1}
            borderStyle={'solid'}
            borderColor={useColorModeValue('gray.200', 'gray.900')}
            align={'center'}
            zIndex={10}>
            <Image src="/2.png" alt="Logo" h={8} w={8} mr={2} />
          <Flex
              flex={{ base: 1, md: 'auto' }}
              ml={{ base: -2 }}
              display={{ base: 'flex', md: 'none' }}>
            <IconButton
                onClick={onToggle}
                icon={isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />}
                variant={'ghost'}
                aria-label={'Toggle Navigation'}
            />
          </Flex>
          <Flex flex={{ base: 1 }} justify={{ base: 'center', md: 'start' }}>
            

            <Flex display={{ base: 'none', md: 'flex' }} ml={10}>
              <DesktopNav />
            </Flex>
          </Flex>


        </Flex>

        <Collapse in={isOpen} animateOpacity>
          <MobileNav />
        </Collapse>
      </Box>
  )
}

const DesktopNav = () => {
  const [selectedNavItem, setSelectedNavItem] = useState('Home');
  const linkColor = useColorModeValue('gray.600', 'gray.200')
  const linkHoverColor = useColorModeValue('gray.800', 'white')
  const popoverContentBgColor = useColorModeValue('white', 'gray.800')

  return (
      <Stack direction={'row'} spacing={4}>
        {NAV_ITEMS.map((navItem) => (
            <Box key={navItem.label}>
              <Popover trigger={'hover'} placement={'bottom-start'}>
                <PopoverTrigger>
                  <Box
                      as="a"
                      p={2}
                      href={navItem.href ?? '#'}
                      fontSize={'sm'}
                      fontWeight={500}
                      color={selectedNavItem === navItem.label ? 'blue.500' : linkColor}
                      _hover={{
                        textDecoration: 'none',
                        color: linkHoverColor,
                      }}
                      onClick={() => setSelectedNavItem(navItem.label)}>
                    {navItem.label}
                  </Box>
                </PopoverTrigger>

                {navItem.children && (
                    <PopoverContent
                        border={0}
                        boxShadow={'xl'}
                        bg={popoverContentBgColor}
                        p={4}
                        rounded={'xl'}
                        minW={'sm'}>
                      <Stack>
                        {navItem.children.map((child) => (
                            <DesktopSubNav key={child.label} {...child} />
                        ))}
                      </Stack>
                    </PopoverContent>
                )}
              </Popover>
            </Box>
        ))}
      </Stack>
  )
}

const DesktopSubNav = ({ label, href, subLabel }: NavItem) => {
  return (
      <Box
          as="a"
          href={href}
          role={'group'}
          display={'block'}
          p={2}
          rounded={'md'}
          _hover={{ bg: useColorModeValue('pink.50', 'gray.900') }}>
        <Stack direction={'row'} align={'center'}>
          <Box>
            <Text
                transition={'all .3s ease'}
                _groupHover={{ color: 'pink.400' }}
                fontWeight={500}>
              {label}
            </Text>
            <Text fontSize={'sm'}>{subLabel}</Text>
          </Box>
          <Flex
              transition={'all .3s ease'}
              transform={'translateX(-10px)'}
              opacity={0}
              _groupHover={{ opacity: '100%', transform: 'translateX(0)' }}
              justify={'flex-end'}
              align={'center'}
              flex={1}>
            <Icon color={'pink.400'} w={5} h={5} as={ChevronRightIcon} />
          </Flex>
        </Stack>
      </Box>
  )
}

const MobileNav = () => {
  const [selectedNavItem, setSelectedNavItem] = useState('Home');
  return (
      <Stack bg={useColorModeValue('white', 'gray.800')} p={4} display={{ md: 'none' }}>
        {NAV_ITEMS.map((navItem) => (
            <MobileNavItem key={navItem.label} {...navItem} />
        ))}
      </Stack>
  )
}

const MobileNavItem = ({ label, children, href }: NavItem) => {
  const { isOpen, onToggle } = useDisclosure()

  return (
      <Stack spacing={4} onClick={children && onToggle}>
        <Box
            py={2}
            as="a"
            href={href ?? '#'}
            justifyContent="space-between"
            alignItems="center"
            _hover={{
              textDecoration: 'none',
            }}>
          <Text fontWeight={600} color={useColorModeValue('gray.600', 'gray.200')}>
            {label}
          </Text>
          {children && (
              <Icon
                  as={ChevronDownIcon}
                  transition={'all .25s ease-in-out'}
                  transform={isOpen ? 'rotate(180deg)' : ''}
                  w={6}
                  h={6}
              />
          )}
        </Box>

        <Collapse in={isOpen} animateOpacity style={{ marginTop: '0!important' }}>
          <Stack
              mt={2}
              pl={4}
              borderLeft={1}
              borderStyle={'solid'}
              borderColor={useColorModeValue('gray.200', 'gray.700')}
              align={'start'}>
            {children &&
                children.map((child) => (
                    <Box as="a" key={child.label} py={2} href={child.href}>
                      {child.label}
                    </Box>
                ))}
          </Stack>
        </Collapse>
      </Stack>
  )
}

interface NavItem {
  label: string
  subLabel?: string
  children?: Array<NavItem>
  href?: string
}

const NAV_ITEMS: Array<NavItem> = [
  {
    label: 'Home',
    href: '/',
  },
  {
    label: 'About Asthma',
    href: '/AsthmaLibrary',
  },
  {
    label: 'Thunderstorm Asthma',
    href: '/AsthmaGame',
  },
  {
    label: 'What Triggers Asthma?',
    href: '/TriggerLibrary',
  },
  
  {
    label: 'Asthma Trigger',
    children: [
      
      {
        label: 'General Triggers',
        subLabel: 'Find possible triggers in your home',
        href: '/Trigger',
      },
      {
        label: 'Plants and Pets Trigger',
        subLabel: 'Check out if the plants and pets around you may cause asthma',
        href: '/Trigger/PlantPet',
      },
     
    ],
  },
  

]