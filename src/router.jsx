import { createBrowserRouter } from "react-router-dom";
import Login from "./Login";
import Signup from "./Signup";
import Home from "./Home";
import App from "./App";
import ProtectedRoute from "./ProtectedRoute";
import RecipeList from "./RecipeList";
import OrderList from "./OrderList";
import EditRecipe from "./EditRecipe";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "", element: <Home /> },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "signup",
        element: <Signup />,
      },
      {
        path: "recipe/:recipeId",
        element: <ProtectedRoute element={EditRecipe} />,
      },
      {
        path: "recipe",
        element: <ProtectedRoute element={RecipeList} />,
      },

      { path: "/order", element: <ProtectedRoute element={OrderList} /> },
    ],
  },
]);

export default router;
