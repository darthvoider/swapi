import * as React from "react";
import { ReactQueryProvider } from "./providers";
import { PeopleListing } from "./views";

export default function App() {
  return (
    <ReactQueryProvider>
      <PeopleListing />
    </ReactQueryProvider>
  );
}
