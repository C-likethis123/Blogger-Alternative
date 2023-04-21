import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const ROUTES = createBrowserRouter([{
  path: '/create',
  lazy: () => import("./pages/CreatePost"),
},
{
  path: '/edit/:id',
  lazy: () => import("./pages/EditPost"),
},
{
  path: '/posts',
  lazy: () => import("./pages/PostsList"),
},
{
  path: '/post/:id',
  lazy: () => import("./pages/ShowPost"),
},
{
  path: '*',
  lazy: () => import("./pages/HomePage")
}
])

export default function App() {
  return (
   <RouterProvider router={ROUTES} />
  );
};
