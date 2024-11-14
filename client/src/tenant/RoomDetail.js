import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  Container,
  Image,
  Text,
  VStack,
  Heading,
  Grid,
  GridItem,
  Tag,
  List,
  ListItem,
  ListIcon,
  Button,
  useToast,
  Flex,
} from "@chakra-ui/react";
import { MdCheckCircle } from "react-icons/md";
import Chat from "../components/Chat";
import { jwtDecode } from "jwt-decode";
import BookingModal from "./BookingModal"; // Tách BookingModal thành component riêng

const RoomDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const toast = useToast();
  const [room, setRoom] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [showChat, setShowChat] = useState(false);
  const [isOpenBooking, setIsOpenBooking] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setCurrentUser(decoded);
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    }
  }, []);

  useEffect(() => {
    const fetchRoomDetail = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `${process.env.REACT_APP_API}/user/rooms/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.data.success) {
          setRoom(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching room detail:", error);
        toast({
          title: "Lỗi",
          description: "Không thể tải thông tin phòng",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    };

    if (id) {
      fetchRoomDetail();
    }
  }, [id]);

  if (!room) {
    return <Center><Spinner size="xl" /></Center>;
  }

  return (
    <Container maxW="container.xl" py={8}>
      <Box bg="white" borderRadius="lg" overflow="hidden" boxShadow="lg">
        <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap={6}>
          <GridItem>
            <Image
              src={room.image}
              alt={room.roomName}
              w="100%"
              h="500px"
              objectFit="cover"
            />
          </GridItem>
          
          <GridItem p={6}>
            <VStack align="stretch" spacing={6}>
              <Heading size="lg">{room.roomTitle}</Heading>
              
              <Box>
                <Text fontSize="2xl" fontWeight="bold" color="blue.500">
                  {new Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  }).format(room.price)}
                </Text>
                <Tag
                  size="lg"
                  colorScheme={room.status === "Còn trống" ? "green" : "red"}
                  mt={2}
                >
                  {room.status}
                </Tag>
              </Box>

              <Box>
                <Text fontWeight="bold" mb={2}>Địa chỉ:</Text>
                <Text>{room.address}</Text>
              </Box>

              <Grid templateColumns="1fr 1fr" gap={4}>
                <Box>
                  <Text fontWeight="bold">Diện tích</Text>
                  <Text>{room.area} m²</Text>
                </Box>
                <Box>
                  <Text fontWeight="bold">Tiền cọc</Text>
                  <Text>
                    {new Intl.NumberFormat("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    }).format(room.deposit)}
                  </Text>
                </Box>
              </Grid>

              <Box>
                <Text fontWeight="bold" mb={2}>Tiện ích:</Text>
                <List spacing={2}>
                  {room.amenities.map((amenity, index) => (
                    <ListItem key={index}>
                      <ListIcon as={MdCheckCircle} color="green.500" />
                      {amenity}
                    </ListItem>
                  ))}
                </List>
              </Box>

              <Flex gap={4}>
                <Button
                  colorScheme="teal"
                  size="lg"
                  onClick={() => {
                    if (currentUser) {
                      setShowChat(true);
                    } else {
                      toast({
                        title: "Vui lòng đăng nhập",
                        description: "Bạn cần đăng nhập để chat với chủ trọ",
                        status: "warning",
                        duration: 3000,
                        isClosable: true,
                      });
                    }
                  }}
                >
                  Liên hệ chủ trọ
                </Button>
                <Button
                  colorScheme="blue"
                  size="lg"
                  onClick={() => {
                    if (currentUser) {
                      setIsOpenBooking(true);
                    } else {
                      toast({
                        title: "Vui lòng đăng nhập",
                        description: "Bạn cần đăng nhập để đặt lịch xem phòng",
                        status: "warning",
                        duration: 3000,
                        isClosable: true,
                      });
                    }
                  }}
                >
                  Đặt lịch xem phòng
                </Button>
              </Flex>
            </VStack>
          </GridItem>
        </Grid>
      </Box>

      {showChat && currentUser && room.landlordId && (
        <Chat
          currentUserId={currentUser.id}
          recipientId={room.landlordId.toString()}
          recipientName={room.landlordName || "Chủ trọ"}
        />
      )}

      {isOpenBooking && (
        <BookingModal
          isOpen={isOpenBooking}
          onClose={() => setIsOpenBooking(false)}
          room={room}
          currentUser={currentUser}
        />
      )}
    </Container>
  );
};

export default RoomDetail;