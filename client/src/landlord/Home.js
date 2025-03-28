import React, { useState, useEffect } from "react";
import {
  Grid,
  GridItem,
  IconButton,
  Drawer,
  DrawerBody,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  VStack,
  Avatar,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Flex,
  Box,
  Badge,
  Image,
  Text,
  Collapse,
  Button,
  Divider,
  Link,
} from "@chakra-ui/react";
import {
  HamburgerIcon,
  BellIcon,
  ArrowForwardIcon,
  EditIcon,
  ChatIcon,
} from "@chakra-ui/icons";
import {
  FaBuilding,
  FaChartLine,
  FaChevronRight,
  FaChevronLeft,
  FaAddressCard,
} from "react-icons/fa";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import "../../src/index.css";
import authService from "../services/authService";
import { IoLogOut } from "react-icons/io5";
import { jwtDecode } from "jwt-decode";
import { menuItems } from "../../src/utils/menuFactory";
import authServiceTest from "../services/authServiceTest";
function HomeLayout() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [hasNewNotification, setHasNewNotification] = useState(true);
  const [isNavOpen, setIsNavOpen] = useState(true);
  const [userData, setUserData] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    if (authService.isAuthenticated()) {
      const user = authService.getUser();
      setUserData({ name: user?.name });
    }
  }, []);

  const handleLogout = () => {
    console.log(userData.data);
    authService.logout();

    navigate("/register");
  };

  const handleMenuClick = (content) => {
    onClose();
  };

  const handleEditProfile = () => {
    navigate(`/landlord/profile-page`);
    onClose();
  };

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  return (
    <Grid
      templateAreas={{
        base: `"header" 
               "main"  `,
        md: `"nav header"
             "nav main"`,
      }}
      gridTemplateRows={{ base: "auto 1fr ", md: "70px 1fr " }}
      gridTemplateColumns={{
        base: "1fr",
        md: isNavOpen ? "200px 1fr" : "50px 1fr",
      }}
      gap={4}
      bg={"brand.2"}
      minHeight="100vh"
      textAlign="center"
    >
      {/* header */}
      <GridItem
        h="70px"
        as="header"
        p={8}
        bg={"white"}
        color={"black"}
        area="header"
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        position="fixed"
        top={0}
        left={{ base: 0, md: isNavOpen ? "300px" : "60px" }}
        right={0}
        zIndex={10}
      >
        <Box ml={{ base: "0", md: "4" }}>
          <Text
            bgGradient="linear(to-l, #07c8f9, #0d41e1)"
            bgClip="text"
            fontSize={{ base: "2xl", md: "2xl", lg: "4xl" }}
            fontWeight="bold"
          >
            Hostel Community
          </Text>
        </Box>

        <Flex
          alignItems="center"
          gap={4}
          pr="4"
          display={{ base: "none", md: "flex" }}
        >
          <Box position="relative">
            <IconButton
              color="brand.1"
              aria-label="Notifications"
              icon={<BellIcon />}
              variant="ghost"
              _hover={{ bg: "gray.300" }}
            />
            {hasNewNotification && (
              <Badge
                colorScheme="red"
                position="absolute"
                top="-1"
                right="-1"
                borderRadius="full"
                boxSize="10px"
              />
            )}
          </Box>
          <Menu>
            <MenuButton>
              <Avatar size="sm" name={userData.name} cursor="pointer" />
            </MenuButton>
            <MenuButton>
              <Text fontWeight={600}>{userData.name}</Text>
            </MenuButton>
            <MenuList bgColor={"brand.2"}>
              <MenuItem
                fontWeight={"bold"}
                onClick={handleEditProfile}
                // leftIcon={<EditIcon />}
                iconSpacing="4px"
                icon={<EditIcon />}
              >
                Chỉnh sửa thông tin cá nhân
              </MenuItem>
              <MenuItem
                // leftIcon={<IoLogOut />}
                iconSpacing="8px"
                fontWeight={"bold"}
                onClick={handleLogout}
                icon={<IoLogOut />}
              >
                Đăng xuất
              </MenuItem>
            </MenuList>
          </Menu>
        </Flex>
        <IconButton
          variant={"ghost"}
          aria-label="Open Menu"
          icon={<HamburgerIcon />}
          display={{ base: "flex", md: "none" }}
          onClick={onOpen}
        />
      </GridItem>

      {/* content */}
      <GridItem
        as="main"
        area="main"
        ml={{ base: 0, md: isNavOpen ? "100px" : "10px" }}
        mt={{ base: 16, md: 0 }}
      >
        <Box
          h={"fit-content"}
          bg={"white"}
          mr={{ base: "0", md: "10px" }}
          p={{ base: 0, md: 6 }}
        >
          <Outlet />
        </Box>
      </GridItem>
    </Grid>
  );
}

export default HomeLayout;
