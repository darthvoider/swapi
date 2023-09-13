import * as React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ReactQueryProvider } from "./providers";
import { PeopleListing, Profile } from "./views";

const router = createBrowserRouter([
  {
    path: "/",
    element: <PeopleListing />,
  },
  {
    path: "people/:id",
    element: <Profile />,
  },
]);

export default function App() {
  return (
    <ReactQueryProvider>
      <RouterProvider router={router} />
    </ReactQueryProvider>
  );
}
