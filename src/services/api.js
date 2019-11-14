import axios from "axios";

const api = axios.create({
    baseURL: "https://restapi-node-aps.herokuapp.com"
});

export default api;