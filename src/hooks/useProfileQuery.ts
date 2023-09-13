import { useParams } from "react-router-dom";
import { useQuery, useQueries } from "@tanstack/react-query";
import { fetchProfile, fetchSpecies, fetchStarships } from "../api";
import { getSpecieId } from "../utils";
import dayjs from "dayjs";
import { DDMMYYYYHHMM } from "../constants";

export const useProfileQuery = () => {
  const { id } = useParams();

  const { data: character, isFetching: isFetchingCharacter } = useQuery({
    queryKey: ["profile", id],
    queryFn: () => fetchProfile(id),
    refetchOnWindowFocus: false,
    enabled: !!id,
  });

  const specieId = getSpecieId(character?.species?.[0]);
  const starShipsIds = character?.starships.map((starShipUrl: string) =>
    getSpecieId(starShipUrl)
  );

  const { data: specieData, isFetching: isFetchingSpecie } = useQuery({
    queryKey: ["species", specieId],
    queryFn: () => fetchSpecies(specieId),
    refetchOnWindowFocus: false,
    enabled: !!specieId,
  });

  const starshipQueries = starShipsIds?.map((id) => ({
    queryKey: ["starship", id],
    queryFn: () => fetchStarships(id),
    enabled: !!id,
    refetchOnWindowFocus: false,
  }));

  const starshipsResponse = useQueries({
    queries: starshipQueries || [],
  });

  const fullProfile = {
    name: character?.name,
    birthYear: character?.birthYear,
    height: character?.height,
    created: dayjs(character?.created).format(DDMMYYYYHHMM),
    averageLifespan: specieData?.averageLifespan,
    classification: specieData?.classification,
    language: specieData?.language,
    starships: starshipsResponse.map(({ data }) => data),
  };

  return {
    ...fullProfile,
    isFetching: {
      isFetchingCharacter,
      isFetchingSpecie,
      isFetchingStarships: starshipsResponse.map(
        ({ isFetching }) => isFetching
      ),
    },
  };
};
