import { LazyLoadImage } from "react-lazy-load-image-component"

import placeholderImage from "../../assets/placeholderImage.jpg"

const MovieMedia = (props)=> {
    if (props.images && (props.images.backdrops.length!== 0 || props.images.posters.length!== 0)) return(
        <div className="section-container">
        <span className="title">Media</span>
        <div className="items">
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