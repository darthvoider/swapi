import {
  useQuery,
  QueryKey,
  QueryFunction,
  QueryOptions,
} from "@tanstack/react-query";

export const useRequest = () => {
  const query = (
    key: QueryKey,
    queryFunction: QueryFunction,
    options: any = {}
  ) => {
    return useQuery({
      queryKey: key,
      queryFn: queryFunction,
      ...options,
    });
  };

  return { query };
};
