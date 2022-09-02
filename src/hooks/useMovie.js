import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import getMovie from "../services/getMovie"

const useMovie = ()=> {
    
    const {id} = useParams()
    const [movie, setMovie] = useState(null)
    const [credits, setCredits] = useState(null)
    const [images, setImages] = useState(null)
    const [recommendations, setRecommendations] = useState(null)

    useEffect(()=> {
        getMovie(id, "").then(res=> {
            setMovie(res)
        })
        getMovie(id, "/credits").then(res=> {
            setCredits(res)
        })
        getMovie(id, "/images?include_image_language=en").then(res=> {
            setImages(res)
        })
        getMovie(id, "/recommendations").then(res=> {
            setRecommendations(res)
        })
    }, [id])

    return {
        movie,
        credits,
        images,
        recommendations
    }
}

export default useMovie