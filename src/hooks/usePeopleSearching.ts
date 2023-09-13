import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { searchPeople } from "../api";
import { useDebounce } from "./useDebounce";
export const usePeopleSearching = () => {
  const { debouncedValue, setValue } = useDebounce("", 700);
  const [page, setPage] = useState(1);

  const { data, isFetching } = useQuery({
    queryKey: ["searchResult", debouncedValue, page],
    queryFn: () => searchPeople(debouncedValue, page),
    refetchOnWindowFocus: false,
    enabled: !!debouncedValue.length,
  });

  return {
    searchData: data,
    isSearchFetching: isFetching,
    setSearchParam: setValue,
    searchParam: debouncedValue,
    searchPage: page,
    setSearchPage: setPage,
  };
};
