import axios from "axios";
import humps, { Camelized } from "humps";
import { IPeopleData } from "../types";

const baseURL = "https://swapi.dev/api/";

export const axiosClient = axios.create({ baseURL });

export const fetchPeople = (
  page: number
): Promise<IPeopleData | Camelized<any>> =>
  axiosClient
    .get(`/people/?page=${page}`)
    .then((res) => humps.camelizeKeys(res.data));

export const searchPeople = (
  searchParam: string,
  page: number
): Promise<IPeopleData | Camelized<any>> =>
  axiosClient
    .get(`/people/?search=${searchParam}&page=${page}`)
    .then((res) => humps.camelizeKeys(res.data));

export const fetchProfile = (id?: string) =>
  axiosClient.get(`/people/${id}`).then((res) => humps.camelizeKeys(res.data));
