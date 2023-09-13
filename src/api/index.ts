import axios from "axios";
import humps, { Camelized } from "humps";
import { IPeopleData, ICharacter, ISpecie, IStarship } from "../types";

const baseURL = "https://swapi.dev/api/";

export const axiosClient = axios.create({ baseURL });

const axiosGet = (url: string) =>
  axiosClient.get(url).then((res) => humps.camelizeKeys(res.data));

export const fetchPeople = (page: number): Promise<Camelized<IPeopleData>> =>
  axiosGet(`/people/?page=${page}`);

export const searchPeople = (
  searchParam: string,
  page: number
): Promise<Camelized<IPeopleData>> =>
  axiosGet(`/people/?search=${searchParam}&page=${page}`);

export const fetchProfile = (id?: string): Promise<Camelized<ICharacter>> =>
  axiosGet(`/people/${id}`);

export const fetchSpecies = (id?: string): Promise<Camelized<ISpecie>> =>
  axiosGet(`/species/${id}`);

export const fetchStarships = (id?: string): Promise<Camelized<IStarship>> =>
  axiosGet(`/starships/${id}`);
