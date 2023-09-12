import axios from "axios";

const baseURL = "https://swapi.dev/api/";

export const axiosClient = axios.create({ baseURL });
