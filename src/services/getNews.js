import axios from "axios"
import options from "./options"

export default async function getNews(amount) {
  try {
    const response = await axios.get('https://api.themoviedb.org/3/discover/movie?include_adult=false&page=1', options);
    let moviesNews = []
    for (let count = 0; count < amount; count++) {
      moviesNews.push(response.data.results[count])
    }
    return moviesNews
  } catch (error) {
    throw error
  }
}