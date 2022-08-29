import axios from "axios"

const api_key = ''

const options = {
  headers: {
    'Authorization': 'Bearer ' + api_key,
    'Content-Type': 'application/json;charset=utf-8'
  }
}

export async function get_movies(page, query) {
  try {
    const response = await axios.get('https://api.themoviedb.org/3/discover/movie?include_adult=false&page=' + page + query, options);
    return response.data
  } catch (error) {
    console.error(error);
  }
}

export async function get_genres() {
  try {
    const response = await axios.get('https://api.themoviedb.org/3/genre/movie/list', options);
    return response.data.genres
  } catch (error) {
    console.error(error);
  }
}

export async function get_news(amount) {
  try {
    const response = await axios.get('https://api.themoviedb.org/3/discover/movie?primary_release_date.gte=2022-08-01&primary_release_date.lte=2022-08-28', options);
    let movies_new = []
    for (let count = 0; count < amount; count++) {
      movies_new.push(response.data.results[count])
    }
    return movies_new
  } catch (error) {
    console.error(error);
  }
}