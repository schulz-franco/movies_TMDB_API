import { useEffect, useState } from "react"
import { get_movie } from "../tmdb-api/api_methods"
import Loader from "../assets/loading.gif"
import { Link, useParams } from "react-router-dom"
import { AiFillStar } from "react-icons/ai"
import No_img from "../assets/no_image.jpg"

export default function Movie() {

    const {id} = useParams()
    const [movie, set_movie] = useState(null)
    const [credits, set_credits] = useState(null)
    const [images, set_images] = useState(null)
    const [loading, set_loading] = useState(true)

    useEffect(()=> {
        get_movie(id, "").then(res=> {
            set_movie(res)
        })
        get_movie(id, "/credits").then(res=> {
            set_credits(res)
            console.log(res)
        })
        get_movie(id, "/images?include_image_language=en").then(res=> {
            set_images(res)
            console.log(res)
        })
        if (loading) {
            setTimeout(()=> {
                set_loading(false)
            }, 4000)
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
                            <div className="items">
                                {credits.cast.map((person, index) => {
                                    if (index < 9) {
                                        return(
                                            <div className="item">
                                                {(person.profile_path) ? <img className="img-person" src={"https://image.tmdb.org/t/p/original" + person.profile_path} alt={person.original_name} /> : <img className="img-person" src={No_img} alt="Without image" />}
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
                                        <img width={300} height={200} className="img-backdrop" src={"https://image.tmdb.org/t/p/original" + image.file_path} alt={movie.title}/>
                                    )
                                })}
                                {(images.posters.length != 0) && images.posters.map((image, index) => {
                                    if (index < 10) {
                                        return(
                                            <img width={300} height={200} className="img-backdrop" src={"https://image.tmdb.org/t/p/original" + image.file_path} alt={movie.title}/>
                                        )
                                    }
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