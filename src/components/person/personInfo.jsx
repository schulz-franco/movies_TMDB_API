import { LazyLoadImage } from "react-lazy-load-image-component"

import PersonDate from "./personDate"
import PersonMovies from "./personMovies"

import placeholderImage from "../../assets/placeholderImage.jpg"
import noImage from "../../assets/noImage.jpg"

const PersonInfo = (props)=> {
    return(
        <>
        <div style={{backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(https://image.tmdb.org/t/p/original" + props.backdrop + ")"}} className="person-container">
            {props.image ? <LazyLoadImage wrapperClassName="lazy-load-img"  src={"https://image.tmdb.org/t/p/original" + props.image} width={150} height={180} placeholderSrc={placeholderImage} /> : <img src={noImage} width={150} height={180} />}
            <span className="name">{props.name}</span>
        </div>
        <div className="personal-info">
            <span className="title">Personal info</span>
            <div className="known-container">
                <PersonDate date="Known for" valor={props.department} />
                <PersonDate date="Known credits" valor={props.credits} />
            </div>
            <PersonDate date="Gender" valor={(props.gender === 1) ? "Female" : "Male"} />
            <PersonDate date="Birthday" valor={props.birthday} />
            <PersonDate date="Place of birth" valor={props.place} />
        </div>
        <div className="bio-container">
            <span className="bio-title">Biography</span>
            <p className="biography">{props.bio ? props.bio : "We don't have biography for this person."}</p>
        </div>
        <PersonMovies cast={props.cast} />
        </>
    )
}

export default PersonInfo