import { useEffect, useRef, useState } from "react"
import { get_news } from "../tmdb-api/api_methods"
import { FaPlay } from "react-icons/fa"
import { CSSTransition } from "react-transition-group"

function Movie_carousel(props) {

    const images_url = "https://image.tmdb.org/t/p/original"
    let background_style = {
        backgroundImage: "url(" + images_url + props.backdrop_url + ")"
    }

    return(
        <div style={background_style} className="movie-carousel-container">
            <span className="movie-name">{props.title}</span>
            <div className="movie-info-container">
                <span className="movie-info-vote">{props.vote}/10</span>
                <span className="movie-info-date">{props.year}</span>
            </div>
            <p className="movie-overview">{props.overview}</p>
            <div className="movie-go-button">
                <FaPlay className="movie-go-button-icon" />
                <span>Watch movie</span>
            </div>
        </div>
    )
}

export default function Carousel() {

    let first_state = {
        poster_path: "",
        title: "",
        vote_average: "",
        release_date: "",
        overview: ""
    }
    
    const [movies_news, set_movies_news] = useState([first_state])
    const [current_item, set_current_item] = useState(0)
    const carousel_indicators = useRef(null)
    
    function carousel_move() {
        if (current_item == 4) {
            set_current_item(0)
        } else {
            set_current_item(current_item + 1)
        }
    }

    function carousel_change_indicators() {
        carousel_indicators.current.childNodes.forEach(node => {
            node.classList.remove("current")
        })
        if (current_item != 4) {
            carousel_indicators.current.childNodes[current_item + 1].classList.add("current")
        } else {
            carousel_indicators.current.childNodes[0].classList.add("current")
        }
    }

    useEffect(()=> {
        get_news(5).then(res => {
            set_movies_news(res)
        })
    }, [])

    useEffect(()=> {
        setTimeout(()=> {
            carousel_move()
            carousel_change_indicators()
        }, 5000)
    }, [current_item])

    return(
        <>
            <div className="carousel-items-container">
                {movies_news.map((movie, index) => {
                    return(
                        <CSSTransition in={(current_item == index)} timeout={400} classNames={'carousel-anim'} unmountOnExit>
                            <Movie_carousel
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