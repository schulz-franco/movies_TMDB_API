const PersonDate = (props) => {
    return(
        <div className="person-date-valor">
            <span className="date">{props.date}</span>
            <span className="valor">{props.valor ? props.valor : "-"}</span>
        </div>
    )
}

export default PersonDate