import { Link } from "react-router-dom"
import { FaPlay } from "react-icons/fa"

const images_url = "https://image.tmdb.org/t/p/w500"

export default function Movie_carousel(props) {

    let background_style = {
        backgroundImage: "url(" + images_url + props.backdrop_url + ")"
    }

    return(
        <div style={background_style} className="movie-carousel-container">
            <span className="movie-name">{props.title}</span>
            <div className="movie-info-container">
                <span className="movie-info-vote">{props.vote}/10</span>
                <span className="movie-info-date">{props.year}</span>
            </div>
            <p className="movie-overview">{props.overview}</p>
            <div className="movie-go-button">
                <FaPlay className="movie-go-button-icon" />
                <Link to={"/movie/" + props.id}>See more</Link>
            </div>
        </div>
    )
}