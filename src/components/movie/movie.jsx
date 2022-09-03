import useMovie from "../../hooks/useMovie"
import MovieHeader from "./movieHeader"
import MovieBasicInfo from "./movieBasicInfo"
import MovieTextContainer from "./movieTextContainer"
import MovieCast from "./movieCast"
import MovieMedia from "./movieMedia"
import MovieRecommendations from "./movieRecommendations"
import MovieMoreInfo from "./movieMoreInfo"

const Movie = ()=> {

    const { movie, credits, images, recommendations } = useMovie()

    if (movie) return(
        <div className="movie-page-container">
            <MovieHeader movie={movie} />
            <div className="info-container">
                <MovieBasicInfo movie={movie} />
                <MovieTextContainer movie={movie} credits={credits} />
                <MovieCast credits={credits} id={movie.id} />
                <MovieMedia images={images} title={movie.title} />  
                <MovieRecommendations recommendations={recommendations} title={movie.title} />
                <MovieMoreInfo movie={movie} />
            </div>
        </div>
    )
}

export default Movie