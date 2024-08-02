import { Outlet } from "react-router-dom";
import Header from "./Header";
import { useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { useDispatch } from "react-redux";
import { init } from "./slices/user";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      const user = jwtDecode(jwt);
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
  }, [dispatch]);
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};

export default App;
