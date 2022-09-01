import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Loading from "./components/loading"
import Navbar from "./components/navbar"

const Res_error = lazy(()=> import("./components/res_error"))
const Carousel = lazy(()=> import("./components/carousel"))
const Movies = lazy(()=> import("./components/movies"))
const Genres = lazy(()=> import("./components/filter_genre"))
const Search = lazy(()=> import("./components/filter_search"))
const Movie = lazy(()=> import("./components/movie"))


export default function App() {
  if (window.innerWidth <= 425) {
    return (
      <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path='/' element={<Suspense fallback={<Loading />}><Carousel /><Movies /></Suspense>} />
            <Route path="/movies/genres/:id/:genre_name" element={<Suspense fallback={<Loading />}><Carousel /><Genres /></Suspense>} />
            <Route path="/movies/search/:search" element={<Suspense fallback={<Loading />}><Search /></Suspense>} />
            <Route path="/movie/:id" element={<Suspense fallback={<Loading />}><Movie /></Suspense>} />
          </Routes>
      </BrowserRouter>
    );
  } else {
    return <Suspense fallback={<Loading />}><Res_error /></Suspense>
  }
}
