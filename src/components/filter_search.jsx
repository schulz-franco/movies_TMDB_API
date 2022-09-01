import { useEffect, useState } from "react"
import { useParams, Link } from 'react-router-dom';
import { BiLeftArrowAlt, BiRightArrowAlt } from "react-icons/bi"
import { search_movies } from "../tmdb-api/api_methods"
import { control_page, see_pages, control_arrows } from "./functions";
import No_img from "../assets/no_image.jpg"

export default function Genres() {
    
    const {search} = useParams();
    const [movies, set_movies] = useState(null)
    const [page, set_page] = useState(1)
    const [total_pages, set_total_pages] = useState(null)
    const [waiting, set_waiting] = useState(true)

    useEffect(()=> {
        let arrow1 = document.querySelector(".pagination-container .arrow1")
        let arrow2 = document.querySelector(".pagination-container .arrow2")
        search_movies(page, search).then(res => {
            if (res.total_pages) {
                set_total_pages(res.total_pages)
                set_movies(res.results)
                set_waiting(false)
            } else {
                set_waiting(false)
            }
        })
        if (total_pages != 1) {
            control_arrows(arrow1, arrow2, page, set_page, total_pages)
        }
    }, [page, search, total_pages])

    useEffect(()=> {
        set_page(1)
        window.scrollTo(0, 0)
    }, [search])

    if (movies) {
        return(
            <div style={{marginTop: "6.5rem"}} className="movies-main-container">
                <span style={{marginBottom: "1rem", fontSize: "1.5rem"}} className="movies-title">Searching: {search}</span>
                <div className="movies-list-container">
                    {movies.map(movie => {
                        return(
                            <Link to={"/movie/" + movie.id} className="movie-container">
                                {movie.poster_path ? <img src={"https://image.tmdb.org/t/p/w500" + movie.poster_path} alt={movie.title} /> : <img src={No_img} alt={movie.title} />}
                                <span className="movie-title">{movie.title}</span>
                            </Link>
                        )
                    })}
                </div>
                {(total_pages != 1) && 
                    <div className="pagination-container">
                        <BiLeftArrowAlt onClick={(ev) => control_page(ev, "prev", set_page, page)} className="arrow arrow1" />
                        <div className="pages">
                            <span className="page">{page}</span>
                            <span>of</span>
                            <span className="total">{see_pages(total_pages)}</span>
                        </div>
                        <BiRightArrowAlt onClick={(ev) => control_page(ev, "next", set_page, page)} className="arrow arrow2" />
                    </div>
                }
            </div>
        )
    } else if (!waiting) {
        return(
            <div style={{marginTop: "6rem"}} className="movies-main-container">
                <span style={{marginBottom: ".2rem", fontSize: "1.5rem"}} className="movies-title">No results</span>
            </div>
        )
    }
}