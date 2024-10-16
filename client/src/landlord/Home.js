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
  Container,
  useColorMode,
} from "@chakra-ui/react";
import {
  HamburgerIcon,
  BellIcon,
  StarIcon,
  ArrowForwardIcon,
  EditIcon,
  MoonIcon,
  SunIcon,
} from "@chakra-ui/icons";
import {
  FaBuilding,
  FaUserTie,
  FaFileInvoiceDollar,
  FaChartLine,
  FaMoneyCheckAlt,
  FaChevronRight,
  FaChevronLeft,
  FaPeopleArrows,
  FaPeopleCarry,
} from "react-icons/fa";
import {
  NavLink,
  Routes,
  Route,
  Outlet,
  BrowserRouter,
  useNavigate,
} from "react-router-dom";
import HostelManagement from "./HostelManagement";
import RoomList from "./RoomList";
import "../../src/index.css";
import { IoHomeSharp } from "react-icons/io5";
import ProfilePage from "./Profile";
import HomeDashboard from "./HomeDashboard";

function HomeLayout() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [hasNewNotification, setHasNewNotification] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isNavOpen, setIsNavOpen] = useState(true);
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    name: "Pukachu xinh dep tuyt voi",
  });
  const { colorMode, toggleColorMode } = useColorMode();
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
      name: "Quản lý nhà trọ",
      path: "/facility-management",
      icon: <FaBuilding />,
    },
    {
      name: "Quản lý nhân viên",
      path: "/employee-management",
      icon: <FaUserTie />,
    },
    {
      name: "Quản lý yêu cầu thuê phòng",
      path: "/request-management",
      icon: <FaFileInvoiceDollar />,
    },
    {
      name: "Thống kê doanh thu",
      path: "/revenue-stats",
      icon: <FaChartLine />,
    },
    {
      name: "Danh sách thanh toán",
      path: "/payment-list",
      icon: <FaMoneyCheckAlt />,
    },
    {
      name: "Danh sách khách thuê",
      path: "/customer-list",
      icon: <FaPeopleCarry />,
    },
  ];

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
  };

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  return (
    <Grid
      templateAreas={{
        base: `"header" 
               "main" 
               `,
        md: `"nav header"
             "nav main"
             `,
      }}
      gridTemplateRows={{ base: "auto 1fr ", md: "70px 1fr " }}
      gridTemplateColumns={{
        base: "1fr",
        md: isNavOpen ? "200px 1fr" : "50px 1fr",
      }}
      bg={"brand.2"}
      h="auto"
      gap={4}
      color="brand.500"
      fontWeight="bold"
      textAlign="center"
    >
      {/* header */}
      <GridItem
        h="70px"
        as="header"
        p={8}
        bg={"brand.0"}
        color={"black"}
        area="header"
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        position="fixed"
        top={0}
        left={{ base: 0, md: isNavOpen ? "300px" : "60px" }}
        right={0}
        zIndex={1}
      >
        <Box ml={{ base: "0", md: "4" }}>
          <Text
            bgGradient="linear(to-l, #9fccfa, #0974f1)"
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
          {" "}
          <Button
            onClick={toggleColorMode}
            colorScheme="teal"
            variant="ghost"
            mt={4}
          >
            {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
            {colorMode === "light" ? " Dark Mode" : " Light Mode"}
          </Button>
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
            <MenuList color="white">
              <MenuItem onClick={handleEditProfile}>
                Chỉnh sửa thông tin cá nhân
              </MenuItem>
              <MenuItem onClick={handleLogout}>Đăng xuất</MenuItem>
            </MenuList>
          </Menu>
          <Text>{userData.name}</Text>
        </Flex>
        <IconButton
          aria-label="Open Menu"
          icon={<HamburgerIcon />}
          display={{ base: "flex", md: "none" }}
          onClick={onOpen}
        />
      </GridItem>

      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerBody>
            <VStack align="start" spacing={4}>
              <Flex color={"white"} alignItems="center" gap={2}>
                <Avatar
                  size="sm"
                  name={userData.name}
                  src="https://bit.ly/broken-link"
                  cursor="pointer"
                />
                <Text fontWeight="bold">{userData.name}</Text>
                <IconButton
                  aria-label="Notifications"
                  icon={<BellIcon />}
                  variant="ghost"
                  _hover={{ bg: "gray.400" }}
                />
              </Flex>

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
                  onMouseEnter={(e) => {
                    e.currentTarget.classList.add("hover");
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.classList.remove("hover");
                  }}
                >
                  {item.icon}
                  {item.name}
                </NavLink>
              ))}
              <Button
                p={2}
                variant="ghost"
                onClick={handleEditProfile}
                leftIcon={<EditIcon />}
              >
                Chỉnh sửa thông tin cá nhân
              </Button>
              <Button
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
        bg="brand.900"
        area="nav"
        display={{ base: "none", md: "block" }}
        w={isNavOpen ? "300px" : "60px"}
        position="fixed"
        h={"100%"}
      >
        <VStack align="start" spacing={4}>
          <Flex justify="space-between" width="100%">
            {/* <Text
              color={"white"}
              mx="auto"
              fontSize="2xl"
              fontWeight="bold"
              display={isNavOpen ? "block" : "none"}
            >
              Menu
            </Text> */}
            <Image
              src="../house.png"
              alt="Logo"
              boxSize="100px"
              mx="auto"
              transition="transform 0.2s"
              _hover={{ transform: "scale(1.1)" }}
              display={isNavOpen ? "block" : "none"}
            />
            <IconButton
              aria-label="Toggle Nav"
              icon={isNavOpen ? <FaChevronLeft /> : <FaChevronRight />}
              onClick={toggleNav}
              variant="ghost"
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
                onMouseEnter={(e) => {
                  e.currentTarget.classList.add("hover");
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.classList.remove("hover");
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
        ml={{ base: 0, md: isNavOpen ? "100px" : "50px" }}
        mt={{ base: 16, md: 0 }}
        p={1}
      >
        <Box bg={"white"} mr={{ base: "0", md: "20px" }} p={6}>
          <Outlet />
        </Box>
      </GridItem>
    </Grid>
  );
}

function Home() {
  return (
    <Routes>
      <Route path="/" element={<HomeLayout />}>
        <Route index element={<HomeDashboard />} />
        <Route path="facility-management" element={<HostelManagement />} />
        <Route
          path="employee-management"
          element={<Box>Quản lý nhân viên</Box>}
        />
        <Route
          path="request-management"
          element={<Box>Yêu cầu thuê phòng đang được xử lý.</Box>}
        />
        <Route
          path="revenue-stats"
          element={<Box>Thống kê doanh thu theo các tháng.</Box>}
        />
        <Route
          path="payment-list"
          element={<Box>Danh sách các giao dịch thanh toán.</Box>}
        />
        <Route
          path="customer-list"
          element={<Box>Danh sách khách thuê phòng.</Box>}
        />
        <Route path="/room-list/:facilityId" element={<RoomList />} />
        <Route path="/profile-page" element={<ProfilePage />} />
      </Route>
    </Routes>
  );
}

export default Home;
