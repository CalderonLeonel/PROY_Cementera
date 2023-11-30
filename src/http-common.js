import axios from "axios";

export default axios.create({
  baseURL: "http://http://34.121.212.171:3000", //"http://192.168.0.4:3000", //
  headers: {
    "Content-type": "application/json"
  }
});