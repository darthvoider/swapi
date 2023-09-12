import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Camelized } from "humps";
import { fetchPeople } from "../api";
import { queryClient } from "../providers/ReactQueryProvider";
import { IPeopleData } from "../types";

type TReturnType = {
  setPage: (page: number) => void;
  data: IPeopleData | Camelized<any> | undefined;
  isFetching: boolean;
  page: number;
};
const STALE_TIME = 50000;
const QUERY_KEY = "people";
export const usePeopleFetching = (): TReturnType => {
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

  return { setPage, data, isFetching, page };
};
