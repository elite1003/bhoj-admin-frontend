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
import { toast } from "react-toastify";
import { useCreateCategoryMutation } from "./api/apiSlice";
const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name is required and should have at least 2 characters",
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
});

const AddCategoryForm = ({ recipe }) => {
  const [createCategory, { isLoading, isSuccess, isError, error }] =
    useCreateCategoryMutation();
  const form = useForm({
    defaultValues: {
      name: recipe?.name || "",
      image: recipe?.image || "",
    },
    resolver: zodResolver(formSchema),
  });
  const onSubmit = async (data, e) => {
    e.stopPropagation();
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("categoryImage", data.image[0]); // File input field is an array
    await createCategory(formData);
    isSuccess && toast.success("successfully created category");
    isError && toast.error(`Category submission failed ${error}`);
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
                <Input placeholder="Category Name" {...field} type="text" />
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
          Create Category
        </Button>
      </form>
    </Form>
  );
};

export default AddCategoryForm;
