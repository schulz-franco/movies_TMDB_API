import { useEffect, useState } from "react"
import { useParams, Link } from 'react-router-dom';
import { BiLeftArrowAlt, BiRightArrowAlt } from "react-icons/bi"
import { get_movies } from "../tmdb-api/api_methods"
import { control_page, see_pages, control_arrows } from "./functions";
import No_img from "../assets/no_image.jpg"

export default function Genres() {
    
    const {id, genre_name} = useParams();
    const [movies, set_movies] = useState(null)
    const [page, set_page] = useState(1)
    const [total_pages, set_total_pages] = useState(null)

    useEffect(()=> {
        let arrow1 = document.querySelector(".pagination-container .arrow1")
        let arrow2 = document.querySelector(".pagination-container .arrow2")
        get_movies(page, "&with_genres=" + id).then(res => {
            set_total_pages(res.total_pages)
            set_movies(res.results)
        })
        control_arrows(arrow1, arrow2, page, set_page, total_pages)
    }, [page, id, total_pages])

    useEffect(()=> {
        set_page(1)
        window.scrollTo(0, 0)
    }, [id])

    if (movies) {
        return(
            <div className="movies-main-container">
                <span style={{marginBottom: ".8rem"}} className="movies-title">{genre_name}</span>
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