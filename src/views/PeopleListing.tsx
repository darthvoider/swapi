import React from "react";
import { Grid, Container, Pagination, TextField } from "@mui/material";
import { PeopleCard } from "../components/PeopleCard";
import { TCharacter } from "../types";
import { PeopleListingLoader } from "../components/Loaders";
import { usePeopleFetching } from "../hooks";

export const PeopleListing = (): React.JSX.Element => {
  const { setPage, data, isFetching, page, setSearchParam } =
    usePeopleFetching();

  return (
    <Container sx={{ py: "4rem" }}>
      <TextField
        disabled={isFetching}
        label="Search"
        variant="outlined"
        onChange={({ target }) => {
          setSearchParam(target.value);
          setPage(1);
        }}
      />
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
            count={Math.ceil(data?.count / 10) || 1}
            color="primary"
            page={page}
            onChange={(_, page) => setPage(page)}
          />
        </Grid>
      </Grid>
    </Container>
  );
};
