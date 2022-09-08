import { Link } from "react-router-dom"
import { LazyLoadImage } from "react-lazy-load-image-component"
import { BiLeftArrowAlt } from "react-icons/bi"

import placeholderImage from "../../assets/placeholderImage.jpg"
import noImage from "../../assets/noImage.jpg"

const CastMovie = (props)=> {
    return(
        <div style={props.backdrop && {backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(https://image.tmdb.org/t/p/original" + props.backdrop + ")"}} className="cast-movie-container">
            {props.image ? <LazyLoadImage  wrapperClassName="lazy-load-poster" width={80} height={110} src={"https://image.tmdb.org/t/p/w200" + props.image} placeholderSrc={placeholderImage} /> : <img width={80} height={110} src={noImage} />}
            <div className="cast-movie-title">
                <span className="title">{props.title}</span>
                <Link to={"/movie/" + props.id} className="back-button">
                    <BiLeftArrowAlt className="arrow" />
                    <span>Back to main</span>
                </Link>
            </div>
        </div>
    )
}

export default CastMovie