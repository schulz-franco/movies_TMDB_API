import { lazy, Suspense } from "react"
import Loading from "../../components/loading"

const Movie = lazy(()=> import("../../components/movie"))

const MovieInfo = ()=> {
    return(
        <Suspense fallback={<Loading />}>
            <Movie />
        </Suspense>
    )
}

export default MovieInfo