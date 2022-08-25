import axios from "axios"

const api_key = ''

const options = {
  headers: {
    'Authorization': 'Bearer ' + api_key,
    'Content-Type': 'application/json;charset=utf-8'
  }
}

export async function get_movies(page) {
  try {
    const response = await axios.get('https://api.themoviedb.org/4/discover/movie?sort_by=popularity.desc?page=' + page, options);
    return response.data.results
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