import { useParams } from "react-router-dom";
import EditCategoryForm from "./EditCategoryForm";
import { useGetCategoryQuery } from "./api/apiSlice";

const EditCategory = () => {
  const { categoryId } = useParams();
  const {
    data: category,
    isLoading,
    isError,
  } = useGetCategoryQuery(categoryId);
  if (isLoading) {
    return <p>Loading....</p>;
  }
  if (isError) {
    return <div>Something went wrong....</div>;
  }
  return (
    <div className="w-full max-w-4xl m-auto flex flex-col-reverse md:flex-row items-center justify-center">
      <div className=" flex-1 m-auto md:max-w-lg border border-slate-300 p-4 rounded-md">
        <h1 className="text-center text-xl font-semibold mb-4">
          Edit Category details
        </h1>
        <EditCategoryForm category={category} />
      </div>
      <div className=" max-w-96 mb-4 flex-1 p-4 ">
        <p className="text-muted-foreground text-center mb-4">
          Preview current category image
        </p>
        <img src={category.imageUrl} alt={category.name} />
      </div>
    </div>
  );
};
export default EditCategory;
