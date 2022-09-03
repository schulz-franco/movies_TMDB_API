const MovieMoreInfo = (props)=> {
    if (props.movie) return(
        <div className="more-info">
            <span className="data">Original title</span>
            <span className="valor">{props.movie.original_title}</span>
            <span className="data">Budget</span>
            <span className="valor">{(props.movie.budget != 0) ? ("$" + props.movie.budget) : "-"}</span>
            <span className="data">Revenue</span>
            <span className="valor">{(props.movie.revenue != 0) ? ("$" + props.movie.revenue) : "-"}</span>
        </div>
    )
}

export default MovieMoreInfo