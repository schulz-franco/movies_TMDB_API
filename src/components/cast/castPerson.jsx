import { LazyLoadImage } from "react-lazy-load-image-component"
import { Link } from "react-router-dom"
import placeholderImage from "../../assets/placeholderImage.jpg"
import noImage from "../../assets/noImage.jpg"

const CastPerson = (props)=> {
    return(
        <div className="personItem">
            {props.image ? <LazyLoadImage  src={"https://image.tmdb.org/t/p/w300" + props.image} placeholderSrc={placeholderImage} width={70} height={80} wrapperClassName="lazy-load-img" /> : <img src={noImage} width={70} height={80} />}
            <div className="info">
                <Link to={"/person/" + props.id}>{props.name}</Link>
                {props.character && <span>{props.character}</span>}
                {props.jobs && <span>{props.jobs.map((job, index) => {
                    if (index == (props.jobs.length - 1)) {
                        return job
                    }
                    return job + ", "
                })}</span>}
            </div>
        </div>
    )
}

export default CastPerson