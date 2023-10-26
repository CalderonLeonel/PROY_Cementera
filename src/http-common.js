import axios from "axios";

export default axios.create({
  baseURL: "http://34.121.212.171:3000",
  headers: {
    "Content-type": "application/json"
  }
});