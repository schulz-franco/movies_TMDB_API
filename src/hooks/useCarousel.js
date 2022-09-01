import { useEffect, useRef, useState } from "react"
import getNews from "../services/getNews"

const carouselMove = (currentItem, setCurrentItem)=> {
    if (currentItem == 4) {
        setCurrentItem(0)
    } else {
        setCurrentItem(currentItem + 1)
    }
}

const carouselChangeIndicators = (carouselIndicators, currentItem)=> {
    carouselIndicators.current.childNodes.forEach(node => {
        node.classList.remove("current")
    })
    if (currentItem != 4) {
        carouselIndicators.current.childNodes[currentItem + 1].classList.add("current")
    } else {
        carouselIndicators.current.childNodes[0].classList.add("current")
    }
}

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
        setTimeout(()=> {
            carouselMove(currentItem, setCurrentItem)
            carouselChangeIndicators(carouselIndicators, currentItem)
        }, 5000)
    }, [currentItem])

    return {
        moviesNews,
        currentItem,
        carouselIndicators
    }
}

export default useCarousel