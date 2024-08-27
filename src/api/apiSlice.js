import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Custom baseQuery with JWT token
const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:4000",
  prepareHeaders: (headers) => {
    const token = localStorage.getItem("jwt");
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

const api = createApi({
  reducerPath: "api",
  baseQuery: baseQuery,
  tagTypes: ["Recipe", "Category"],
  endpoints: (builder) => ({
    //GET one recipe
    getRecipe: builder.query({
      query: (recipeId) => `/admin/recipe/${recipeId}`,
      providesTags: (result, error, recipeId) => [
        { type: "Recipe", id: recipeId },
      ],
    }),
    // GET all recipes
    getRecipes: builder.query({
      query: () => "/admin/recipes",
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "Recipe", id })),
              { type: "Recipe", id: "LIST" },
            ]
          : [{ type: "Recipe", id: "LIST" }],
    }),
    // POST new recipe
    createRecipe: builder.mutation({
      query: (newRecipe) => ({
        url: "/admin/recipe",
        method: "POST",
        body: newRecipe,
      }),
      // Invalidate the recipes cache to trigger a refetch
      invalidatesTags: [{ type: "Recipe", id: "LIST" }],
    }),
    // PATCH recipe by ID
    updateRecipe: builder.mutation({
      query: ({ recipeId, newRecipe }) => {
        return {
          url: `/admin/recipe/${recipeId}`,
          method: "PATCH",
          body: newRecipe,
        };
      },
      invalidatesTags: (result, error, { recipeId }) => [
        { type: "Recipe", id: recipeId },
      ],
    }),
    // DELETE recipe by ID with optimistic update
    deleteRecipe: builder.mutation({
      query: (recipeId) => ({
        url: `/admin/recipe/${recipeId}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, recipeId) => [
        { type: "Recipe", id: recipeId },
        { type: "Recipe", id: "LIST" },
      ],
    }),

    //GET one category
    getCategory: builder.query({
      query: (catId) => `/category/${catId}`,
      providesTags: (result, error, catId) => [{ type: "Category", id: catId }],
    }),
    // GET all categories
    getCategories: builder.query({
      query: () => "/category",
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "Category", id })),
              { type: "Category", id: "LIST" },
            ]
          : [{ type: "Category", id: "LIST" }],
    }),
    // POST new category
    createCategory: builder.mutation({
      query: (newCategory) => ({
        url: "/category",
        method: "POST",
        body: newCategory,
      }),
      // Invalidate the category cache to trigger a refetch
      invalidatesTags: [{ type: "Category", id: "LIST" }],
    }),
    // PATCH category by ID
    updateCategory: builder.mutation({
      query: ({ catId, newCategory }) => ({
        url: `/admin/category/${catId}`,
        method: "PATCH",
        body: newCategory,
      }),
      invalidatesTags: (result, error, { catId }) => [
        { type: "Category", id: catId },
      ],
    }),
    // DELETE category by ID
    deleteCategory: builder.mutation({
      query: (catId) => ({
        url: `/admin/category/${catId}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, catId) => [
        { type: "Category", id: catId },
        { type: "Category", id: "LIST" },
      ],
    }),
  }),
});

export const {
  useGetRecipeQuery,
  useGetRecipesQuery,
  useCreateRecipeMutation,
  useUpdateRecipeMutation,
  useDeleteRecipeMutation,
  useGetCategoryQuery,
  useGetCategoriesQuery,
  useCreateCategoryMutation,
  useDeleteCategoryMutation,
} = api;

export default api;
