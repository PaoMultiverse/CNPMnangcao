import { IoHomeSharp } from "react-icons/io5";
import { FaBuilding, FaAddressCard, FaChartLine } from "react-icons/fa";
import { FaMoneyCheckDollar } from "react-icons/fa6";
import { MdOutlineMeetingRoom } from "react-icons/md";
import { ChatIcon } from "@chakra-ui/icons";
export const createMenuItem = (name, path, icon) => ({
  name,
  path,
  icon,
});

export const menuItems = [
  createMenuItem("Trang chủ", "/landlord", <IoHomeSharp />),
  createMenuItem(
    "Quản lý cơ sở",
    "/landlord/hostel-management",
    <FaBuilding />
  ),
  createMenuItem(
    "Quản lý yêu cầu thuê phòng",
    "/landlord/rental-request",
    <MdOutlineMeetingRoom />
  ),
  createMenuItem(
    "Danh sách khách thuê",
    "/landlord/tenant-list",
    <FaAddressCard />
  ),
  createMenuItem(
    "Danh sách thanh toán",
    "/landlord/payment-list",
    <FaMoneyCheckDollar />
  ),
  createMenuItem(
    "Thống kê doanh thu",
    "/landlord/revenue-stats",
    <FaChartLine />
  ),
  createMenuItem("Quản lý tin nhắn", "/landlord/messages", <ChatIcon />),
];
