import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Grid, Container, Pagination } from "@mui/material";
import { fetchPeople } from "../api";
import { PeopleCard } from "../components/PeopleCard";
import { TCharacter } from "../types";
import { PeopleListingLoader } from "../components/Loaders";
import { queryClient } from "../providers/ReactQueryProvider";

const STALE_TIME = 50000;
const QUERY_KEY = "people";

export const PeopleListing = (): React.JSX.Element => {
  const [page, setPage] = useState(1);
  const { data, isFetching, isPreviousData } = useQuery({
    queryKey: [QUERY_KEY, page],
    queryFn: () => fetchPeople(page),
    keepPreviousData: true,
    staleTime: STALE_TIME,
  });

  // Prefetch the next page
  useEffect(() => {
    if (!isPreviousData && data?.next) {
      queryClient.prefetchQuery({
        queryKey: [QUERY_KEY, page + 1],
        queryFn: () => fetchPeople(page + 1),
        staleTime: STALE_TIME,
      });
    }
  }, [data, isPreviousData, page, queryClient]);

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
            count={Math.ceil(data?.count / 10) || 10}
            color="primary"
            page={page}
            onChange={(_, page) => setPage(page)}
          />
        </Grid>
      </Grid>
    </Container>
  );
};
