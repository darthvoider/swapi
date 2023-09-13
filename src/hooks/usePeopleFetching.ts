import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Camelized } from "humps";
import { fetchPeople, searchPeople } from "../api";
import { queryClient } from "../providers/ReactQueryProvider";
import { IPeopleData } from "../types";
import { useDebounce } from "./useDebounce";

type TReturnType = {
  setPage: (page: number) => void;
  setSearchParam: (param: string) => void;
  data: IPeopleData | Camelized<any> | undefined;
  isFetching: boolean;
  page: number;
};
const STALE_TIME = 50000;
const QUERY_KEY = "people";
const SEARCH_QUERY_KEY = "searchResult";

const generateQueryParams = (
  debouncedValue: string,
  pageOffset: number
): [(string | number)[], () => Promise<IPeopleData | Camelized<any>>] => {
  const baseQueryKey = debouncedValue
    ? [SEARCH_QUERY_KEY, debouncedValue]
    : [QUERY_KEY];

  const queryFn = () =>
    debouncedValue
      ? searchPeople(debouncedValue, pageOffset)
      : fetchPeople(pageOffset);

  const queryKey = [...baseQueryKey, pageOffset];

  return [queryKey, queryFn];
};

export const usePeopleFetching = (): TReturnType => {
  const [page, setPage] = useState(1);
  const { debouncedValue, setValue } = useDebounce("", 700);

  const [queryKey, queryFn] = generateQueryParams(debouncedValue, page);
  const [queryKeyPrefetch, queryFnPrefetch] = generateQueryParams(
    debouncedValue,
    page + 1
  );

  const { data, isFetching, isPreviousData } = useQuery({
    queryKey,
    queryFn,
    keepPreviousData: true,
    staleTime: STALE_TIME,
    refetchOnWindowFocus: false,
  });

  // Prefetch the next page
  useEffect(() => {
    if (!isPreviousData && data?.next) {
      queryClient.prefetchQuery({
        queryKey: queryKeyPrefetch,
        queryFn: queryFnPrefetch,
        staleTime: STALE_TIME,
      });
    }
  }, [data, isPreviousData, page, queryClient]);

  return { setPage, data, isFetching, page, setSearchParam: setValue };
};
