import { useEffect, useState } from "react"
import { useParams } from 'react-router-dom';
import getMovies from "../services/getMovies"
import controlArrows from "../utilities/controlArrows"

const useGenres = ()=> {
    const {id, genreName} = useParams();
    const [movies, setMovies] = useState(null)
    const [page, setPage] = useState(1)
    const [totalPages, setTotalPages] = useState(null)

    useEffect(()=> {
        let arrow1 = document.querySelector(".pagination-container .arrow1")
        let arrow2 = document.querySelector(".pagination-container .arrow2")
        getMovies(page, "&with_genres=" + id).then(res => {
            setTotalPages(res.total_pages)
            setMovies(res.results)
        })
        controlArrows(arrow1, arrow2, page, setPage, totalPages)
    }, [page, id, totalPages])

    useEffect(()=> {
        setPage(1)
        window.scrollTo(0, 0)
    }, [id])

    return {
        movies,
        genreName,
        page,
        totalPages,
        setPage
    }
}

export default useGenres