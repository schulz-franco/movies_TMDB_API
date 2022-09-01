import { lazy, Suspense } from "react"
import Loading from "../../components/loading"

const Carousel = lazy(()=> import("../../components/carousel"))
const Movies = lazy(()=> import("../../components/movies"))

const Home = ()=> {
    return(
        <Suspense fallback={<Loading />}>
            <Carousel />
            <Movies />
        </Suspense>
    )
}

export default Home