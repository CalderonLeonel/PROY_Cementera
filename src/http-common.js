import axios from "axios";

export default axios.create({
  baseURL: "https://34.68.223.247:3000",
  headers: {
    "Content-type": "application/json"
  }
});