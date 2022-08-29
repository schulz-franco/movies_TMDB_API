import { 
  BrowserRouter,
  Routes,
  Route 
} from 'react-router-dom';
import Navbar from "./components/navbar"
import Carousel from "./components/carousel"
import Movies from "./components/movies"
import Genres from "./components/filter_genre"

export default function App() {
  return (
    <BrowserRouter>
        <Navbar />
        <Carousel />
        <Routes>
          <Route path='/' element={<Movies />} />
          <Route path="/movies/genres/:id/:genre_name" element={<Genres />} />
        </Routes>
  </BrowserRouter>
  );
}
