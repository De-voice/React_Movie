import axios from "axios";


export const reqInstance = axios.create({
	baseURL: "https://api.themoviedb.org/3",
});