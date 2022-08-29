import { useEffect, useState } from "react"
import { get_movies } from "../tmdb-api/api_methods"
import { BiLeftArrowAlt, BiRightArrowAlt } from "react-icons/bi"
import { useParams } from 'react-router-dom';

export default function Genres() {

    let first_state = {
        id: "",
        poster_path: "",
        release_date: "",
        title: ""
    }
    
    const {id, genre_name} = useParams();
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
        get_movies(page, "&with_genres=" + id).then(res => {
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
    }, [page, id])

    useEffect(()=> {
        set_page(1)
    }, [id])

    return(
        <div className="movies-main-container">
            <span style={{marginBottom: ".8rem"}} className="movies-title">{genre_name}</span>
            <div className="movies-list-container">
                {movies.map(movie => {
                    return(
                        <div className="movie-container">
                            <img src={"https://image.tmdb.org/t/p/w500" + movie.poster_path} alt={movie.title} />
                            <span className="movie-title">{movie.title}</span>
                            <span className="movie-year">{movie.release_date.slice(0, 4)}</span>
                        </div>
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