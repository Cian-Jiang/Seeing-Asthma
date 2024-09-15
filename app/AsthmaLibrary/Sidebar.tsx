"use client"
import React, { ReactNode, useState } from 'react';
import {
  IconButton,
  Box,
  CloseButton,
  Flex,
  Icon,
  useColorModeValue,
  Text,
  Drawer,
  DrawerContent,
  useDisclosure,
  BoxProps,
  FlexProps,
  Button,
} from '@chakra-ui/react';
import {
  FiHome,
  FiTrendingUp,
  FiCompass,
  FiStar,
  FiSettings,
  FiMenu,
  FiArchive,
  FiUser,
  FiEye,
} from 'react-icons/fi';
import { Image } from '@chakra-ui/react';

import { IconType } from 'react-icons';
import { ReactText } from 'react';
import HomeContent from './homecontent';
import TrendingContent from './trendingcontent'
import ExploreContent from './exploreContent'
import Content from './content'
import { HamburgerIcon } from '@chakra-ui/icons';

interface LinkItemProps {
  name: string;
  icon: IconType;
  content: ReactNode; 
}

const LinkItems: Array<LinkItemProps> = [
  { name: 'Asthma in Children', icon: FiUser, content: <div><HomeContent/></div> },
  { name: 'Asthma Symptoms', icon: FiEye, content: <div><TrendingContent/></div> },
  { name: 'Live a Healthy Life', icon: FiArchive, content: <div><ExploreContent/></div> },
  { name: 'Authoritative Articles & News', icon: FiStar, content: <div><Content/></div> },
  
];

export default function Sidebar() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedTab, setSelectedTab] = useState('Asthma in Children'); 

  const handleTabClick = (name: string) => {
    setSelectedTab(name);
    onClose(); 
  };

  return (
    <>
    <br/>
    <br/>
    <Box minH="100vh" bg={useColorModeValue('gray.100', 'gray.900')}>
      <SidebarContent
        onClose={() => onClose}
        selectedTab={selectedTab}
        onTabClick={handleTabClick}
        display={{ base: 'none', md: 'block' }}
      />
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full">
        <DrawerContent>
          <SidebarContent
            onClose={onClose}
            selectedTab={selectedTab}
            onTabClick={handleTabClick}
          />
          
        </DrawerContent>
      </Drawer>
      {/* mobilenav */}
      <MobileNav display={{ base: 'flex', md: 'none' }} onOpen={onOpen} />
      <Box ml={{ base: 0, md: 60 }} p="4">
        
        {LinkItems.map((link) =>
          link.name === selectedTab ? (
            <div key={link.name}>{link.content}</div>
          ) : null
        )}
      </Box>
    </Box>
    </>
    
  );
}

interface SidebarProps extends BoxProps {
  onClose: () => void;
  selectedTab: string; 
  onTabClick: (name: string) => void; 
}

const SidebarContent = ({
  onClose,
  selectedTab,
  onTabClick,
  ...rest
}: SidebarProps) => {
  return (
    <Box
      bg={useColorModeValue('white', 'gray.900')}
      borderRight="1px"
      borderRightColor={useColorModeValue('gray.200', 'gray.700')}
      w={{ base: 'full', md: 60 }}
      pos="fixed"
      h="full"
      {...rest}>
      <br/>
      {LinkItems.map((link) => (
        <NavItem
          key={link.name}
          icon={link.icon}
          isActive={link.name === selectedTab} 
          onClick={() => onTabClick(link.name)} 
        >
          {link.name}
        </NavItem>
      ))}
    </Box>
  );
};

interface NavItemProps extends FlexProps {
  icon: IconType;
  children: ReactText;
  isActive: boolean; 
  onClick: () => void; 
}

const NavItem = ({ icon, children, isActive, onClick, ...rest }: NavItemProps) => {
  return (
    <Box
      as="a"
      href="#"
      style={{ textDecoration: 'none' }}
      _focus={{ boxShadow: 'none' }}
    >
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        bg={isActive ? 'blue.100' : 'transparent'}
        //color={isActive ? 'white' : 'currentColor'} 
        
        onClick={onClick} 
        {...rest}
      >
        {icon && (
          <Icon
            mr="4"
            fontSize="16"
            as={icon}
          />
        )}
        {children}
      </Flex>
    </Box>
  );
};

interface MobileProps extends FlexProps {
  onOpen: () => void;
}

const MobileNav = ({ onOpen, ...rest }: MobileProps) => {
  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 24 }}
      height="20"
      alignItems="center"
      bg={useColorModeValue('white', 'gray.900')}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
      justifyContent="flex-start"
      {...rest}>
      <IconButton
        variant="outline"
        onClick={onOpen}
        aria-label="open menu"
        icon={<FiMenu />}
      />
    </Flex>
  );
};
