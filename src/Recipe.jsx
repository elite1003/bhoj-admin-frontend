import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { IndianRupee } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useDeleteRecipeMutation } from "./api/apiSlice";
export const Recipe = ({ recipe }) => {
  const navigate = useNavigate();
  const [deleteRecipe, { isLoading }] = useDeleteRecipeMutation();
  return (
    <Card>
      <CardHeader
        className="h-60 relative text-white "
        style={{
          backgroundImage: `url(${recipe.imageUrl})`,
          opacity: 1,
          backgroundSize: "cover",
        }}
      >
        <CardTitle className="text-end absolute bottom-0 right-0 pb-2 pr-2 bg-gradient-to-t from-black to-transparent w-full">
          {recipe.name}
        </CardTitle>
      </CardHeader>
      <CardDescription className="pb-2 px-2 truncate ">
        {recipe.ingredients}
      </CardDescription>
      <CardFooter className=" text-black justify-between px-2 pb-1">
        <div className="flex items-center ">
          <IndianRupee size={16} className="p-0" />
          <span className="font-semibold text-lg">{recipe.price}</span>
        </div>
        <Badge variant="destructive">{recipe.catName}</Badge>
      </CardFooter>
      <CardFooter className="gap-x-2 justify-end pb-1">
        <Button
          variant="outline"
          type="button"
          onClick={() => navigate(`/recipe/${recipe.id}`)}
        >
          Edit
        </Button>
        <Button
          disabled={isLoading}
          variant="outline"
          type="button"
          onClick={() => deleteRecipe(recipe.id)}
        >
          Delete
        </Button>
      </CardFooter>
    </Card>
  );
};
