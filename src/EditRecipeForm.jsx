import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useUpdateRecipeMutation, useGetCategoriesQuery } from "./api/apiSlice";
import { toast } from "react-toastify";
import { AddCategory } from "./AddCategory";
import { useNavigate } from "react-router-dom";
const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name is required and should have at least 2 characters",
  }),
  price: z
    .string()
    .refine((value) => /^(\d+(\.\d{1,2})?)$/.test(value.toString()), {
      message: "Price must have up to 2 digits after the decimal",
    }),
  image: z
    .any()
    .refine((files) => files && files?.length === 1, {
      message: "Image is required",
    })
    .refine(
      (files) =>
        ["image/jpeg", "image/jpg", "image/png", "image/webp"].includes(
          files?.[0]?.type
        ),
      {
        message: "Only jpeg, jpg, png, webp files are accepted",
      }
    ),
  category: z.string().min(1, {
    message: "Category is required",
  }),
  ingredients: z.string().min(1, {
    message: "Ingredients are required",
  }),
});

//Component
const EditRecipeForm = ({ recipe }) => {
  const navigate = useNavigate();
  const {
    data: categories,
    isError: isCategoryFetchingError,
    isLoading: isCategoryFetching,
  } = useGetCategoriesQuery();
  const [updateRecipe, { isLoading, /*isSuccess*/ isError }] =
    useUpdateRecipeMutation();
  const form = useForm({
    defaultValues: {
      name: recipe.name,
      price: recipe.price.toString(),
      image: recipe.imageUrl,
      category: recipe.catId.toString(),
      ingredients: recipe.ingredients,
    },
    resolver: zodResolver(formSchema),
  });
  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("price", data.price);
    formData.append("recipeImage", data.image[0]); // File input field is an array
    formData.append("catId", data.category);
    formData.append("ingredients", data.ingredients);
    try {
      await updateRecipe({
        recipeId: recipe.id,
        newRecipe: formData,
      })
        .unwrap()
        .then(() => {
          toast.success("successfully updated recipe");
          navigate("/recipe");
        });

      isError && toast.error(`Recipe updation failed`);
    } catch (err) {
      console.error("Failed to update the recipe:", err);
    }
  };
  return (
    <Form {...form} className="">
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Recipe Name" {...field} type="text" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Price</FormLabel>
              <FormControl>
                <Input placeholder="Price" {...field} type="number" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Image</FormLabel>
              <FormControl>
                <Input
                  type="file"
                  accept=".jpeg,.jpg,.png,.webp"
                  onChange={(e) => field.onChange(e.target.files)}
                  filename={field.value}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <div className="flex items-center justify-between">
                {isCategoryFetching ? (
                  <span>Loading...</span>
                ) : (
                  <Select onValueChange={field.onChange} className="w-fit">
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a recipe category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {categories.map((cat) => (
                        <SelectItem key={cat.id} value={cat.id.toString()}>
                          {cat.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
                {isCategoryFetchingError && (
                  <span>Error in fetching category</span>
                )}
                <AddCategory />
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="ingredients"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Ingredients</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Tell us ingredients of recipe"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          disabled={isLoading}
          className="bg-lime-300 w-full py-2  text-black hover:bg-lime-400"
        >
          Update Recipe
        </Button>
      </form>
    </Form>
  );
};

export default EditRecipeForm;
