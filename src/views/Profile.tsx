import React from "react";
import { useProfileQuery } from "../hooks";
import { Paper, Container, Typography, Skeleton } from "@mui/material";
import { decamelize } from "humps";
import { StarshipsTable } from "../components/StartshipsTable";

export const Profile = (): React.ReactElement => {
  const {
    name,
    starships,
    isFetching: { isFetchingCharacter, isFetchingSpecie, isFetchingStarships },
    ...restProfile
  } = useProfileQuery();

  return (
    <Container sx={{ py: "4rem" }}>
      <Paper elevation={3} sx={{ p: "2rem" }}>
        {isFetchingCharacter && (
          <Skeleton
            variant="rectangular"
            width={300}
            height={50}
            sx={{ mb: "1rem" }}
          />
        )}
        {!isFetchingCharacter && (
          <Typography variant="h2">Name: {name}</Typography>
        )}

        {isFetchingSpecie && (
          <Skeleton
            variant="rectangular"
            width={300}
            height={80}
            sx={{ mb: "1rem" }}
          />
        )}

        {!isFetchingSpecie &&
          Object.entries(restProfile).map(
            ([title, value]) =>
              value && (
                <Typography variant="h5" key={title} sx={{ py: "0.5rem" }}>
                  {decamelize(title, { separator: " " }).toUpperCase()}: {value}
                </Typography>
              )
          )}

        {isFetchingStarships.some((loading) => loading) && (
          <Skeleton
            variant="rectangular"
            width={600}
            height={80}
            sx={{ mb: "1rem" }}
          />
        )}

        {isFetchingStarships.every((loading) => !loading) && (
          <StarshipsTable starships={starships} />
        )}
      </Paper>
    </Container>
  );
};
