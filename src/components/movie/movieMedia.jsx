import { useState } from "react"
import { LazyLoadImage } from "react-lazy-load-image-component"
import { GoArrowDown } from "react-icons/go"

import scrollItems from "../../utilities/scrollItems"

import placeholderImage from "../../assets/placeholderImage.jpg"

const elementMedia = "#root > div.movie-page-container > div.info-container > div:nth-child(4) > div.items"

const MovieMedia = (props)=> {

    const [list, setList] = useState(null)

    if (props.images && (props.images.backdrops.length!== 0 || props.images.posters.length!== 0)) return(
        <div className="section-container">
        <div className="section-header">
            <span className="title">Media</span>
            <span></span>
            {list && 
                <div className="arrows">
                    <GoArrowDown onClick={()=> scrollItems(list, "left")} className="prev-arrow" />
                    <GoArrowDown onClick={()=> scrollItems(list, "rigth")} className="next-arrow" />
                </div>
            }
        </div>
        <div onLoad={()=> setList(document.querySelector(elementMedia))} className="items">
            {(props.images.backdrops.length!== 0) && props.images.backdrops.map(image => {
                return(
                    <LazyLoadImage  wrapperClassName="lazy-load-img-backdrop" width={"min-content"} height={200} className="img-backdrop" src={"https://image.tmdb.org/t/p/w500" + image.file_path} alt={props.title.title} placeholderSrc={placeholderImage} />
                )
            })}
            {(props.images.posters.length!== 0) && props.images.posters.map((image, index) => {
                if (index < 10) {
                    return(
                        <LazyLoadImage  wrapperClassName="lazy-load-img-backdrop" width={"min-content"} height={200} className="img-backdrop" src={"https://image.tmdb.org/t/p/w500" + image.file_path} alt={props.title.title} placeholderSrc={placeholderImage} />
                    )
                }
            })}
        </div>
    </div>
    ) 

}

export default MovieMedia