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
    // GET all recipes
    getRecipes: builder.query({
      query: () => "/admin/recipe",
      providesTags: ["Recipe"],
    }),
    // POST new recipe
    createRecipe: builder.mutation({
      query: (newRecipe) => ({
        url: "/admin/recipe",
        method: "POST",
        body: newRecipe,
      }),
      // Invalidate the recipes cache to trigger a refetch
      invalidatesTags: ["Recipe"],
    }),
    // PATCH recipe by ID with optimistic update
    updateRecipe: builder.mutation({
      query: ({ recipeId, ...patch }) => ({
        url: `/admin/recipe/${recipeId}`,
        method: "PATCH",
        body: patch,
      }),
      async onQueryStarted(
        { recipeId, ...patch },
        { dispatch, queryFulfilled }
      ) {
        // Optimistic update
        const patchResult = dispatch(
          api.util.updateQueryData("getRecipes", undefined, (draft) => {
            const recipe = draft.find((r) => r.id === recipeId);
            if (recipe) {
              Object.assign(recipe, patch);
            }
          })
        );
        try {
          await queryFulfilled;
        } catch {
          // Rollback on failure
          patchResult.undo();
        }
      },
    }),
    // DELETE recipe by ID with optimistic update
    deleteRecipe: builder.mutation({
      query: (recipeId) => ({
        url: `/admin/recipe/${recipeId}`,
        method: "DELETE",
      }),
      async onQueryStarted(recipeId, { dispatch, queryFulfilled }) {
        // Optimistic update
        const deleteResult = dispatch(
          api.util.updateQueryData("getRecipes", undefined, (draft) => {
            return draft.filter((recipe) => recipe.id !== recipeId);
          })
        );
        try {
          await queryFulfilled;
        } catch {
          // Rollback on failure
          deleteResult.undo();
        }
      },
    }),
    // GET all categories
    getCategories: builder.query({
      query: () => "/admin/category",
      providesTags: ["Category"],
    }),
    // POST new category
    createCategory: builder.mutation({
      query: (newCategory) => ({
        url: "/admin/category",
        method: "POST",
        body: newCategory,
      }),
      // Invalidate the categories cache to trigger a refetch
      invalidatesTags: ["Category"],
    }),
    // PATCH category by ID with optimistic update
    updateCategory: builder.mutation({
      query: ({ categoryId, ...patch }) => ({
        url: `/admin/category/${categoryId}`,
        method: "PATCH",
        body: patch,
      }),
      async onQueryStarted(
        { categoryId, ...patch },
        { dispatch, queryFulfilled }
      ) {
        // Optimistic update
        const patchResult = dispatch(
          api.util.updateQueryData("getCategories", undefined, (draft) => {
            const category = draft.find((c) => c.id === categoryId);
            if (category) {
              Object.assign(category, patch);
            }
          })
        );
        try {
          await queryFulfilled;
        } catch {
          // Rollback on failure
          patchResult.undo();
        }
      },
    }),
    // DELETE category by ID with optimistic update
    deleteCategory: builder.mutation({
      query: (categoryId) => ({
        url: `/admin/category/${categoryId}`,
        method: "DELETE",
      }),
      async onQueryStarted(categoryId, { dispatch, queryFulfilled }) {
        // Optimistic update
        const deleteResult = dispatch(
          api.util.updateQueryData("getCategories", undefined, (draft) => {
            return draft.filter((category) => category.id !== categoryId);
          })
        );
        try {
          await queryFulfilled;
        } catch {
          // Rollback on failure
          deleteResult.undo();
        }
      },
    }),
  }),
});

export const {
  useGetRecipesQuery,
  useCreateRecipeMutation,
  useUpdateRecipeMutation,
  useDeleteRecipeMutation,
  useGetCategoriesQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} = api;

export default api;
