import { Outlet } from "react-router-dom";
import Header from "./Header";
const App = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};

export default App;
