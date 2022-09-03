import { Link } from "react-router-dom"
import { LazyLoadImage } from "react-lazy-load-image-component"
import placeholderImage from "../../assets/placeholderImage.jpg"
import noImage from "../../assets/noImage.jpg"

const MovieCast = (props)=> {
    if (props.credits && props.credits.cast.length != 0) return(
        <div className="section-container">
            <span className="title">Top Billed Cast</span>
            <div style={{borderBottom: "1px solid rgb(221, 221, 221)"}} className="items">
                {props.credits.cast.map((person, index) => {
                    if (index < 9) {
                        return(
                            <div className="item">
                                {(person.profile_path) ? <LazyLoadImage wrapperClassName="img-person" width={"100%"} height={140} className="img-person" src={"https://image.tmdb.org/t/p/w500" + person.profile_path} alt={person.original_name} placeholderSrc={placeholderImage} /> : <img width={100} height={140} className="img-person" src={noImage} alt="Without image" />}
                                <Link className="name" to={"/person/" + person.id}>{person.name}</Link>
                                <span className="job">{person.character}</span>
                            </div>
                        )
                    }
                })}
            </div>
            <Link className="full-crew" to={"/crew/" + props.id} >Full Cast & Crew</Link>
        </div>
    ) 
}

export default MovieCast