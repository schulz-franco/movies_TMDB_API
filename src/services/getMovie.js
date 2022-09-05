import axios from "axios"
import options from "./options"

export default async function getMovie(id, query) {
  try {
    const response = await axios.get('https://api.themoviedb.org/3/movie/' + id + query, options);
    return response.data
  } catch (error) {
    throw error
  }
}