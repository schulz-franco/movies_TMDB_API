import { lazy, Suspense } from "react"
import Loading from "../../components/loading"

const FilterSearch = lazy(()=> import("../../components/filterSearch"))

const Search = ()=> {
    return(
        <Suspense fallback={<Loading />}>
            <FilterSearch />
        </Suspense>
    )
}

export default Search