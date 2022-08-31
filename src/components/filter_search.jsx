import { useEffect, useState } from "react"
import { search_movies } from "../tmdb-api/api_methods"
import { BiLeftArrowAlt, BiRightArrowAlt } from "react-icons/bi"
import { useParams, Link } from 'react-router-dom';
import Loader from "../assets/loading.gif"

export default function Genres() {
    
    const {search} = useParams();
    const [results, set_results] = useState(false)
    const [movies, set_movies] = useState([{}])
    const [page, set_page] = useState(1)
    const [total_pages, set_total_pages] = useState(null)
    const [loading, set_loading] = useState(true)

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
        search_movies(page, "&query=" + search).then(res => {
            if (res.total_pages) {
                set_total_pages(res.total_pages)
                set_movies(res.results)
                set_results(true)
                if (loading) {
                    setTimeout(()=> {
                        set_loading(false)
                    }, 3000)
                }
            } else {
                set_results(false)
                setTimeout(()=> {
                    set_loading(false)
                }, 3000)
            }
        })
        if (results && total_pages != 1) {
            if (page <= 1) {
                arrow1.classList.add("invalid")
                set_page(1)
            } else {
                arrow1.classList.remove("invalid")
            }
            if (page >= total_pages) {
                arrow2.classList.add("invalid")
                set_page(total_pages)
            } else {
                arrow2.classList.remove("invalid")
            }
        }
    }, [page, search, loading])

    useEffect(()=> {
        set_page(1)
        window.scrollTo(0, 0)
    }, [search])

    if (loading) {
        return(
            <div style={{marginTop: "6rem"}} className="movies-main-container">
                <span style={{marginBottom: ".2rem", fontSize: "1.5rem"}} className="movies-title">Searching: {search}</span>
                <div className="movies-list-container">
                    {movies.map(movie => {
                        return(
                            <Link to={"/movie/" + movie.id} className="movie-container">
                                <img src={"https://image.tmdb.org/t/p/w500" + movie.poster_path} alt={movie.title} />
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
                <div className="loading">
                    <img src={Loader} alt="Loading..." />
                </div>
            </div>
        )
    } else if (results && !loading) {
        return(
            <div style={{marginTop: "6.5rem"}} className="movies-main-container">
                <span style={{marginBottom: "1rem", fontSize: "1.5rem"}} className="movies-title">Searching: {search}</span>
                <div className="movies-list-container">
                    {movies.map(movie => {
                        return(
                            <Link to={"/movie/" + movie.id} className="movie-container">
                                <img src={"https://image.tmdb.org/t/p/w500" + movie.poster_path} alt={movie.title} />
                                <span className="movie-title">{movie.title}</span>
                            </Link>
                        )
                    })}
                </div>
                {(total_pages != 1) && 
                    <div className="pagination-container">
                        <BiLeftArrowAlt onClick={(ev) => control_page(ev, "prev")} className="arrow arrow1" />
                        <div className="pages">
                            <span className="page">{page}</span>
                            <span>of</span>
                            <span className="total">{see_pages()}</span>
                        </div>
                        <BiRightArrowAlt onClick={(ev) => control_page(ev, "next")} className="arrow arrow2" />
                    </div>
                }
            </div>
        )
    } else {
        return(
            <div style={{marginTop: "6rem"}} className="movies-main-container">
                <span style={{marginBottom: ".2rem", fontSize: "1.5rem"}} className="movies-title">No results</span>
            </div>
        )
    }
}