import { lazy, Suspense } from "react"
import Loading from "../../components/loading"

const MovieListReusable = lazy(()=> import("../../components/movieListReusable"))

const Search = ()=> {
    return(
        <Suspense fallback={<Loading />}>
            <MovieListReusable section="search" />
        </Suspense>
    )
}

export default Search