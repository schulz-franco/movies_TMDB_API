import axios from "axios"
import options from "./options"

export default async function searchMovies(page, query) {
  try {
    const response = await axios.get('https://api.themoviedb.org/3/search/movie?include_adult=false&page=' + page + "&query=" + query, options);
    return response.data
  } catch (error) {
    throw error
  }
}