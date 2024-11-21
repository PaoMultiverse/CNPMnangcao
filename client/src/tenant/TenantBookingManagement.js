import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Badge,
  Text,
  Button,
  Heading,
  useToast,
  Flex
} from '@chakra-ui/react';
import {  FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const TenantBookingManagement = () => {
  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

  const fetchBookings = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API}/booking/tenant`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        }
      );
      setBookings(response.data.data);
    } catch (error) {
      toast({
        title: "Lỗi",
        description: "Không thể tải danh sách đặt lịch",
        status: "error",
        duration: 3000,
        isClosable: true
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleRequestRental = async (bookingId) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API}/rental-request/create`,
        { bookingId },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        }
      );

      if (response.data.success) {
        toast({
          title: "Thành công",
          description: "Đã gửi yêu cầu thuê phòng",
          status: "success",
          duration: 3000,
          isClosable: true
        });
      }
    } catch (error) {
      toast({
        title: "Lỗi",
        description: error.response?.data?.message || "Không thể gửi yêu cầu thuê phòng",
        status: "error",
        duration: 3000,
        isClosable: true
      });
    }
  };
  const handleGoBack = () => {
    navigate(-1);
  };

  const navigate = useNavigate();
  return (
    <Box p={5}>
      <Flex alignItems="center" justifyContent="space-between" mb={4}>
        <Button
          onClick={handleGoBack}
          colorScheme="teal"
          leftIcon={<FaArrowLeft />}
        >
          Quay lại
        </Button> 
      </Flex>
      <Flex alignItems="center" 
        justifyContent="center" 
        mb={4} 
        flexWrap="wrap">
        <Text fontSize="2xl" fontWeight="bold">Danh sách lịch xem phòng của bạn</Text>
      </Flex>
      
      <Table variant="simple">
        <Thead bg="cyan.100">
          <Tr>
            <Th textAlign="center">Phòng</Th>
            <Th textAlign="center">Chủ trọ</Th>
            <Th textAlign="center">Ngày xem</Th>
            <Th textAlign="center">Ngày dự phòng</Th>
            <Th textAlign="center">Trạng thái</Th>
            <Th textAlign="center">Thao tác</Th>
          </Tr>
        </Thead>
        <Tbody>
          {bookings.map((booking) => (
            <Tr key={booking._id}>
              <Td textAlign="center">
                <Text fontWeight="bold">{booking.roomId?.roomName || 'N/A'}</Text>
                <Text fontSize="sm" color="gray.600">
                  {booking.roomId?.roomTitle || 'N/A'}
                </Text>
              </Td>
              <Td textAlign="center">
                <Text>{booking.landlordId?.name || 'N/A'}</Text>
                <Text fontSize="sm" color="gray.600">
                  {booking.landlordId?.email || 'N/A'}
                </Text>
              </Td>
              <Td textAlign="center">
                {booking.proposedDate 
                  ? new Date(booking.proposedDate).toLocaleString('vi-VN')
                  : 'N/A'}
              </Td>
              <Td textAlign="center">
                {booking.alternativeDate 
                  ? new Date(booking.alternativeDate).toLocaleString('vi-VN')
                  : 'Không có'}
              </Td>
              <Td textAlign="center">
                <Badge
                  colorScheme={
                    booking.status === 'pending' ? 'yellow' :
                    booking.status === 'accepted' ? 'green' : 'red'
                  }
                >
                  {booking.status === 'pending' ? 'Chờ duyệt' :
                   booking.status === 'accepted' ? 'Đã chấp nhận' : 'Đã từ chối'}
                </Badge>
              </Td>
              <Td textAlign="center">
                {booking.status === 'accepted' && (
                  <Button
                    colorScheme="blue"
                    size="sm"
                    onClick={() => handleRequestRental(booking._id)}
                  >
                    Yêu cầu thuê
                  </Button>
                )}
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      
      {bookings.length === 0 && (
        <Text textAlign="center" mt={4}>
          Bạn chưa có lịch xem phòng nào
        </Text>
      )}
    </Box>
  );
};

export default TenantBookingManagement; 