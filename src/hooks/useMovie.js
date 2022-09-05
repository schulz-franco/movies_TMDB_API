import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

import getMovie from "../services/getMovie"

const useMovie = ()=> {
    
    const {id} = useParams()
    const [movie, setMovie] = useState(null)
    const [credits, setCredits] = useState(null)
    const [images, setImages] = useState(null)
    const [recommendations, setRecommendations] = useState(null)
    const [error, setError] = useState(null)

    useEffect(()=> {
        getMovie(id, "").then(res=> {
            setMovie(res)
        }).catch(err => {
            setError(err)
        })
        getMovie(id, "/credits").then(res=> {
            setCredits(res)
        }).catch(err => {
            setError(err)
        })
        getMovie(id, "/images?include_image_language=en").then(res=> {
            setImages(res)
        }).catch(err => {
            setError(err)
        })
        getMovie(id, "/recommendations").then(res=> {
            setRecommendations(res)
        }).catch(err => {
            setError(err)
        })
    }, [id])

    return {
        movie,
        credits,
        images,
        recommendations,
        error
    }
}

export default useMovie