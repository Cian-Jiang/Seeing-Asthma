'use client'
import React, { ReactText, useState } from 'react';
import ArticleList from './content';
import {
  Box,
  CloseButton,
  Flex,
  Icon,
  useColorModeValue,
  Text,
  Drawer,
  DrawerContent,
  useDisclosure,
  IconButton,
  FlexProps, // 导入 FlexProps
} from '@chakra-ui/react';
import { FiHome, FiTrendingUp, FiCompass, FiStar, FiSettings, FiMenu } from 'react-icons/fi';
import { IconType } from 'react-icons';

interface LinkItemProps {
  name: string;
  icon: IconType;
}

const LinkItems: Array<LinkItemProps> = [
  { name: 'Home', icon: FiHome },
  { name: 'Trending', icon: FiTrendingUp },
  { name: 'Explore', icon: FiCompass },
  { name: 'Favourites', icon: FiStar },
  { name: 'Settings', icon: FiSettings },
];

interface SidebarProps {
  onClose: () => void;
  onTabClick: (tabName: string) => void;
  selectedTab: string;
}

const SidebarContent = ({ onClose, onTabClick, selectedTab }: SidebarProps) => {
  return (
    <Box
      bg={useColorModeValue('white', 'gray.900')}
      borderRight="1px"
      borderRightColor={useColorModeValue('gray.200', 'gray.700')}
      w={{ base: 'full', md: 60 }}
      pos="fixed"
      h="full"
      overflowY="auto"
    >
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
          Logo
        </Text>
        <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
      </Flex>
      {LinkItems.map((link) => (
        <NavItem
          key={link.name}
          icon={link.icon}
          onClick={() => {
            onTabClick(link.name);
            onClose();
          }}
          isActive={selectedTab === link.name}
        >
          {link.name}
        </NavItem>
      ))}
    </Box>
  );
};

interface NavItemProps {
  icon: IconType;
  children: ReactText;
  onClick: () => void;
  isActive: boolean;
}

const NavItem = ({ icon, children, onClick, isActive }: NavItemProps) => {
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
        onClick={onClick}
        _hover={{
          bg: 'cyan.400',
          color: 'white',
        }}
        bg={isActive ? 'cyan.400' : 'transparent'}
        color={isActive ? 'white' : 'inherit'}
      >
        {icon && (
          <Icon
            mr="4"
            fontSize="16"
            _groupHover={{
              color: 'white',
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </Box>
  );
};

// 更新 MobileProps 接口，添加 display 属性
interface MobileProps extends FlexProps {
  onOpen: () => void;
  display: { base: string; md: string };
}

const MobileNav = ({ onOpen, display, ...rest }: MobileProps) => {
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
      {...display} // 将 display 属性传递给 Flex 组件
      {...rest}
    >
      <IconButton variant="outline" onClick={onOpen} aria-label="open menu" icon={<FiMenu />} />
      <Text fontSize="2xl" ml="8" fontFamily="monospace" fontWeight="bold">
        Logo
      </Text>
    </Flex>
  );
};

export default function SimpleSidebar() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedTab, setSelectedTab] = useState('Home');

  const handleTabClick = (tabName: string) => {
    setSelectedTab(tabName);
  };

  return (
    <Box minH="100vh" bg={useColorModeValue('gray.100', 'gray.900')}>
      <SidebarContent onClose={onClose} onTabClick={handleTabClick} selectedTab={selectedTab} />
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
      >
        <DrawerContent>
          <SidebarContent onClose={onClose} onTabClick={handleTabClick} selectedTab={selectedTab} />
        </DrawerContent>
      </Drawer>
      <MobileNav display={{ base: 'flex', md: 'none' }} onOpen={onOpen} />
      <Box ml={{ base: 0, md: 60 }} p="4">
        {selectedTab === 'Home' && <div><ArticleList /></div>}
        {selectedTab === 'Trending' && <div>Trending 内容</div>}
        {selectedTab === 'Explore' && <div>Explore 内容</div>}
        {selectedTab === 'Favourites' && <div>Favourites 内容</div>}
        {selectedTab === 'Settings' && <div>Settings 内容</div>}
      </Box>
    </Box>
  );
}
