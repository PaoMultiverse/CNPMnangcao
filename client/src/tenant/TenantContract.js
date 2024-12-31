import React, { useState, useEffect } from "react";
import {
  Box,
  Text,
  VStack,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Tag,
  Divider,
  Spinner,
  useToast,
  Button,
  Flex,
<<<<<<< HEAD
  Tooltip // Thêm Tooltip
=======
>>>>>>> 052174f3d35adcef1b69ad8f3ca58ef13571e8e9
} from "@chakra-ui/react";
import axios from "axios";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function TenantContract() {
  const [contracts, setContracts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const toast = useToast();
  const navigate = useNavigate();

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "active":
        return "green";
      case "expired":
        return "red";
      case "pending":
        return "yellow";
      default:
        return "gray";
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("vi-VN");
  };

  useEffect(() => {
    const fetchContracts = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API}/user/tenant/contracts`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        if (response.data.success) {
          setContracts(response.data.data);
        }
      } catch (error) {
        toast({
          title: "Lỗi",
          description: "Không thể tải thông tin hợp đồng",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchContracts();
  }, [toast]);

  if (isLoading) {
    return (
      <Box textAlign="center" py={10}>
        <Spinner size="xl" />
      </Box>
    );
  }

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <Box p={4}>
      {/* Nút Quay lại */}
      <Flex alignItems="center" justifyContent="space-between" mb={4}>
        <Button
          onClick={handleGoBack}
          colorScheme="teal"
          leftIcon={<FaArrowLeft />}
        >
          Quay lại
        </Button>
      </Flex>
<<<<<<< HEAD
      <Flex alignItems="center" 
        justifyContent="center" 
        mb={4} 
        flexWrap="wrap">
        <Text fontSize="2xl" fontWeight="bold">Danh sách hợp đồng</Text>
      </Flex>
=======
      <Text fontSize="2xl" fontWeight="bold" textAlign="center" flex="1" mx={4}>
        Danh sách hợp đồng
      </Text>
>>>>>>> 052174f3d35adcef1b69ad8f3ca58ef13571e8e9
      {isLoading ? (
        <Spinner />
      ) : (
        <Table variant="simple">
          <Thead bg="cyan.100">
            <Tr>
              <Th>Mã hợp đồng</Th>
              <Th>Tên phòng</Th>
              <Th>Địa chỉ</Th>
              <Th>Chủ trọ</Th>
              <Th>Tiền thuê</Th>
              <Th>Tiền cọc</Th>
              <Th>Tiền điện</Th>
              <Th>Tiền nước</Th>
              <Th>Phí dịch vụ</Th>
              <Th>Ngày bắt đầu</Th>
              <Th>Ngày kết thúc</Th>
              <Th>Trạng thái</Th>
            </Tr>
          </Thead>
          <Tbody>
            {contracts && contracts.length > 0 ? (
              contracts.map((contract) => (
                <Tr key={contract._id}>
                  <Td>
                    <Tooltip label={contract._id} placement="top">
                      <Text
                        isTruncated
                        maxW="150px" // Giới hạn chiều rộng
                        whiteSpace="nowrap"
                        overflow="hidden"
                        textOverflow="ellipsis"
                      >
                        {contract._id}
                      </Text>
                    </Tooltip>
                  </Td>
                  <Td>{contract.roomName}</Td>
                  <Td>
                    <Tooltip label={contract.address} placement="top">
                      <Text
                        isTruncated
                        maxW="150px" // Giới hạn chiều rộng
                        whiteSpace="nowrap"
                        overflow="hidden"
                        textOverflow="ellipsis"
                      >
                        {contract.address}
                      </Text>
                    </Tooltip>
                  </Td>
                  <Td>
                    <Text>{contract.landlordName}</Text>
                    <Text fontSize="sm">{contract.landlordPhone}</Text>
                  </Td>
                  <Td>{formatCurrency(contract.rentFee)}</Td>
                  <Td>{formatCurrency(contract.depositFee)}</Td>
                  <Td>{formatCurrency(contract.electricityFee)}/kWh</Td>
                  <Td>{formatCurrency(contract.waterFee)}/m³</Td>
                  <Td>{formatCurrency(contract.serviceFee)}</Td>
                  <Td>{formatDate(contract.startDate)}</Td>
                  <Td>{formatDate(contract.endDate)}</Td>
                  <Td>
                    <Tag colorScheme={getStatusColor(contract.status)}>
                      {contract.status === "active"
                        ? "Đang hiệu lực"
                        : contract.status === "expired"
                        ? "Hết hạn"
                        : "Chưa bắt đầu"}
                    </Tag>
                  </Td>
                </Tr>
              ))
            ) : (
              <Tr>
                <Td colSpan={12} textAlign="center">
                  Không có hợp đồng nào
                </Td>
              </Tr>
            )}
          </Tbody>
        </Table>
      )}
    </Box>
  );
}

export default TenantContract;
