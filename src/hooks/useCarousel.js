import { useEffect, useRef, useState } from "react"

import getNews from "../services/getNews"

import carouselMove from "../utilities/carouselMove"
import carouselChangeIndicators from "../utilities/carouselChangeIndicators"

const useCarousel = ()=> {
    const [moviesNews, setMoviesNews] = useState(null)
    const [currentItem, setCurrentItem] = useState(0)
    const carouselIndicators = useRef(null)
    
    useEffect(()=> {
        getNews(5).then(res => {
            setMoviesNews(res)
        })
    }, [])

    useEffect(()=> {
        let timer = setTimeout(()=> {
            carouselMove(currentItem, setCurrentItem)
            carouselChangeIndicators(carouselIndicators, currentItem)
        }, 5000)
        return () => clearTimeout(timer)
    }, [currentItem])

    return {
        moviesNews,
        currentItem,
        carouselIndicators
    }
}

export default useCarousel