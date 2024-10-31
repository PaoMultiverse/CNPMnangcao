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
} from "@chakra-ui/react";
import {
  HamburgerIcon,
  BellIcon,
  ArrowForwardIcon,
  EditIcon,
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
import { IoHomeSharp, IoLogOut } from "react-icons/io5";
import { FaMoneyCheckDollar } from "react-icons/fa6";
import { MdOutlineMeetingRoom } from "react-icons/md";
import { RiParentFill } from "react-icons/ri";

function HomeLayout() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [hasNewNotification, setHasNewNotification] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isNavOpen, setIsNavOpen] = useState(true);
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    name: "Pukachu xinh dep tuyt voi",
  });
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);
  const handleMenuClick = (content) => {
    onClose();
  };
  const handleEditProfile = () => {
    navigate(`/profile-page`);
    onClose();
  };
  const menuItems = [
    { name: "Trang chủ", path: "/", icon: <IoHomeSharp /> },
    {
      name: "Quản lý cơ sở",
      path: "/hostel-management",
      icon: <FaBuilding />,
    },
    {
      name: "Quản lý nhân viên",
      path: "/employee-management",
      icon: <RiParentFill />,
    },
    {
      name: "Quản lý yêu cầu thuê phòng",
      path: "/rental-request",
      icon: <MdOutlineMeetingRoom />,
    },
    {
      name: "Danh sách khách thuê",
      path: "/tenant-list",
      icon: <FaAddressCard />,
    },
    {
      name: "Danh sách thanh toán",
      path: "/payment-list",
      icon: <FaMoneyCheckDollar />,
    },
    {
      name: "Thống kê doanh thu",
      path: "/revenue-stats",
      icon: <FaChartLine />,
    },
  ];
  

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    navigate(`/register`);
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
      h="auto"
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
            <MenuList width={"250px"} textColor={"brand.500"}>
              <MenuItem
                fontWeight={"bold"}
                onClick={handleEditProfile}
                leftIcon={<EditIcon />}
                iconSpacing="4px"
              >
                Chỉnh sửa thông tin cá nhân
              </MenuItem>
              <MenuItem
                leftIcon={<IoLogOut />}
                iconSpacing="8px"
                fontWeight={"bold"}
                onClick={handleLogout}
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

      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent textColor={"white"}>
          <DrawerCloseButton />
          <DrawerBody bg={"brand.800"}>
            <VStack align="start">
              <Flex alignItems="center" gap={2}>
                <Avatar
                  size="sm"
                  name={userData.name}
                  src="https://bit.ly/broken-link"
                  cursor="pointer"
                />
                <Text textColor={"white"} fontWeight="bold">
                  {userData.name}
                </Text>
                {/* <IconButton
                  aria-label="Notifications"
                  icon={<BellIcon />}
                  variant="ghost"
                  _hover={{ bg: "gray.400" }}
                /> */}
              </Flex>

              {menuItems.map((item) => (
                <NavLink
                  to={item.path}
                  key={item.name}
                  onClick={() => {
                    handleMenuClick(item.name);
                    onClose();
                  }}
                  style={{ width: "100%" }}
                >
                  {({ isActive }) => (
                    <Flex
                      borderRadius={8}
                      align="center"
                      gap={2}
                      padding="6px"
                      height="50px"
                      fontWeight="bold"
                      marginBlock="5px"
                      backgroundColor={isActive ? "brand.500" : "transparent"}
                      transition="background-color 0.2s ease"
                      _hover={{
                        backgroundColor: isActive ? "brand.600" : "brand.700",
                        textColor: "gray.300",
                      }}
                    >
                      <Box as="span">{item.icon}</Box>
                      <Text textColor={isActive ? "brand.0" : "brand.2"}>
                        {item.name}
                      </Text>
                    </Flex>
                  )}
                </NavLink>
              ))}
              <Divider my={4} />
              <Button
                _hover={{ bgColor: "brand.700", textColor: "gray.300" }}
                textColor={"brand.0"}
                p={2}
                variant="ghost"
                onClick={handleEditProfile}
                leftIcon={<EditIcon />}
              >
                Chỉnh sửa thông tin cá nhân
              </Button>
              <Button
                _hover={{ bgColor: "brand.700", textColor: "gray.300" }}
                textColor={"brand.0"}
                p={2}
                variant="ghost"
                onClick={handleLogout}
                leftIcon={<ArrowForwardIcon />}
              >
                Đăng xuất
              </Button>
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
      {/* sidebar */}
      <GridItem
        as="nav"
        p="2"
        bg={"brand.800"}
        area="nav"
        display={{ base: "none", md: "block" }}
        w={isNavOpen ? "300px" : "60px"}
        transition="width 0.5s ease-in-out"
        position="fixed"
        h={"100%"}
        zIndex={10}
      >
        <VStack align="start" spacing={4}>
          <Flex justify="space-between" width="100%">
            <Image
              src="../eco-house.png"
              alt="Logo"
              boxSize="150px"
              mx="auto"
              transition="transform 0.7s"
              _hover={{ transform: "scale(1.1)" }}
              display={isNavOpen ? "block" : "none"}
            />
            <IconButton
              aria-label="Toggle Nav"
              icon={isNavOpen ? <FaChevronLeft /> : <FaChevronRight />}
              transition="width 0.5s ease-in-out"
              onClick={toggleNav}
              variant="ghost"
              _hover={{ bg: "brand.500" }}
              textColor={"white"}
            />
          </Flex>
          <Collapse in={isNavOpen}>
            {menuItems.map((item) => (
              <NavLink
                className={({ isActive }) =>
                  isActive ? "navlink active-navlink" : "navlink"
                }
                to={item.path}
                key={item.name}
                onClick={() => {
                  handleMenuClick(item.name);
                  onClose();
                }}
              >
                {item.icon}
                {item.name}
              </NavLink>
            ))}
          </Collapse>
        </VStack>
      </GridItem>

      {/* content */}
      <GridItem
        as="main"
        area="main"
        ml={{ base: 0, md: isNavOpen ? "100px" : "10px" }}
        mt={{ base: 16, md: 0 }}
        p={1}
      >
        <Box bg={"white"} mr={{ base: "0", md: "10px" }} p={6}>
          <Outlet />
        </Box>
      </GridItem>
    </Grid>
  );
}

export default HomeLayout;
