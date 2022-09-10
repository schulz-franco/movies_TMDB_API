import { Link } from "react-router-dom"
import { LazyLoadImage } from "react-lazy-load-image-component"
import { GoArrowDown } from "react-icons/go"
import scrollItems from "../../utilities/scrollItems"
import placeholderImage from "../../assets/placeholderImage.jpg"
import noImage from "../../assets/noImage.jpg"
import { animateScroll } from "react-scroll"

const scrollType = {
    duration: 400,
    delay: 0,
    smooth: true, // linear “easeInQuint” “easeOutCubic” 
    offset: 0,
 };

const onClickHandler = (mediaRef, recommendationsRef)=> {
    animateScroll.scrollToTop(scrollType)
    mediaRef.current.scrollLeft = 0
    recommendationsRef.current.scrollLeft = 0
}

const MovieRecommendations = (props)=> {

    if (props.recommendations && props.recommendations.results.length!== 0) return(
        <div className="section-container">
            <div className="section-header">
                <span className="title">Recommendations</span>
                <span></span>
                {props.recommendationsRef &&
                    <div className="arrows">
                        <GoArrowDown onClick={()=> scrollItems(props.recommendationsRef.current, "left")} className="prev-arrow" />
                        <GoArrowDown onClick={()=> scrollItems(props.recommendationsRef.current, "rigth")} className="next-arrow" />
                    </div>
                }
            </div>
            <div ref={props.recommendationsRef} className="items">
                {props.recommendations.results.map(recommendation => {
                    return(
                        <Link key={recommendation.id} style={{marginBottom: ".5rem"}} onClick={()=> onClickHandler(props.mediaRef, props.recommendationsRef)} to={"/movie/" + recommendation.id}>
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