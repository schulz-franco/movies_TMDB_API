import axios from "axios"
import options from "./options"

export default async function getNews(amount) {
  try {
    const response = await axios.get('https://api.themoviedb.org/3/discover/movie?primary_release_date.gte=2022-08-01&primary_release_date.lte=2022-08-28', options);
    let moviesNews = []
    for (let count = 0; count < amount; count++) {
      moviesNews.push(response.data.results[count])
    }
    return moviesNews
  } catch (error) {
    console.error(error);
  }
}