import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { BiLeftArrowAlt, BiRightArrowAlt } from "react-icons/bi"
import getMovies from "../services/getMovies"
import { control_page, see_pages, control_arrows } from "./functions";
import No_img from "../assets/no_image.jpg"

function change_category(ev, button, set_category, page, set_page) {
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

export default function Movies() {

    const [movies, set_movies] = useState(null)
    const [category, set_category] = useState("latest")
    const [page, set_page] = useState(1)
    const [total_pages, set_total_pages] = useState(null)

    useEffect(()=> {
        let arrow1 = document.querySelector(".pagination-container .arrow1")
        let arrow2 = document.querySelector(".pagination-container .arrow2")
        if (category == "latest") {
            getMovies(page, "&primary_release_date.gte=2022-08-01&primary_release_date.lte=2022-08-28").then(res => {
                set_total_pages(res.total_pages)
                set_movies(res.results)
            })
        } else {
            getMovies(page, "&sort_by=popularity.desc").then(res => {
                set_total_pages(res.total_pages)
                set_movies(res.results)
            })
        }
        control_arrows(arrow1, arrow2, page, set_page, total_pages)
    }, [page, category, total_pages])

    if (movies) {
        return(
            <div className="movies-main-container">
                <span className="movies-title">Online movies</span>
                <div className="category-container">
                    <span onClick={(ev)=> change_category(ev, "latest", set_category, page, set_page)} className="category category-current">Latest</span>
                    <span onClick={(ev)=> change_category(ev, "ranking", set_category, page, set_page)} className="category">Popular</span>
                </div>
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
                <div className="pagination-container">
                    <BiLeftArrowAlt onClick={(ev) => control_page(ev, "prev", set_page, page)} className="arrow arrow1" />
                    <div className="pages">
                        <span className="page">{page}</span>
                        <span>of</span>
                        <span className="total">{see_pages(total_pages)}</span>
                    </div>
                    <BiRightArrowAlt onClick={(ev) => control_page(ev, "next", set_page, page)} className="arrow arrow2" />
                </div>
            </div>
        )
    }
}