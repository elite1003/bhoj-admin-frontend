import useFetchData from "./hooks/useFetchData";
import { logout } from "./slices/user";
import { useDispatch } from "react-redux";
const OrderList = () => {
  const dispatch = useDispatch();
  const {
    data: orders,
    loading,
    error,
  } = useFetchData("http://localhost:4000/admin/orders");
  if (loading) {
    return <div>Loading....</div>;
  }
  if (error) {
    dispatch(logout());
  }
  return <div>orders</div>;
};

export default OrderList;
