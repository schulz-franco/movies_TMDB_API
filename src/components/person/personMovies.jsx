import { Link } from "react-router-dom"
import { LazyLoadImage } from "react-lazy-load-image-component"
import scrollTop from "../../utilities/scrollTop"
import placeholderImage from "../../assets/placeholderImage.jpg"
import noImage from "../../assets/noImage.jpg"

const PersonMovies = (props)=> {
    if (props.cast && props.cast.length != 0) return( 
        <div style={{border: "none"}} className="section-container">
            <span style={{paddingLeft: "2rem", fontSize: "1.3rem"}} className="title">Know For</span>
            <div style={{borderBottom: "1px solid rgb(221, 221, 221)", paddingLeft: "2rem"}} className="items">
                {props.cast.map((movie, index) => {
                    if (index < 10) return(
                        <Link style={{marginBottom: ".5rem"}} onClick={scrollTop} to={"/movie/" + movie.id}>
                            {(movie.poster_path) ? <LazyLoadImage  wrapperClassName="img-movie" width={150} height={200} className="img-movie" src={"https://image.tmdb.org/t/p/w500" + movie.poster_path} alt={movie.title} placeholderSrc={placeholderImage} /> : <img width={150} height={200} className="img-movie" src={noImage} alt={movie.title}/>}
                            <span className="recommendation-movie-title">{movie.title}</span>
                        </Link>
                    )
                })}
            </div>
        </div>
    )
}

export default PersonMovies