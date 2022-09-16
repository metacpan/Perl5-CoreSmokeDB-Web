import axios from "axios";

export const p5sdbClient = axios.create({
  baseURL: import.meta.env.VITE_P5SDB_URL,
  timeout: 20000,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/x-www-form-urlencoded",
  },
});

//export default p5sdbClient;
