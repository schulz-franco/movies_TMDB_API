import axios from "axios"
import options from "./options"

export default async function getGenres() {
  try {
    const response = await axios.get('https://api.themoviedb.org/3/genre/movie/list', options);
    return response.data.genres
  } catch (error) {
    throw error
  }
}