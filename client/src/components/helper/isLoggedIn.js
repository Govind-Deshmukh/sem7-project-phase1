// function to check session for logged in user
const isLoggedIn = () => {
  if (sessionStorage.getItem("token")) {
    return true;
  }
  return false;
};

export default isLoggedIn;
