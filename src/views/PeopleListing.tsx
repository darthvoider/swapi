import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Grid, Container, Pagination } from "@mui/material";
import { fetchPeople } from "../api";
import { PeopleCard } from "../components/PeopleCard";
import { TCharacter } from "../types";
import { PeopleListingLoader } from "../components/Loaders";

export const PeopleListing = (): React.JSX.Element => {
  const [page, setPage] = useState(1);
  const { data, isFetching } = useQuery({
    queryKey: ["people", page],
    queryFn: () => fetchPeople(page),
    keepPreviousData: true,
    staleTime: 50000,
  });

  return (
    <Container sx={{ py: "4rem" }}>
      <Grid container spacing={6}>
        {isFetching && <PeopleListingLoader number={10} />}

        {!isFetching &&
          data?.results.map((character: TCharacter) => (
            <Grid item sm={6} key={character.url}>
              <PeopleCard character={character} />
            </Grid>
          ))}

        <Grid item>
          <Pagination
            count={8}
            color="primary"
            page={page}
            onChange={(_, page) => setPage(page)}
          />
        </Grid>
      </Grid>
    </Container>
  );
};
