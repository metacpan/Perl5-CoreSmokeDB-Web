import axios from "axios";

function content_type(apiService) {
  return apiService === 'rest'
    ? 'application/json'
    : 'application/x-www-form-urlencoded';
}

export const p5sdbClient = axios.create({
  baseURL: import.meta.env.VITE_P5SDB_URL,
  timeout: 20000,
  headers: {
    Accept: "application/json",
    "Content-Type": content_type(import.meta.env.VITE_API_SERVICE),
  },
});

//export default p5sdbClient;
