const BaseRepository = require("./base.repository");
const User = require("../models/user.model");

class UserRepository extends BaseRepository {
  constructor() {
    super(User);
  }

  async findByEmail(email) {
    return await this.model.findOne({ email: email.toLowerCase() });
  }

  async activateUser(id) {
    return await this.update(id, { is_active: true });
  }
}

module.exports = new UserRepository();
