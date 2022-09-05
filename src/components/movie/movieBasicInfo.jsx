const MovieBasicInfo = (props)=> {
    if (props.movie) return(
        <div className="basic-info">
            <div className="dates">
                <span>{(props.movie.release_date!== "") ? props.movie.release_date.slice(0, 10) : "Without date"}</span>
                <span className="language">({props.movie.original_language.toUpperCase()})</span>
                <span>‣ {(props.movie.runtime!== 0) ? (Math.trunc(props.movie.runtime/60) + "h " + props.movie.runtime%60 + "m") : "Without duration"}</span>
            </div>
            <span>{(props.movie.genres.length!== 0) && props.movie.genres.map((genre, index)=> {
                if (index < 4) {
                    if (index!== (props.movie.genres.length - 1) && index < 3) {
                        return genre.name + ", "
                    }
                    return genre.name
                }
            })}</span>
        </div>
    )
}

export default MovieBasicInfo