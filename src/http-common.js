import axios from "axios";

export default axios.create({
  baseURL: "http://10.128.0.2:3000",
  headers: {
    "Content-type": "application/json"
  }
});