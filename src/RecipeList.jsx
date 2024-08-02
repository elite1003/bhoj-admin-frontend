import { useGetRecipesQuery } from "./api/apiSlice";
const RecipeList = () => {
  const { data: recipes, error, isLoading } = useGetRecipesQuery();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error fetching recipes</div>;
  return <div>{recipes.toString()}</div>;
};

export default RecipeList;
