// function to check session for logged in user
import jwt_decode from "jwt-decode";
const isLoggedIn = () => {
  try {
    const token = localStorage.getItem("token");
    const decoded = jwt_decode(token);
    if (decoded) {
      return true;
    } else {
      return false;
    }
  } catch {
    return false;
  }
};

export default isLoggedIn;
