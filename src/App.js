import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Loading from "./components/loading"
import Navbar from "./components/navbar"

const Home = lazy(()=> import("./pages/home/index"))
const Genre = lazy(()=> import("./pages/genre/index"))
const Search = lazy(()=> import("./pages/search/index"))
const MovieInfo = lazy(()=> import("./pages/movie/index"))
const Crew = lazy(()=> import("./pages/crew/index"))

const ResError = lazy(()=> import("./components/resError"))

export default function App() {
  if (window.innerWidth <= 470) {
    return (
      <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path='/' element={<Suspense fallback={<Loading />}><Home /></Suspense>} />
            <Route path="/movies/genres/:id/:genreName" element={<Suspense fallback={<Loading />}><Genre /></Suspense>} />
            <Route path="/movies/search/:search" element={<Suspense fallback={<Loading />}><Search /></Suspense>} />
            <Route path="/movie/:id" element={<Suspense fallback={<Loading />}><MovieInfo /></Suspense>} />
            <Route path="/crew/:id" element={<Suspense fallback={<Loading />}><Crew /></Suspense>} />
          </Routes>
      </BrowserRouter>
    );
  } else {
    return(
    <Suspense fallback={<Loading />}>
      <ResError />
    </Suspense>)
  }
}