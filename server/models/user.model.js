const ModelFactory = require("../factories/modelFactory");

const userSchema = {
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  numPhone: { type: String, required: true },
  gender: { type: String, enum: ["female", "male"], required: true },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: ["tenant", "landlord", "manager", "admin"],
    required: true,
    default: "tenant",
  },
  is_active: { type: Boolean, required: true, default: true },
  otpVerification: { type: String, required: true },
  otpExpires: { type: Date },
  is_verified: { type: Boolean, required: true, default: false },
  imageUrl: {
    type: String,
    default:
      "https://asset.cloudinary.com/cnpmnc/17da4fe9a04710f6b649531eef6c33e4",
  },
};

const User = ModelFactory.createModel("User", userSchema);
module.exports = User;
