import { 
  BrowserRouter,
  Routes,
  Route 
} from 'react-router-dom';
import Navbar from "./components/navbar"

export default function App() {
  return (
    <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<></>} />
        </Routes>
  </BrowserRouter>
  );
}
