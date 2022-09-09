const MovieTextContainer = (props)=> {
    if (props.movie && props.credits) return(
        <div className="texts-container">
            <span className="tagline">{(props.movie.tagline!== "") ? props.movie.tagline : "Without tagline"}</span>
            <span className="title">Overview</span>
            <span className="text">{props.movie.overview ? props.movie.overview : "Without overview"}</span>
            <div className="director-container">
                {props.credits && props.credits.crew.map(person => {
                    if (person.job === ("Director" || "Author")) {
                        return(
                            <div key={person.id} >
                                <span className="director">{person.original_name}</span>
                                <span className="job">{person.job}</span>
                            </div>
                        )
                    }
                })}
            </div>
        </div>
    )
}

export default MovieTextContainer