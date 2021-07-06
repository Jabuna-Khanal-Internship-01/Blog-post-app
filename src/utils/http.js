import axios from "axios";
import config from "../config";

const http = axios.create({
  headers: {
    Authorization: `Bearer ${"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwZTI5MjYyZjEyMWIzMDlkMTU4NDg5ZCIsImlhdCI6MTYyNTU1MTA3MSwiZXhwIjoxNjI1NTUxNjcxfQ.SST5XppwgUhUCVuplu8VLvMR9SGiRnKTeDaQwSfhXB8"}`,
    "Content-Type": "application/json",
  },
  baseURL: config.baseURI,
});

export default http;
