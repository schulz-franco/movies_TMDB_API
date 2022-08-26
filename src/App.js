import { 
  BrowserRouter,
  Routes,
  Route 
} from 'react-router-dom';
import Navbar from "./components/navbar"
import Carousel from "./components/carousel"

export default function App() {
  return (
    <BrowserRouter>
        <Navbar />
        <Carousel />
        <Routes>
          <Route path='/' element={<></>} />
        </Routes>
  </BrowserRouter>
  );
}
