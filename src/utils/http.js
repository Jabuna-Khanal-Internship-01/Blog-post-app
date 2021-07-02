
import axios from "axios";
import config from "../config"

const http = axios.create({
    headers: { "Content-Type": "application/json" },
    baseURL: config.baseURI,
});

export default http;