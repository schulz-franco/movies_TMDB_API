import { useEffect, useState } from "react"
import { get_movies } from "../tmdb-api/api_methods"

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

    function change_category(ev, button) {
        if (button == "ranking") {
            set_category("ranking")
            ev.target.previousSibling.classList.remove("category-current")
        } else {
            set_category("latest")
            ev.target.nextSibling.classList.remove("category-current")
        }
        ev.target.classList.add("category-current")
    }

    useEffect(()=> {
        if (category == "latest") {
            get_movies(1, "&primary_release_date.gte=2022-08-01&primary_release_date.lte=2022-08-28").then(res => {
                console.log(res)
                set_movies(res)
            })
        } else {
            get_movies(1, "&sort_by=popularity.desc").then(res => {
                set_movies(res)
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
            <button className="more-movies">Load more movies</button>
        </div>
    )
}