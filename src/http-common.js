import axios from "axios";

export default axios.create({
  baseURL: "http://192.168.0.11:3000",
  headers: {
    "Content-type": "application/json"
  }
});