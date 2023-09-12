import React from "react";
import { useRequest } from "../hooks";
import { axiosClient } from "../api";

export const PeopleListing = (): React.JSX.Element => {
  const { query } = useRequest();

  const {
    data: people,
    isLoading,
    isError,
  } = query(
    ["people"],
    () => axiosClient.get("/people").then((res) => res.data),
    { enabled: true }
  );

  console.log(people, "people>>>");
  return <div></div>;
};
