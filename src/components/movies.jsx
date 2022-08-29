import { useEffect, useState } from "react"
import { get_movies } from "../tmdb-api/api_methods"
import { BiLeftArrowAlt, BiRightArrowAlt } from "react-icons/bi"

export default function Movies() {

    let first_state = {
        id: "",
        poster_path: "",
        release_date: "",
        title: ""
    }

    const [movies, set_movies] = useState([first_state])
    const [category, set_category] = useState("latest")
    const [page, set_page] = useState(1)
    const [total_pages, set_total_pages] = useState(null)

    function change_category(ev, button) {
        if (button == "ranking") {
            set_category("ranking")
            ev.target.previousSibling.classList.remove("category-current")
        } else {
            set_category("latest")
            ev.target.nextSibling.classList.remove("category-current")
        }
        ev.target.classList.add("category-current")
        if (page > 1) {
            set_page(1)
        }
    }

    function control_page(ev, option) {
        if (option == "next") {
            return set_page(page + 1)
        }
        return set_page(page - 1)
    }

    function see_pages() {
        if (total_pages > 999) {
            return "..."
        } else {
            return total_pages
        }
    }

    useEffect(()=> {
        if (category == "latest") {
            get_movies(page, "&primary_release_date.gte=2022-08-01&primary_release_date.lte=2022-08-28").then(res => {
                set_total_pages(res.total_pages)
                set_movies(res.results)
            })
        } else {
            get_movies(page, "&sort_by=popularity.desc").then(res => {
                set_total_pages(res.total_pages)
                set_movies(res.results)
            })
        }
    }, [page, category])

    return(
        <div className="movies-main-container">
            <span className="movies-title">Online movies</span>
            <div className="category-container">
                <span onClick={(ev)=> change_category(ev, "latest")} className="category category-current">Latest</span>
                <span onClick={(ev)=> change_category(ev, "ranking")} className="category">Popular</span>
            </div>
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
                <BiLeftArrowAlt onClick={(ev) => control_page(ev, "prev")} className="arrow" />
                <div className="pages">
                    <span className="page">{page}</span>
                    <span>of</span>
                    <span className="total">{see_pages()}</span>
                </div>
                <BiRightArrowAlt onClick={(ev) => control_page(ev, "next")} className="arrow" />
            </div>
        </div>
    )
}