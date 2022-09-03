import { Link } from "react-router-dom"
import { BiLeftArrowAlt, BiRightArrowAlt } from "react-icons/bi"
import { LazyLoadImage } from "react-lazy-load-image-component"
import useMovieList from "../hooks/useMovieList"
import controlPage from "../utilities/controlPage"
import seePages from "../utilities/seePages"
import changeCategory from "../utilities/changeCategory"
import noImage from "../assets/noImage.jpg"
import placeholderImage from "../assets/placeholderImage.jpg"

const MovieListReusable = (props)=> {

    const { movies, page, setPage, totalPages, setCategory, genreName, search, waiting } = useMovieList(props.section)

    if (movies) {
        return(
            <div className={(props.section == "search") ? "movies-main-container movies-main-container-search" : "movies-main-container"}>
                {(props.section == "search") && 
                    <span className="movies-title movies-search-title">Searching: {search}</span>
                }
                {(props.section == "genres") && 
                    <span className="movies-title movies-genres-title">{genreName}</span>
                }
                {(props.section == "home") && 
                    <>
                        <span className="movies-title">Online movies</span>
                        <div className="category-container">
                            <span onClick={(ev)=> changeCategory(ev, "latest", setCategory, page, setPage)} className="category category-current">Latest</span>
                            <span onClick={(ev)=> changeCategory(ev, "ranking", setCategory, page, setPage)} className="category">Popular</span>
                        </div>
                    </>
                }
                <div className="movies-list-container">
                    {movies && movies.map(movie => {
                        return(
                            <Link to={"/movie/" + movie.id} className="movie-container">
                                {movie.poster_path ? <LazyLoadImage wrapperClassName="lazy-load-image-movie" width={"100%"} height={240} src={"https://image.tmdb.org/t/p/w500" + movie.poster_path} alt={movie.title} placeholderSrc={placeholderImage} /> : <img className="lazy-load-image-movie" width={150} height={240} src={noImage} alt={movie.title} />}
                                <span className="movie-title">{movie.title}</span>
                            </Link>
                        )
                    })}
                </div>
                {(totalPages > 1) && 
                    <div className="pagination-container">
                        <BiLeftArrowAlt onClick={(ev) => controlPage(ev, "prev", setPage, page)} className="arrow arrow1" />
                        <div className="pages">
                            <span className="page">{page}</span>
                            <span>of</span>
                            <span className="total">{seePages(totalPages)}</span>
                        </div>
                        <BiRightArrowAlt onClick={(ev) => controlPage(ev, "next", setPage, page)} className="arrow arrow2" />
                    </div>
                }
            </div>
        )
    } else if (!waiting) {
        return(
            <div className="movies-main-container movies-main-container-search">
                <span className="movies-title movies-search-title">Without results</span>
            </div>
        )
    }
}

export default MovieListReusable