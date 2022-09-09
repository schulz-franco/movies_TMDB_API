import CastPerson from "./castPerson"

const CastList = (props)=> {
    if (props.cast) {
        return(
            <div className="cast-list-container">
                <span className="title">Cast ({props.cast.length})</span>
                {props.cast.map(person => {
                    return(
                        <CastPerson key={person.id} image={person.profile_path} name={person.name} character={person.character} id={person.id}/>
                    )
                })}
            </div>
        )
    } else if (props.crew) {
        return(
            Object.keys(props.crew).map(key => {
                return(
                        <div key={key} className="cast-list-container">
                            <span className="title">{key} ({props.crew[key].length})</span>
                            {props.crew[key].map(person => {
                                return(
                                    <CastPerson key={person.id} image={person.image} name={person.name} jobs={person.job} id={person.id} />
                                )
                            })}
                        </div>
                    )
                })
        )
    }
}

export default CastList