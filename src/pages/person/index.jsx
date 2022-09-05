import PersonInfo from "../../components/person/personInfo"
import usePerson from "../../hooks/usePerson"
import ErrorMessage from "../../components/errorMessage"
import latestBackdrop from "../../utilities/latestBackdrop"

const Person = ()=> {

    const { personData, personCast, error } = usePerson()

    if (error) return <ErrorMessage code={error["code"]} message={error["message"]} />

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