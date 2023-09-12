import axios from "axios";
import humps, { Camelized } from "humps";
import { IPeopleData } from "../types";

const baseURL = "https://swapi.dev/api/";

export const axiosClient = axios.create({ baseURL });

export const fetchPeople = (): Promise<IPeopleData | Camelized<any>> =>
  axiosClient.get("/people/").then((res) => humps.camelizeKeys(res.data));
