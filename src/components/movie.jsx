import useMovie from "../hooks/useMovie"
import { Link } from "react-router-dom"
import { AiFillStar } from "react-icons/ai"
import No_img from "../assets/no_image.jpg"

const enter_recommendation = ()=> {
    window.scrollTo(0, 0)
}

export default function Movie() {

    const { movie, credits, images, recommendations } = useMovie()

    return(
        <div className="movie-page-container">
            {movie && 
                <>
                <div style={movie.backdrop_path && {backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(https://image.tmdb.org/t/p/w500" + movie.backdrop_path + ")"}} className="header-container">
                    <img className="poster" src={"https://image.tmdb.org/t/p/w200" + movie.poster_path} alt={movie.title} />
                    <div className="title-container">
                        <span className="title">{movie.title}</span>
                        <div className="vote-container">
                            <AiFillStar className="star"/>
                            <span className="vote">{movie.vote_average.toFixed(1)}/10</span>
                        </div>
                    </div>
                </div>
                <div className="info-container">
                    <div className="basic-info">
                        <div className="dates">
                            <span>{(movie.release_date != "") ? movie.release_date.slice(0, 10) : "Without date"}</span>
                            <span className="language">({movie.original_language.toUpperCase()})</span>
                            <span>‣ {(movie.runtime != 0) ? (Math.trunc(movie.runtime/60) + "h " + movie.runtime%60 + "m") : "Without duration"}</span>
                        </div>
                        <span>{(movie.genres.length != 0) && movie.genres.map((genre, index)=> {
                            if (index < 4) {
                                if (index != (movie.genres.length - 1) && index < 3) {
                                    return genre.name + ", "
                                }
                                return genre.name
                            }
                        })}</span>
                    </div>
                    <div className="texts-container">
                        <span className="tagline">{(movie.tagline != "") ? movie.tagline : "Without tagline"}</span>
                        <span className="title">Overview</span>
                        <span className="text">{movie.overview}</span>
                        <div className="director-container">
                            {credits && credits.crew.map(person => {
                                if (person.job == "Director") {
                                    return(
                                        <div>
                                            <span className="director">{person.original_name}</span>
                                            <span className="job">{person.job}</span>
                                        </div>
                                    )
                                }
                            })}
                        </div>
                    </div>
                    {(credits && credits.cast.length != 0) && 
                        <div className="section-container">
                            <span className="title">Top Billed Cast</span>
                            <div style={{borderBottom: "1px solid rgb(221, 221, 221)"}} className="items">
                                {credits.cast.map((person, index) => {
                                    if (index < 9) {
                                        return(
                                            <div className="item">
                                                {(person.profile_path) ? <img className="img-person" src={"https://image.tmdb.org/t/p/w500" + person.profile_path} alt={person.original_name} /> : <img className="img-person" src={No_img} alt="Without image" />}
                                                <Link className="name" to={"/person/" + person.id}>{person.original_name}</Link>
                                                <span className="job">{person.character}</span>
                                            </div>
                                        )
                                    }
                                })}
                            </div>
                            <Link className="full-crew" to={"/crew/" + movie.id} >Full Cast & Crew</Link>
                        </div>
                    }
                    {(images && (images.backdrops.length != 0 || images.posters.length != 0)) && 
                        <div className="section-container">
                            <span className="title">Media</span>
                            <div className="items">
                                {(images.backdrops.length != 0) && images.backdrops.map(image => {
                                    return(
                                        <img width={300} height={200} className="img-backdrop" src={"https://image.tmdb.org/t/p/w500" + image.file_path} alt={movie.title}/>
                                    )
                                })}
                                {(images.posters.length != 0) && images.posters.map((image, index) => {
                                    if (index < 10) {
                                        return(
                                            <img width={300} height={200} className="img-backdrop" src={"https://image.tmdb.org/t/p/w500" + image.file_path} alt={movie.title}/>
                                        )
                                    }
                                })}
                            </div>
                        </div>
                    }
                    {(recommendations && recommendations.results.length != 0) && 
                        <div className="section-container">
                            <span className="title">Recommendations</span>
                            <div style={{borderBottom: "1px solid rgb(221, 221, 221)"}} className="items">
                                {recommendations.results.map(recommendation => {
                                    return(
                                        <Link style={{marginBottom: ".5rem"}} onClick={enter_recommendation} to={"/movie/" + recommendation.id}>
                                            {(recommendation.poster_path) ? <img width={150} height={200} className="img-movie" src={"https://image.tmdb.org/t/p/w500" + recommendation.poster_path} alt={movie.title}/> : <img width={150} height={200} className="img-movie" src={No_img} alt={movie.title}/>}
                                            <span className="recommendation-movie-title">{recommendation.title}</span>
                                        </Link>
                                    )
                                })}
                            </div>
                        </div>
                    }
                </div>
                </>
            }
        </div>
    )
}