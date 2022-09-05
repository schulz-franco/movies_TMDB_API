import { Link } from "react-router-dom"
import { LazyLoadImage } from "react-lazy-load-image-component"

import scrollTop from "../../utilities/scrollTop"

import placeholderImage from "../../assets/placeholderImage.jpg"
import noImage from "../../assets/noImage.jpg"

const MovieRecommendations = (props)=> {
    if (props.recommendations && props.recommendations.results.length!== 0) return(
        <div style={{border: "none"}} className="section-container">
            <span className="title">Recommendations</span>
            <div style={{borderBottom: "1px solid rgb(221, 221, 221)"}} className="items">
                {props.recommendations.results.map(recommendation => {
                    return(
                        <Link style={{marginBottom: ".5rem"}} onClick={scrollTop} to={"/movie/" + recommendation.id}>
                            {(recommendation.poster_path) ? <LazyLoadImage  wrapperClassName="img-movie" width={150} height={200} className="img-movie" src={"https://image.tmdb.org/t/p/w500" + recommendation.poster_path} alt={props.title.title} placeholderSrc={placeholderImage} /> : <img width={150} height={200} className="img-movie" src={noImage} alt={props.title.title}/>}
                            <span className="recommendation-movie-title">{recommendation.title}</span>
                        </Link>
                    )
                })}
            </div>
        </div>
    )

}

export default MovieRecommendations