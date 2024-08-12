import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import AddCategoryForm from "./AddCategoryForm";

export function AddCategory() {
  return (
    <Dialog className="mx-10 ">
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className=" bg-lime-300 text-black hover:bg-lime-400"
        >
          Add Category
        </Button>
      </DialogTrigger>
      <DialogContent className="px-8 rounded overflow-y-auto max-h-[80vh] ">
        <DialogHeader>
          <DialogTitle className="text-center">Add Category</DialogTitle>
        </DialogHeader>
        <AddCategoryForm />
      </DialogContent>
    </Dialog>
  );
}
