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
import { useUpdateCategoryMutation } from "./api/apiSlice";
import { useNavigate } from "react-router-dom";
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

const EditCategoryForm = ({ category }) => {
  const navigate = useNavigate();
  const [updateCategory, { isLoading, error }] = useUpdateCategoryMutation();
  const form = useForm({
    defaultValues: {
      name: category?.name || "",
      image: category?.imageUrl,
    },
    resolver: zodResolver(formSchema),
  });
  const onSubmit = async (data, e) => {
    e.stopPropagation();
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("categoryImage", data.image[0]); // File input field is an array
    try {
      updateCategory({
        catId: category.id,
        newCategory: formData,
      })
        .unwrap()
        .then(() => {
          toast.success("successfully updated category");
          navigate("/category");
        })
        .catch(() => {
          toast.error(`Category updation failed`);
          console.log(error);
        });
    } catch (err) {
      console.error("Failed to update the category", err);
    }
  };
  return (
    <>
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
            Update Category
          </Button>
        </form>
      </Form>
    </>
  );
};

export default EditCategoryForm;
