import { lazy, Suspense } from "react"
import Loading from "../../components/loading"

const Carousel = lazy(()=> import("../../components/carousel"))
const MovieListReusable = lazy(()=> import("../../components/movieListReusable"))

const Genre = ()=> {
    return(
        <Suspense fallback={<Loading />}>
            <Carousel />
            <MovieListReusable section="genres" />
        </Suspense>
    )
}

export default Genre