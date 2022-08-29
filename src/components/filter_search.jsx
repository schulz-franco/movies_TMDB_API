import { useEffect, useState } from "react"
import { search_movies } from "../tmdb-api/api_methods"
import { BiLeftArrowAlt, BiRightArrowAlt } from "react-icons/bi"
import { useParams, Link } from 'react-router-dom';

export default function Genres() {

    let first_state = {
        id: "",
        poster_path: "",
        release_date: "",
        title: ""
    }
    
    const {search} = useParams();
    const [movies, set_movies] = useState([first_state])
    const [page, set_page] = useState(1)
    const [total_pages, set_total_pages] = useState(null)

    function control_page(ev, option) {
        if (option == "next") {
            return set_page(page + 1)
        } else return set_page(page - 1)
    }

    function see_pages() {
        if (total_pages > 999) {
            return "..."
        } else {
            return total_pages
        }
    }

    useEffect(()=> {
        let arrow1 = document.querySelector(".pagination-container .arrow1")
        let arrow2 = document.querySelector(".pagination-container .arrow2")
        search_movies(page, "&query=" + search).then(res => {
            if (!res.results) {
                return set_movies([])
            }
            set_total_pages(res.total_pages)
            set_movies(res.results)
            if (page >= res.total_pages) {
                arrow2.classList.add("invalid")
                set_page(res.total_pages)
            } else {
                arrow2.classList.remove("invalid")
            }
        })
        if (page <= 1) {
            arrow1.classList.add("invalid")
            set_page(1)
        } else {
            arrow1.classList.remove("invalid")
        }
        window.scrollTo(0, 0)
    }, [page, search])

    useEffect(()=> {
        set_page(1)
    }, [search])

    return(
        <div style={{marginTop: "6rem"}} className="movies-main-container">
            <span style={{marginBottom: ".2rem", fontSize: "1.5rem"}} className="movies-title">Searching: {search}</span>
            <div className="movies-list-container">
                {movies.map(movie => {
                    return(
                        <Link to={"/movie/" + movie.id} className="movie-container">
                            <img src={"https://image.tmdb.org/t/p/w500" + movie.poster_path} alt={movie.title} />
                            <span className="movie-title">{movie.title}</span>
                            <span className="movie-year">{movie.release_date.slice(0, 4)}</span>
                        </Link>
                    )
                })}
            </div>
            <div className="pagination-container">
                <BiLeftArrowAlt onClick={(ev) => control_page(ev, "prev")} className="arrow arrow1" />
                <div className="pages">
                    <span className="page">{page}</span>
                    <span>of</span>
                    <span className="total">{see_pages()}</span>
                </div>
                <BiRightArrowAlt onClick={(ev) => control_page(ev, "next")} className="arrow arrow2" />
            </div>
        </div>
    )
}