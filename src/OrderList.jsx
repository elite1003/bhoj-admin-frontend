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
    console.log(error);
  }
  if (!orders.length) {
    return (
      <div className="w-full md:max-w-5xl mx-auto mt-2 p-5">
        <p className="text-xl font-medium">No order to process</p>
        <p>
          Currently there is no order to process. Improve visibilty of your
          recipe by following below steps...
        </p>
      </div>
    );
  }
  return <div>orders</div>;
};

export default OrderList;
