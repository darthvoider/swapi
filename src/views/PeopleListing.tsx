import React from "react";
import { Grid, Container, Pagination, TextField } from "@mui/material";
import { PeopleCard } from "../components/PeopleCard";
import { ICharacter } from "../types";
import { usePeopleFetching } from "../hooks";
import { PeopleListingLoader } from "../hoc";

export const PeopleListing = (): React.ReactElement => {
  const { setPage, data, isFetching, page, setSearchParam } =
    usePeopleFetching();

  return (
    <Container sx={{ py: "4rem" }}>
      <TextField
        sx={{ mb: "2rem" }}
        disabled={isFetching}
        label="Search"
        variant="outlined"
        onChange={({ target }) => {
          setSearchParam(target.value);
          setPage(1);
        }}
      />
      <Grid container spacing={6}>
        <PeopleListingLoader number={10} isFetching={isFetching}>
          <>
            {data?.results.map((character: ICharacter) => (
              <Grid item sm={6} key={character.url}>
                <PeopleCard character={character} />
              </Grid>
            ))}
          </>
        </PeopleListingLoader>

        <Grid item xs={12}>
          <Pagination
            sx={{ mt: "2rem" }}
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
