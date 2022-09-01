import { Link } from "react-router-dom"
import { BiLeftArrowAlt, BiRightArrowAlt } from "react-icons/bi"
import { controlPage, seePages } from "./functions";
import useMovies from "../hooks/useMovies";
import No_img from "../assets/no_image.jpg"

function change_category(ev, button, setCategory, page, setPage) {
    if (button == "ranking") {
        setCategory("ranking")
        ev.target.previousSibling.classList.remove("category-current")
    } else {
        setCategory("latest")
        ev.target.nextSibling.classList.remove("category-current")
    }
    ev.target.classList.add("category-current")
    if (page > 1) {
        setPage(1)
    }
}

export default function Movies() {

    const { movies, setCategory, page, setPage, totalPages } = useMovies()

    if (movies) {
        return(
            <div className="movies-main-container">
                <span className="movies-title">Online movies</span>
                <div className="category-container">
                    <span onClick={(ev)=> change_category(ev, "latest", setCategory, page, setPage)} className="category category-current">Latest</span>
                    <span onClick={(ev)=> change_category(ev, "ranking", setCategory, page, setPage)} className="category">Popular</span>
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
                    <BiLeftArrowAlt onClick={(ev) => controlPage(ev, "prev", setPage, page)} className="arrow arrow1" />
                    <div className="pages">
                        <span className="page">{page}</span>
                        <span>of</span>
                        <span className="total">{seePages(totalPages)}</span>
                    </div>
                    <BiRightArrowAlt onClick={(ev) => controlPage(ev, "next", setPage, page)} className="arrow arrow2" />
                </div>
            </div>
        )
    }
}