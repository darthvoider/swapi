import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { searchPeople } from "../api";
export const usePeopleSearching = () => {
  const [searchParam, setSearchParam] = useState("");

  const { data, isFetching } = useQuery({
    queryKey: ["searchResult"],
    queryFn: () => searchPeople(searchParam),
    refetchOnWindowFocus: false,
    enabled: !!searchParam.length,
  });

  return {
    searchData: data,
    isSearchFetching: isFetching,
    setSearchParam,
    searchParam,
  };
};
