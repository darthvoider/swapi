import { useQuery } from "@tanstack/react-query";
import { searchPeople } from "../api";
import { useDebounce } from "./useDebounce";
export const usePeopleSearching = () => {
  const { debouncedValue, setValue } = useDebounce("", 1000);

  const { data, isFetching } = useQuery({
    queryKey: ["searchResult"],
    queryFn: () => searchPeople(debouncedValue),
    refetchOnWindowFocus: false,
    enabled: !!debouncedValue.length,
  });

  return {
    searchData: data,
    isSearchFetching: isFetching,
    setSearchParam: setValue,
    searchParam: debouncedValue,
  };
};
