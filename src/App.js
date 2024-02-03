import { createBrowserRouter, RouterProvider } from "react-router-dom";
import PrivateRoute from "./Routers/PrivateRoute";
import Dashboards from "./Components/Dashboards";
import Users from "./Components/Users";
import Blogs from "./Components/Blogs";
import LoginPage from "./Components/LoginPage";
import Register from "./Components/Register";
import BlogView from "./Components/BlogView";
import CreateBlog from "./Components/CreateBlog";
import Categories from "./Components/Categories";
import CreateCategories from "./Components/CreateCategories";

// App component
function App() {
  // Combine and conditionally include routes based on authentication status
  const router = createBrowserRouter([
    {
      path: "/dashboard",
      element: (
        <PrivateRoute>
          <Dashboards />
        </PrivateRoute>
      ),
    },
    {
      path: "/users",
      element: (
        <PrivateRoute>
          <Users />
        </PrivateRoute>
      ),
    },
    {
      path: "/blogs",
      element: (
        <PrivateRoute>
          <Blogs />
        </PrivateRoute>
      ),
    },
    {
      path: "/blog/create",
      element: (
        <PrivateRoute>
          <CreateBlog />
        </PrivateRoute>
      ),
    },
    {
      path: "/blog/view",
      element: (
        <PrivateRoute>
          <BlogView />
        </PrivateRoute>
      ),
    },
    {
      path: "/blogs/categories",
      element: (
        <PrivateRoute>
          <Categories />
        </PrivateRoute>
      ),
    },
    {
      path: "/category/create",
      element: (
        <PrivateRoute>
          <CreateCategories />
        </PrivateRoute>
      ),
    },
    {
      path: "/category/edit",
      element: (
        <PrivateRoute>
          <CreateCategories />
        </PrivateRoute>
      ),
    },
    {
      path: "/login",
      element: <LoginPage />,
    },
    { path: "/register", element: <Register /> },
    {
      path: "*",
      element: (
        <PrivateRoute>
          <Dashboards />
        </PrivateRoute>
      ),
    },
  ]);
  // Provide the router configuration using RouterProvider
  return <RouterProvider router={router} />;
}

export default App;
