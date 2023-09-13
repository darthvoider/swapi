import React from "react";
import { useProfileQuery } from "../hooks";
import { Paper, Container, Typography } from "@mui/material";
import { decamelize } from "humps";

export const Profile = (): React.ReactElement => {
  const { name, starships, ...restProfile } = useProfileQuery();

  console.log(Object.entries(restProfile), "fullProfile>>>");

  return (
    <Container sx={{ py: "4rem" }}>
      <Paper elevation={3} sx={{ p: "2rem" }}>
        <Typography variant="h2">Name: {name}</Typography>
        {Object.entries(restProfile).map(
          ([title, value]) =>
            value && (
              <Typography variant="h5" key={title} sx={{ py: "0.5rem" }}>
                {decamelize(title, { separator: " " }).toUpperCase()}: {value}
              </Typography>
            )
        )}
      </Paper>
    </Container>
  );
};
