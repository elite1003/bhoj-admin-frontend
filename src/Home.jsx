import Intro from "./Intro";
import Orders from "./OrderList";
import { useSelector } from "react-redux";
const Home = () => {
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);

  return isLoggedIn ? <Orders /> : <Intro />;
};
export default Home;
