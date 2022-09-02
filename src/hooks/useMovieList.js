import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import getMovies from "../services/getMovies"
import searchMovies from "../services/searchMovies"
import controlArrows from "../utilities/controlArrows"

const useMovieList = (section)=> {

    const {id, genreName, search} = useParams();
    const [movies, setMovies] = useState(null)
    const [page, setPage] = useState(1)
    const [totalPages, setTotalPages] = useState(null)
    const [category, setCategory] = useState("latest")
    const [waiting, setWaiting] = useState(true)

    useEffect(()=> {
        let arrow1 = document.querySelector(".pagination-container .arrow1")
        let arrow2 = document.querySelector(".pagination-container .arrow2")
        if (section == "home") {
            if (category == "latest") {
                getMovies(page, "&primary_release_date.gte=2022-08-01&primary_release_date.lte=2022-08-28").then(res => {
                    setTotalPages(res.total_pages)
                    setMovies(res.results)
                })
            } else {
                getMovies(page, "&sort_by=popularity.desc").then(res => {
                    setTotalPages(res.total_pages)
                    setMovies(res.results)
                })
            }
        } else if (section == "genres") {
            getMovies(page, "&with_genres=" + id).then(res => {
                setTotalPages(res.total_pages)
                setMovies(res.results)
            })
        } else if (section == "search") {
            searchMovies(page, search).then(res => {
                if (res.total_pages) {
                    setTotalPages(res.total_pages)
                    setMovies(res.results)
                    setWaiting(false)
                } else {
                    setWaiting(false)
                }
            })
        }
        controlArrows(arrow1, arrow2, page, setPage, totalPages)
    }, [page, totalPages, category, id, search])

    useEffect(()=> {
        if (id || search) {
            setPage(1)
            window.scrollTo(0, 0)
        }
    }, [id, search])

    return {
        movies,
        page,
        setPage,
        totalPages,
        setCategory,
        genreName,
        search,
        waiting
    }
}

export default useMovieList