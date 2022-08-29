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

export default function App() {
  return (
    <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<><Carousel /><Movies /></>} />
          <Route path="/movies/genres/:id/:genre_name" element={<><Carousel /><Genres /></>} />
          <Route path="/search/:search" element={<Search />} />
        </Routes>
  </BrowserRouter>
  );
}
