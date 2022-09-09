import { useRef } from "react"
import { Link } from "react-router-dom"
import { LazyLoadImage } from "react-lazy-load-image-component"
import { GoArrowDown } from "react-icons/go"
import scrollItems from "../../utilities/scrollItems"
import scrollTop from "../../utilities/scrollTop"
import placeholderImage from "../../assets/placeholderImage.jpg"
import noImage from "../../assets/noImage.jpg"

const PersonMovies = (props)=> {

    const elementItems = useRef(null)

    if (props.cast && props.cast.length > 2) return( 
        <div style={{border: "none"}} className="section-container">
            <div className="section-header">
                <span style={{fontSize: "1.2rem"}} className="title">Known for</span>
                <span></span>
                {elementItems && 
                    <div className="arrows">
                        <GoArrowDown onClick={()=> scrollItems(elementItems.current, "left")} className="prev-arrow" />
                        <GoArrowDown onClick={()=> scrollItems(elementItems.current, "rigth")} className="next-arrow" />
                    </div>
                }
            </div>
            <div ref={elementItems} className="items" style={{marginBottom: "2rem"}}>
                {props.cast.map((movie, index) => {
                    if (index < 10) return(
                        <Link key={movie.id} style={{marginBottom: ".5rem"}} onClick={scrollTop} to={"/movie/" + movie.id}>
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