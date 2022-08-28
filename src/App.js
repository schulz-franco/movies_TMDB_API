import { 
  BrowserRouter,
  Routes,
  Route 
} from 'react-router-dom';
import Navbar from "./components/navbar"
import Carousel from "./components/carousel"
import Movies from "./components/movies"

export default function App() {
  return (
    <BrowserRouter>
        <Navbar />
        <Carousel />
        <Routes>
          <Route path='/' element={<Movies />} />
        </Routes>
  </BrowserRouter>
  );
}
