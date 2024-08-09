import { Outlet } from "react-router-dom";
import Header from "./Header";
import { useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { useDispatch } from "react-redux";
import { init } from "./slices/user";
import { ToastContainer } from "react-toastify";
const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      const user = jwtDecode(jwt);
      const currentTime = Date.now() / 1000;
      if (user.exp < currentTime) {
        dispatch(
          init({
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            isLoggedIn: false,
          })
        );
      } else {
        dispatch(
          init({
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            isLoggedIn: true,
          })
        );
      }
    }
  }, [dispatch]);
  return (
    <>
      <Header />
      <Outlet />
      <ToastContainer position="bottom-right" />
    </>
  );
};

export default App;
