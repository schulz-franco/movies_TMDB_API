import { useRef } from "react"
import { LazyLoadImage } from "react-lazy-load-image-component"
import { GoArrowDown } from "react-icons/go"
import scrollItems from "../../utilities/scrollItems"
import placeholderImage from "../../assets/placeholderImage.jpg"

const MovieMedia = (props)=> {

    const elementItems = useRef(null)

    if (props.images && (props.images.backdrops.length!== 0 || props.images.posters.length!== 0)) return(
        <div className="section-container">
        <div className="section-header">
            <span className="title">Media</span>
            <span></span>
            {elementItems && 
                <div className="arrows">
                    <GoArrowDown onClick={()=> scrollItems(elementItems.current, "left")} className="prev-arrow" />
                    <GoArrowDown onClick={()=> scrollItems(elementItems.current, "rigth")} className="next-arrow" />
                </div>
            }
        </div>
        <div ref={elementItems} className="items">
            {(props.images.backdrops.length!== 0) && props.images.backdrops.map(image => {
                return(
                    <LazyLoadImage key={image.file_path}  wrapperClassName="lazy-load-img-backdrop" width={"min-content"} height={200} className="img-backdrop" src={"https://image.tmdb.org/t/p/w400" + image.file_path} alt={props.title.title} placeholderSrc={placeholderImage} />
                )
            })}
            {(props.images.posters.length!== 0) && props.images.posters.map((image, index) => {
                if (index < 10) {
                    return(
                        <LazyLoadImage key={image.file_path}  wrapperClassName="lazy-load-img-backdrop" width={"min-content"} height={200} className="img-backdrop" src={"https://image.tmdb.org/t/p/w400" + image.file_path} alt={props.title.title} placeholderSrc={placeholderImage} />
                    )
                }
            })}
        </div>
    </div>
    ) 

}

export default MovieMedia