import { lazy, Suspense } from "react"
import Loading from "../../components/loading"

const FilterSearch = lazy(()=> import("../../components/filter_search"))

const Search = ()=> {
    return(
        <Suspense fallback={<Loading />}>
            <FilterSearch />
        </Suspense>
    )
}

export default Search