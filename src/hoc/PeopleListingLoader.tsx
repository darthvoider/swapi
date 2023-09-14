import React from "react";
import { Grid, Skeleton } from "@mui/material";

export const PeopleListingLoader = ({
  number,
  children,
  isFetching,
}: {
  number: number;
  children: React.ReactElement;
  isFetching: boolean;
}) => {
  return (
    <>
      {isFetching &&
        [...Array(number)].map((_, index) => (
          <Grid item sm={6} key={index}>
            <Skeleton
              animation="wave"
              variant="text"
              sx={{ fontSize: "2rem" }}
            />
            <Skeleton animation="wave" variant="text" />
            <Skeleton animation="wave" variant="text" />
          </Grid>
        ))}

      {!isFetching && children}
    </>
  );
};
