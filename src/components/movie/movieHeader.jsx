import { AiFillStar } from "react-icons/ai"
import noImage from "../../assets/noImage.jpg"

const MovieHeader = (props)=> {
    if (props.movie) return(
        <div style={props.movie.backdrop_path && {backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(https://image.tmdb.org/t/p/w500" + props.movie.backdrop_path + ")"}} className="header-container">
            {props.movie.poster_path ? <img  width={120} height={180} className="poster" src={"https://image.tmdb.org/t/p/w200" + props.movie.poster_path} alt={props.movie.title} /> : <img width={120} height={180} className="poster" src={noImage} alt={props.movie.title}/>}
            <div className="title-container">
                <span className="title">{props.movie.title}</span>
                <div className="vote-container">
                    <AiFillStar className="star"/>
                    <span className="vote">{props.movie.vote_average.toFixed(1)}/10</span>
                </div>
            </div>
        </div>
    )
}

export default MovieHeader