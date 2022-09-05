import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

import getMovie from "../services/getMovie"

import orderJobs from "../utilities/orderJobs"

const useCrew = ()=> {
    const { id } = useParams()
    const [cast, setCast] = useState(null)
    const [title, setTitle] = useState(null)
    const [image, setImage] = useState(null)
    const [crew, setCrew] = useState(null)
    const [error, setError] = useState(null)

    useEffect(()=> {
        getMovie(id, "").then(res=> {
            setTitle(res.title)
            setImage([res.poster_path, res.backdrop_path])
        }).catch(err => {
            setError(err)
        })
        getMovie(id, "/credits").then(res=> {
            setCast(res.cast)
            setCrew(orderJobs(res.crew))
        }).catch(err => {
            setError(err)
        })
    }, [id])

    return {
        id,
        cast,
        title,
        image,
        crew,
        error
    }
}

export default useCrew