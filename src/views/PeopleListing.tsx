import React from "react";
import { Grid, Container, Pagination, TextField } from "@mui/material";
import { PeopleCard } from "../components/PeopleCard";
import { TCharacter } from "../types";
import { PeopleListingLoader } from "../components/Loaders";
import { usePeopleFetching, usePeopleSearching } from "../hooks";

export const PeopleListing = (): React.JSX.Element => {
  const {
    setPage: setPageForFetching,
    data: fetchedData,
    isFetching: isFetchingData,
    page: fetchPage,
  } = usePeopleFetching();

  const {
    searchData,
    searchParam,
    setSearchParam,
    isSearchFetching,
    searchPage,
    setSearchPage,
  } = usePeopleSearching();

  const dataToUse = !!searchParam.length ? searchData : fetchedData;
  const isFetchingToUse = isSearchFetching || isFetchingData;
  const pageToUse = !!searchParam.length ? searchPage : fetchPage;
  const setPageToUse = !!searchParam.length
    ? setSearchPage
    : setPageForFetching;

  return (
    <Container sx={{ py: "4rem" }}>
      <TextField
        disabled={isSearchFetching}
        label="Search"
        variant="outlined"
        onChange={({ target }) => setSearchParam(target.value)}
      />
      <Grid container spacing={6}>
        {isFetchingToUse && <PeopleListingLoader number={10} />}

        {!isFetchingToUse &&
          dataToUse?.results.map((character: TCharacter) => (
            <Grid item sm={6} key={character.url}>
              <PeopleCard character={character} />
            </Grid>
          ))}

        <Grid item>
          <Pagination
            count={Math.ceil(dataToUse?.count / 10) || 1}
            color="primary"
            page={pageToUse}
            onChange={(_, page) => setPageToUse(page)}
          />
        </Grid>
      </Grid>
    </Container>
  );
};
