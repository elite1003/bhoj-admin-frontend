import useFetchData from "./hooks/useFetchData";

const OrderList = () => {
  const {
    data: orders,
    loading,
    error,
  } = useFetchData("http://localhost:4000/admin/orders");
  if (loading) {
    return <div>Loading....</div>;
  }
  if (error) {
    return <div>{error}</div>;
  }
  return <div>{orders.toString()}</div>;
};

export default OrderList;
