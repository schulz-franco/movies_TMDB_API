import { 
  BrowserRouter,
  Routes,
  Route 
} from 'react-router-dom';
import Navbar from "./components/navbar"
import Carousel from "./components/carousel"
import Movies from "./components/movies"
import Genres from "./components/filter_genre"
import Search from "./components/filter_search"
import Movie from "./components/movie"
import Res_error from "./components/res_error"

export default function App() {
  if (window.innerWidth <= 425) {
    return (
      <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path='/' element={<><Carousel /><Movies /></>} />
            <Route path="/movies/genres/:id/:genre_name" element={<><Carousel /><Genres /></>} />
            <Route path="/movies/search/:search" element={<Search />} />
            <Route path="/movie/:id" element={<Movie />} />
          </Routes>
      </BrowserRouter>
    );
  } else {
    return <Res_error />
  }
}
