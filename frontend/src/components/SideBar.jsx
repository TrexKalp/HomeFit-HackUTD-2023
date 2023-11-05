import React,{useState} from "react";
import {
  Box,
  Flex,
  Text,
  IconButton,
  useColorModeValue,
  Drawer,
  DrawerContent,
  useDisclosure,
  Icon,
} from "@chakra-ui/react";
import {
  FiHome,
  FiTrendingUp,
  FiCompass,
  FiStar,
  FiSettings,
  FiMenu,
} from "react-icons/fi";
import {
  BrowserRouter as Router,
  Routes, // <-- Use 'Routes' instead of 'Switch'
  Route,
  Link,
} from "react-router-dom";

import Page1 from "./Page1";
import Upload from "./Upload";
import Graphs from "./Graphs";
import Download from "./Download";

const LinkItems = [
  { name: "Home", icon: FiHome },
  { name: "Upload", icon: FiTrendingUp },
  { name: "Visualization", icon: FiCompass },
  { name: "Download", icon: FiStar },
  { name: "Settings", icon: FiSettings },
];

const SidebarContent = ({ onClose, ...rest }) => {
  return (
    <Box
      transition="3s ease"
      bg={useColorModeValue("white", "gray.900")}
      borderRight="1px"
      borderRightColor={useColorModeValue("gray.200", "gray.700")}
      w={{ base: "full", md: 60 }}
      pos="fixed"
      h="full"
      {...rest}
    >
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
        HomeFit
        </Text>
        <IconButton
          display={{ base: "flex", md: "none" }}
          onClick={onClose}
          variant="outline"
          aria-label="close menu"
          icon={<FiMenu />}
        />
      </Flex>
      {LinkItems.map((link) => (
        <NavItem key={link.name} icon={link.icon}>
          {link.name}
        </NavItem>
      ))}
    </Box>
  );
};

const NavItem = ({ icon, children, ...rest }) => {
  return (
    <Link
      to={"/" + children.toLowerCase()}
      style={{ textDecoration: "none" }}
      _focus={{ boxShadow: "none" }}
    >
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={{
          bg: "cyan.400",
          color: "white",
        }}
        {...rest}
      >
        {icon && (
          <Icon
            mr="4"
            fontSize="16"
            _groupHover={{
              color: "white",
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </Link>
  );
};

const SidebarWithHeader = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Router>
      <Box minH="100vh" bg={useColorModeValue("gray.100", "gray.900")}>
        <SidebarContent
          onClose={onClose}
          display={{ base: "none", md: "block" }}
        />
        <Drawer
          isOpen={isOpen}
          placement="left"
          onClose={onClose}
          returnFocusOnClose={false}
          onOverlayClick={onClose}
          size="full"
        >
          <DrawerContent>
            <SidebarContent onClose={onClose} />
          </DrawerContent>
        </Drawer>
        <Box ml={{ base: 0, md: 60 }} p="4">
          <Routes>
            <Route exact path="/" element={<Page1 />} />
            <Route exact path="/home" element={<Page1  />} />
            <Route path="/Upload" element={<Upload />} />
            <Route path="/visualization" element={<Graphs />} />
            <Route path="/download" element={<Download />} />
            {/*<Route path="/settings" element={<Settings />} />
            <Route path="/upload" element={<Upload />} />
            <Route path="/graphs" element={<Graphs />} /> */}
          </Routes>
        </Box>
      </Box>
    </Router>
  );
};

export default SidebarWithHeader;
