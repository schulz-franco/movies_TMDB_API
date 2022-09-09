import { CSSTransition } from "react-transition-group"

import useCarousel from "../hooks/useCarousel"

import CarouselContent from "./carouselContent"

const Carousel = ()=> {

    const { moviesNews, currentItem, carouselIndicators } = useCarousel()

    if (moviesNews) {
        return(
            <>
                <div className="carousel-items-container">
                    {moviesNews.map((movie, index) => {
                        return(
                            <CSSTransition key={movie.id} in={(currentItem === index)} timeout={300} classNames={'carousel-anim'} unmountOnExit>
                                <CarouselContent
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
                <div className="carousel-control" ref={carouselIndicators}>
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

export default Carousel