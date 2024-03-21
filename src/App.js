import { createBrowserRouter } from "react-router-dom";
import Navbar from "./components/navbar";
import Recipe from "./pages/recipe";
import Recipes from "./pages/recipes";
import { RouterProvider } from "react-router";
import AddRecipe from "./pages/add-recipe";

const router = createBrowserRouter([
  {path:"/", element: <Recipes/>},
  {path: "/recipes", element: <Recipes />},
  {path: "/recipes/:id", element: <Recipe />},
  {path: "/add-recipes/", element: <AddRecipe />}

]);

function App() {
  return (
    
    <>
    <Navbar />
    <RouterProvider router={router}/>
    </>

  );
}

export default App;
