import PersonInfo from "../../components/person/personInfo"
import usePerson from "../../hooks/usePerson"

const latestBackdrop = (personCast)=> {
    let result = null
    personCast.cast.map(cast => {
        if (!result) {
            result = cast.backdrop_path ? cast.backdrop_path : null
        }
    })
    return result
}

const Person = ()=> {

    const { personData, personCast } = usePerson()

    if (personData && personCast) return(
        <PersonInfo
            cast={personCast.cast}
            backdrop={latestBackdrop(personCast)}
            image={personData.profile_path}
            name={personData.name} 
            department={personData.known_for_department}
            credits={personCast.cast.length}
            gender={personData.gender}
            birthday={personData.birthday}
            place={personData.place_of_birth}
            bio={personData.biography}
        />
    )
}

export default Person