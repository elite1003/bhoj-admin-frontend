import {
  useGetCategoriesQuery,
  useDeleteCategoryMutation,
} from "./api/apiSlice";
import { AddCategory } from "./AddCategory";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Category = () => {
  const { data, isError, isLoading } = useGetCategoriesQuery();
  let content;
  if (isLoading) {
    content = <p>Loading...</p>;
  } else if (isError) {
    content = <p>Error in loading the category</p>;
  } else {
    content = (
      <ul className="max-w-lg divide-y divide-gray-200 dark:divide-gray-700 mt-4">
        {data.map((category) => (
          <CategoryItem key={category.id} category={category} />
        ))}
      </ul>
    );
  }
  return (
    <div className="w-full md:max-w-5xl mx-auto mt-2 p-5">
      <div>
        <AddCategory />
      </div>
      <div>{content}</div>
    </div>
  );
};

const CategoryItem = ({ category }) => {
  const navigate = useNavigate();
  const [deleteCategory, { isLoading, isSuccess }] =
    useDeleteCategoryMutation();
  return (
    <>
      <li className="pb-3 sm:pb-4">
        <div className="flex items-center space-x-4 rtl:space-x-reverse">
          <div className="flex-shrink-0">
            <img
              className="w-8 h-8 rounded-full"
              src={category.imageUrl}
              alt={category.name}
            />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
              {category.name}
            </p>
          </div>
          <div className="inline-flex gap-2 items-center text-base font-semibold text-gray-900 dark:text-white">
            <Button
              variant="outline"
              className=" bg-lime-300 text-black hover:bg-lime-400"
              onClick={() => navigate(`/category/${category.id}`)}
            >
              Edit
            </Button>
            <Button
              disabled={isLoading}
              variant="outline"
              className=" bg-lime-300 text-black hover:bg-lime-400"
              onClick={() => deleteCategory(category.id)}
            >
              Delete
            </Button>
            {isSuccess && <p>Category deleted successfully</p>}
          </div>
        </div>
      </li>
      <hr />
    </>
  );
};
export default Category;
