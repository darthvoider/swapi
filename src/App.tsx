import * as React from "react";
import Container from "@mui/material/Container";
import { ReactQueryProvider } from "./providers";

export default function App() {
  return (
    <ReactQueryProvider>
      <Container>May the Force be with you</Container>
    </ReactQueryProvider>
  );
}
