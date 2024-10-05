const Hostel = require("../models/hostel.model");

//Lấy data của Hostel, thường dùng tạo danh sách
const getHostel = async (req, res) => {
  try {
    const hostels = await Hostel.find({});
    res.status(200).json({ success: true, data: hostels });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
//Lấy data của Hostel theo id chỉ định, dùng để định hướng từ phòng này đến Hostel đang thuê
const getHostelById = async (req, res) => {
  const { id } = req.params;
  try {
    const hostel = await Hostel.findById(id);
    if (!hostel) {
      return res
        .status(404)
        .json({ success: false, message: "Hostel not found" });
    }
    res.status(200).json({ success: true, data: hostel });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getHostelByLandLordId = async (req, res) => {
  const { id } = req.params;
  try {
    const hostel = await Hostel.find({ landLordId: id });
    console.log(id);
    if (!hostel) {
      return res
        .status(404)
        .json({ success: false, message: "Hostel not found" });
    }
    res.status(200).json({ success: true, data: hostel });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
//Tạo Hostel, dùng để là chức năng đăng ký
const createHostel = async (req, res) => {
  const hostel = req.body;

  if (!hostel.name || !hostel.address || !hostel.district || !hostel.city) {
    return res
      .status(400)
      .json({ success: false, message: "Please provide all fields" });
  }
  if (hostel.elecUnit < 0 || hostel.aqua < 0 || hostel.servicesFee < 0) {
    return res.status(400).json({
      success: false,
      message: "elecUnit,aquaUnit and servicesFee must not be less than 0",
    });
  }

  const findHostel = await Hostel.findOne({ hostel });

  if (findHostel) {
    return res
      .status(400)
      .json({ success: false, message: "Hostel is available" });
  }

  const newHostel = new Hostel(hostel);
  try {
    await newHostel.save();
    res.status(200).json({ success: true, data: newHostel });
  } catch (error) {
    console.error("Error in register", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

module.exports = {
  getHostel,
  createHostel,
  getHostelById,
  getHostelByLandLordId,
};
