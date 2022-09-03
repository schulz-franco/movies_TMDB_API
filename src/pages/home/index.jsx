import Carousel from "../../components/carousel"
import MovieListReusable from "../../components/movieListReusable"

const Home = ()=> {
    return(
        <>
            <Carousel />
            <MovieListReusable section="home" />
        </>
    )
}

export default Home