import { AddRecipe } from "./AddRecipe";
import { useGetRecipesQuery } from "./api/apiSlice";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Recipe } from "./Recipe";
const RecipeList = () => {
  const navigate = useNavigate();
  const { data: recipes, isLoading, isError } = useGetRecipesQuery();
  if (isLoading) return <div>Loading...</div>;
  if (isError) {
    return <div>Something went wrong</div>;
  }
  return (
    <div className="w-full md:max-w-5xl mx-auto mt-2 p-5">
      <div className="px-10 lg:px-0 flex justify-end gap-4 items-center">
        <AddRecipe />
        <Button
          onClick={() => navigate("/category")}
          variant="outline"
          className=" bg-lime-300 text-black hover:bg-lime-400"
        >
          Manage Category
        </Button>
      </div>
      {recipes?.length === 0 && (
        <div className="w-full md:max-w-5xl mx-auto mt-2 p-5">
          <p className="text-xl font-medium">No recipe to show.</p>
          <p>Currently there is no recipe to show. Add new recipes...</p>
        </div>
      )}
      <div className=" mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
        {recipes?.map((recipe) => (
          <Recipe key={recipe.id} recipe={recipe} />
        ))}
      </div>
    </div>
  );
};

export default RecipeList;
