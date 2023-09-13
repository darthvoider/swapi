import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchProfile } from "../api";

export const Profile = (): React.ReactElement => {
  const { id } = useParams();

  const { data, isFetching } = useQuery({
    queryKey: ["profile", id],
    queryFn: () => fetchProfile(id),
    refetchOnWindowFocus: false,
    enabled: !!id,
  });

  console.log(data, "data>>>");

  return <div></div>;
};
