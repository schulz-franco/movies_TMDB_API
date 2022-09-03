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

    useEffect(()=> {
        getMovie(id, "").then(res=> {
            setTitle(res.title)
            setImage([res.poster_path, res.backdrop_path])
        })
        getMovie(id, "/credits").then(res=> {
            setCast(res.cast)
            setCrew(orderJobs(res.crew))
        })
    }, [id])

    return {
        id,
        cast,
        title,
        image,
        crew
    }
}

export default useCrew