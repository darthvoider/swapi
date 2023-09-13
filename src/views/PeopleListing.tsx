import React from "react";
import { Grid, Container, Pagination, TextField } from "@mui/material";
import { PeopleCard } from "../components/PeopleCard";
import { TCharacter } from "../types";
import { PeopleListingLoader } from "../components/Loaders";
import { usePeopleFetching, usePeopleSearching } from "../hooks";

export const PeopleListing = (): React.JSX.Element => {
  const {
    setPage,
    data: fetchedData,
    isFetching: isFetchingData,
    page,
  } = usePeopleFetching();

  const { searchData, searchParam, setSearchParam, isSearchFetching } =
    usePeopleSearching();

  const dataToShow = !!searchParam.length ? searchData : fetchedData;
  const isFetchingToShow = isSearchFetching || isFetchingData;

  return (
    <Container sx={{ py: "4rem" }}>
      <TextField
        disabled={isSearchFetching}
        label="Search"
        variant="outlined"
        onChange={({ target }) => setSearchParam(target.value)}
      />
      <Grid container spacing={6}>
        {isFetchingToShow && <PeopleListingLoader number={10} />}

        {!isFetchingToShow &&
          dataToShow?.results.map((character: TCharacter) => (
            <Grid item sm={6} key={character.url}>
              <PeopleCard character={character} />
            </Grid>
          ))}

        <Grid item>
          <Pagination
            count={Math.ceil(dataToShow?.count / 10) || 10}
            color="primary"
            page={page}
            onChange={(_, page) => setPage(page)}
          />
        </Grid>
      </Grid>
    </Container>
  );
};
