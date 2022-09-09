import { useRef } from "react"
import { Link } from "react-router-dom"
import { LazyLoadImage } from "react-lazy-load-image-component"
import { GoArrowDown } from "react-icons/go"
import scrollItems from "../../utilities/scrollItems"
import placeholderImage from "../../assets/placeholderImage.jpg"
import noImage from "../../assets/noImage.jpg"

const MovieRecommendations = (props)=> {

    const elementItems = useRef(null)

    if (props.recommendations && props.recommendations.results.length!== 0) return(
        <div className="section-container">
            <div className="section-header">
                <span className="title">Recommendations</span>
                <span></span>
                {elementItems && 
                    <div className="arrows">
                        <GoArrowDown onClick={()=> scrollItems(elementItems.current, "left")} className="prev-arrow" />
                        <GoArrowDown onClick={()=> scrollItems(elementItems.current, "rigth")} className="next-arrow" />
                    </div>
                }
            </div>
            <div ref={elementItems} className="items">
                {props.recommendations.results.map(recommendation => {
                    return(
                        <Link key={recommendation.id} style={{marginBottom: ".5rem"}} onClick={()=> window.scrollTo(0, 0)} to={"/movie/" + recommendation.id}>
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