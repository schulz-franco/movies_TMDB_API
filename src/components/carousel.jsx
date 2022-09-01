import { useEffect, useRef, useState } from "react"
import { CSSTransition } from "react-transition-group"
import { get_news } from "../tmdb-api/api_methods"
import Movie_carousel from "./movie_carousel"

const carousel_move = (current_item, set_current_item)=> {
    if (current_item == 4) {
        set_current_item(0)
    } else {
        set_current_item(current_item + 1)
    }
}

const carousel_change_indicators = (carousel_indicators, current_item)=> {
    carousel_indicators.current.childNodes.forEach(node => {
        node.classList.remove("current")
    })
    if (current_item != 4) {
        carousel_indicators.current.childNodes[current_item + 1].classList.add("current")
    } else {
        carousel_indicators.current.childNodes[0].classList.add("current")
    }
}

export default function Carousel() {
    
    const [movies_news, set_movies_news] = useState(null)
    const [current_item, set_current_item] = useState(0)
    const carousel_indicators = useRef(null)

    useEffect(()=> {
        get_news(5).then(res => {
            set_movies_news(res)
        })
    }, [])

    useEffect(()=> {
        setTimeout(()=> {
            carousel_move(current_item, set_current_item)
            carousel_change_indicators(carousel_indicators, current_item)
        }, 5000)
    }, [current_item])

    if (movies_news) {
        return(
            <>
                <div className="carousel-items-container">
                    {movies_news.map((movie, index) => {
                        return(
                            <CSSTransition in={(current_item == index)} timeout={300} classNames={'carousel-anim'} unmountOnExit>
                                <Movie_carousel
                                    id={movie.id}
                                    backdrop_url={movie.poster_path}
                                    title={movie.title}
                                    vote={movie.vote_average}
                                    year={movie.release_date.slice(0, 4)}
                                    overview={movie.overview}
                                />
                            </CSSTransition>
                        )
                    })}
                </div>
                <div className="carousel-control" ref={carousel_indicators}>
                    <button className="control-button current"></button>
                    <button className="control-button"></button>
                    <button className="control-button"></button>
                    <button className="control-button"></button>
                    <button className="control-button"></button>
                </div>
            </>
        )
    }
}