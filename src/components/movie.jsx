import { useEffect, useState } from "react"
import { get_movie } from "../tmdb-api/api_methods"
import Loader from "../assets/loading.gif"
import { useParams } from "react-router-dom"
import { AiFillStar } from "react-icons/ai"

export default function Movie() {

    const {id} = useParams()
    const [movie, set_movie] = useState(null)
    const [credits, set_credits] = useState(null)
    const [loading, set_loading] = useState(true)

    useEffect(()=> {
        get_movie(id, "").then(res=> {
            set_movie(res)
            console.log(res)
        })
        get_movie(id, "/credits").then(res=> {
            set_credits(res)
            console.log(res)
        })
        if (loading) {
            setTimeout(()=> {
                set_loading(false)
            }, 3000)
        }
    }, [id])

    return(
        <div className="movie-page-container">
            {(loading) && 
                <div className="loading">
                    <img src={Loader} alt="Loading..." />
                </div>
            }
            {movie && 
                <>
                <div style={(movie.backdrop_path != "") && {backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(https://image.tmdb.org/t/p/original" + movie.backdrop_path + ")"}} className="header-container">
                    <img className="poster" src={"https://image.tmdb.org/t/p/w200" + movie.poster_path} alt={movie.title} />
                    <div className="title-container">
                        <span className="title">{movie.title} {(movie.release_date != "") ? ("(" + movie.release_date.slice(0, 4) + ")") : ""}</span>
                        <div className="vote-container">
                            <AiFillStar className="star"/>
                            <span className="vote">{movie.vote_average.toFixed(1)}/10</span>
                        </div>
                    </div>
                </div>
                <div className="info-container">
                    <div className="basic-info">
                        <div className="dates">
                            <span>{(movie.release_date != "") ? movie.release_date.slice(0, 10) : "without date"}</span>
                            <span className="language">({movie.original_language.toUpperCase()})</span>
                            <span>‣ {(movie.runtime != 0) ? (Math.trunc(movie.runtime/60) + "h " + movie.runtime%60 + "m") : "without duration"}</span>
                        </div>
                        <span>{(movie.genres.length != 0) && movie.genres.map((genre, index)=> {
                            if (index != (movie.genres.length - 1)) {
                                return genre.name + " - "
                            }
                            return genre.name
                        })}</span>
                    </div>
                    <div className="texts-container">
                        <span className="text">{(movie.tagline != "") ? movie.tagline : "Without tagline"}</span>
                        <span className="title">Overview</span>
                        <span className="text">{movie.overview}</span>
                    </div>
                </div>
                </>
            }
        </div>
    )
}