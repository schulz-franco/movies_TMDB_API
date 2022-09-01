import axios from "axios"
import options from "./options"

export default async function getMovies(page, query) {
  try {
    const response = await axios.get('https://api.themoviedb.org/3/discover/movie?include_adult=false&page=' + page + query, options);
    return response.data
  } catch (error) {
    console.error(error);
  }
}