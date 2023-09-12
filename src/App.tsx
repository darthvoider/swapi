import * as React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ReactQueryProvider } from "./providers";
import { PeopleListing } from "./views";

const router = createBrowserRouter([
  {
    path: "/",
    element: <PeopleListing />,
  },
]);

export default function App() {
  return (
    <ReactQueryProvider>
      <RouterProvider router={router} />
    </ReactQueryProvider>
  );
}
