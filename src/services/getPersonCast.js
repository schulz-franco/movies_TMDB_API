import axios from "axios"
import options from "./options"

export default async function getPersonCast(id) {
  try {
    const response = await axios.get('https://api.themoviedb.org/3/person/' + id + "/movie_credits", options);
    return response.data
  } catch (error) {
    throw error
  }
}