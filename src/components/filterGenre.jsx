import { Link } from 'react-router-dom';
import { BiLeftArrowAlt, BiRightArrowAlt } from "react-icons/bi"
import useGenres from '../hooks/useGenres';
import controlPage from "../utilities/controlPage"
import seePages from "../utilities/seePages"
import No_img from "../assets/no_image.jpg"

export default function Genres() {

    const { movies, genreName, page, totalPages, setPage } = useGenres()

    if (movies) {
        return(
            <div className="movies-main-container">
                <span style={{marginBottom: ".8rem"}} className="movies-title">{genreName}</span>
                <div className="movies-list-container">
                    {movies.map(movie => {
                        return(
                            <Link to={"/movie/" + movie.id} className="movie-container">
                                {movie.poster_path ? <img width={"100%"} height={240} src={"https://image.tmdb.org/t/p/w500" + movie.poster_path} alt={movie.title} /> : <img width={"100%"} height={240} src={No_img} alt={movie.title} />}
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