// src/router/index.tsx
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "../pages/Home";
import Search from "../pages/Search";


const routes = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/search",
    element: <Search />,
  }
]);

const AppRouter = () => {
  return <RouterProvider router={routes} />;
};

export default AppRouter;
