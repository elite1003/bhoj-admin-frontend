import { AddRecipe } from "./AddRecipe";
import { useGetRecipesQuery } from "./api/apiSlice";

import { Recipe } from "./Recipe";
const RecipeList = () => {
  const { data: recipes, isLoading, isError } = useGetRecipesQuery();
  if (isLoading) return <div>Loading...</div>;
  if (isError) {
    return <div>Something went wrong</div>;
  }
  return (
    <div className="w-full md:max-w-5xl mx-auto mt-2 p-5">
      <div className="px-10 lg:px-0">
        <AddRecipe />
      </div>
      <div className=" mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
        {recipes.map((recipe) => (
          <Recipe key={recipe.id} recipe={recipe} />
        ))}
      </div>
    </div>
  );
};

export default RecipeList;
