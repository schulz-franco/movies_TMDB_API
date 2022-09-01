import { useEffect, useState } from "react"
import { get_movies } from "../tmdb-api/api_methods"
import { BiLeftArrowAlt, BiRightArrowAlt } from "react-icons/bi"
import { Link } from "react-router-dom"
import Loader from "../assets/loading.gif"
import No_img from "../assets/no_image.jpg"

export default function Movies() {

    const [movies, set_movies] = useState([{}])
    const [category, set_category] = useState("latest")
    const [page, set_page] = useState(1)
    const [total_pages, set_total_pages] = useState(null)
    const [loading, set_loading] = useState(true)

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
        set_loading(true)
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
        if (category == "latest") {
            get_movies(page, "&primary_release_date.gte=2022-08-01&primary_release_date.lte=2022-08-28").then(res => {
                set_total_pages(res.total_pages)
                set_movies(res.results)
                if (page >= res.total_pages) {
                    arrow2.classList.add("invalid")
                    set_page(res.total_pages)
                } else {
                    arrow2.classList.remove("invalid")
                }
            })
        } else {
            get_movies(page, "&sort_by=popularity.desc").then(res => {
                set_total_pages(res.total_pages)
                set_movies(res.results)
                if (page >= res.total_pages) {
                    arrow2.classList.add("invalid")
                    set_page(res.total_pages)
                } else {
                    arrow2.classList.remove("invalid")
                }
            })
        }
        if (page <= 1) {
            arrow1.classList.add("invalid")
            set_page(1)
        } else {
            arrow1.classList.remove("invalid")
        }
        if (loading) {
            setTimeout(()=> {
                set_loading(false)
            }, 3000)
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
                        <Link to={"/movie/" + movie.id} className="movie-container">
                            {movie.poster_path ? <img src={"https://image.tmdb.org/t/p/w500" + movie.poster_path} alt={movie.title} /> : <img src={No_img} alt={movie.title} />}
                            <span className="movie-title">{movie.title}</span>
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
            {loading &&
                <div className="loading">
                    <img src={Loader} alt="Loading..." />
                </div>
            }
        </div>
    )
}