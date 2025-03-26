import { jwtDecode } from "jwt-decode";
import axios from "axios";
class AuthService {
  static instance = null;
  token = localStorage.getItem("token") || null;

  constructor() {
    if (!AuthService.instance) {
      AuthService.instance = this;
    }
    console.log("AuthService Instance:", this);

    return AuthService.instance;
  }

  isAuthenticated() {
    if (!this.token) return false;
    try {
      const decoded = jwtDecode(this.token);
      return decoded.exp > Date.now() / 1000;
    } catch (error) {
      return false;
    }
  }

  async login(email, password) {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API}/auth/login`,
        { email, password }
      );

      const token = response.data.token;
      this.token = token;
      localStorage.setItem("token", token);

      return token;
    } catch (error) {
      console.error(
        "Login failed:",
        error.response?.data?.message || error.message
      );
      throw new Error(error.response?.data?.message || "Đăng nhập thất bại!");
    }
  }

  logout() {
    this.token = null;
    localStorage.removeItem("token");
  }

  getToken() {
    return this.token;
  }

  getUser() {
    if (!this.token) return null;
    try {
      return jwtDecode(this.token);
    } catch (error) {
      console.error("Invalid token:", error);
      return null;
    }
  }
}

const authService = new AuthService();
export default authService;
