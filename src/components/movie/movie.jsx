import useMovie from "../../hooks/useMovie"

import MovieHeader from "./movieHeader"
import MovieBasicInfo from "./movieBasicInfo"
import MovieTextContainer from "./movieTextContainer"
import MovieCast from "./movieCast"
import MovieMedia from "./movieMedia"
import MovieRecommendations from "./movieRecommendations"
import MovieMoreInfo from "./movieMoreInfo"
import ErrorMessage from "../errorMessage"

const Movie = ()=> {

    const { movie, credits, images, recommendations, error, scrollableMedia, scrollableRecommendations } = useMovie()

    if (error) return <ErrorMessage code={error["code"]} message={error["message"]} />

    if (movie) return(
        <div className="movie-page-container">
            <MovieHeader movie={movie} />
            <div className="info-container">
                <MovieBasicInfo movie={movie} />
                <MovieTextContainer movie={movie} credits={credits} />
                <MovieCast credits={credits} id={movie.id} />
                <MovieMedia mediaRef={scrollableMedia} images={images} title={movie.title} />  
                <MovieRecommendations mediaRef={scrollableMedia} recommendationsRef={scrollableRecommendations} recommendations={recommendations} title={movie.title} />
                <MovieMoreInfo movie={movie} />
            </div>
        </div>
    )
}

export default Movie