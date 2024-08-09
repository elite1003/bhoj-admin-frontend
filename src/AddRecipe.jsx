import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import AddRecipeForm from "./AddRecipeForm";
export function AddRecipe() {
  return (
    <Dialog className="mx-10 ">
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className=" bg-lime-300 text-black hover:bg-lime-400"
        >
          Add Recipe
        </Button>
      </DialogTrigger>
      <DialogContent className="px-8 rounded overflow-y-auto max-h-[80vh]">
        <DialogHeader>
          <DialogTitle className="text-center">Add Recipe</DialogTitle>
          <DialogDescription className="text-center">
            Add new recipe with category.
          </DialogDescription>
        </DialogHeader>
        <AddRecipeForm />
      </DialogContent>
    </Dialog>
  );
}
