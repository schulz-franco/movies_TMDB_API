import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

import getPerson from "../services/getPerson"
import getPersonCast from "../services/getPersonCast"

const usePerson = ()=> {
    const { id } = useParams()
    const [personData, setPersonData] = useState(null)
    const [personCast, setPersonCast] = useState(null)
    const [error, setError] = useState(null)

    useEffect(()=> {
        getPerson(id).then(res=> {
            setPersonData(res)
        }).catch(err => {
            setError(err)
        })
        getPersonCast(id).then(res=> {
            setPersonCast(res)
        }).catch(err => {
            setError(err)
        })
        window.scrollTo(0, 0)
    }, [id])

    return {
        personData,
        personCast,
        error
    }
}

export default usePerson