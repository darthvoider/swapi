import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Grid, Container } from "@mui/material";
import { fetchPeople } from "../api";
import { PeopleCard } from "../components/PeopleCard";
import { TCharacter } from "../types";

export const PeopleListing = (): React.JSX.Element => {
  const { data, isLoading } = useQuery({
    queryKey: ["people"],
    queryFn: fetchPeople,
  });

  console.log(data?.results, "data>>>");
  return (
    <Container sx={{ py: "4rem" }}>
      <Grid container spacing={6}>
        {data?.results.map((character: TCharacter) => (
          <Grid item sm={6}>
            <PeopleCard character={character} key={character.url} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};
