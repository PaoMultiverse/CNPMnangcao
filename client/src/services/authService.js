import { jwtDecode } from "jwt-decode";

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

  login(token) {
    this.token = token;
    localStorage.setItem("token", token);
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
