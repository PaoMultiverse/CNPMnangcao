const userRepository = require("../repositories/user.repository");
const bcrypt = require("bcryptjs");

class UserService {
  async register(userData) {
    const existingUser = await userRepository.findByEmail(userData.email);
    if (existingUser) {
      throw new Error("Email đã tồn tại");
    }

    userData.password = await bcrypt.hash(userData.password, 10);
    return await userRepository.create(userData);
  }

  async getUserById(id) {
    return await userRepository.findById(id);
  }
}

module.exports = new UserService();
