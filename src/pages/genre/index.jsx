import { lazy, Suspense } from "react"
import Loading from "../../components/loading"

const Carousel = lazy(()=> import("../../components/carousel"))
const FilterGenre = lazy(()=> import("../../components/filter_genre"))

const Genre = ()=> {
    return(
        <Suspense fallback={<Loading />}>
            <Carousel />
            <FilterGenre />
        </Suspense>
    )
}

export default Genre