import axios from "axios"
import options from "./options"

export default async function getPerson(id) {
  try {
    const response = await axios.get('https://api.themoviedb.org/3/person/' + id, options);
    return response.data
  } catch (error) {
    throw error
  }
}