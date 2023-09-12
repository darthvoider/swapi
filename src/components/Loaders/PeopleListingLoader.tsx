import React from "react";
import { Grid, Skeleton } from "@mui/material";

export const PeopleListingLoader = ({ number }: { number: number }) => {
  return (
    <>
      {[...Array(number)].map((_, index) => (
        <Grid item sm={6} key={index}>
          <Skeleton animation="wave" variant="text" sx={{ fontSize: "2rem" }} />
          <Skeleton animation="wave" variant="text" />
          <Skeleton animation="wave" variant="text" />
        </Grid>
      ))}
    </>
  );
};
