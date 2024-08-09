import { useParams } from "react-router-dom";
import EditRecipeForm from "./EditRecipeForm";
import { useGetRecipeQuery } from "./api/apiSlice";
const EditRecipe = () => {
  const { recipeId } = useParams();
  const { data: recipe, isLoading, isError } = useGetRecipeQuery(recipeId);
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
          Edit Recipe details
        </h1>
        <EditRecipeForm recipe={recipe} />
      </div>
      <div className=" max-w-96 mb-4 flex-1 p-4 ">
        <p className="text-muted-foreground text-center mb-4">
          Preview current recipe image
        </p>
        <img src={recipe.imageUrl} alt={recipe.name} />
      </div>
    </div>
  );
};
export default EditRecipe;
