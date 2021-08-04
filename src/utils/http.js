import axios from "axios";
import config from "../config";
import {getToken} from "./Token"

const accessToken = getToken();
const http = axios.create({
  headers: {
    Authorization: `Bearer ${accessToken}`,
    "Content-Type": "application/json",
  },
  baseURL: config.baseURI,
});

export default http;
