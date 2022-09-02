import { useEffect, useState } from "react"
import { useParams } from 'react-router-dom';
import searchMovies from "../services/searchMovies"
import controlArrows from "../utilities/controlArrows"

const useSearch = ()=> {
    const {search} = useParams();
    const [movies, setMovies] = useState(null)
    const [page, setPage] = useState(1)
    const [totalPages, setTotalPages] = useState(null)
    const [waiting, setWaiting] = useState(true)

    useEffect(()=> {
        let arrow1 = document.querySelector(".pagination-container .arrow1")
        let arrow2 = document.querySelector(".pagination-container .arrow2")
        searchMovies(page, search).then(res => {
            if (res.total_pages) {
                setTotalPages(res.total_pages)
                setMovies(res.results)
                setWaiting(false)
            } else {
                setWaiting(false)
            }
        })
        if (totalPages != 1) {
            controlArrows(arrow1, arrow2, page, setPage, totalPages)
        }
    }, [page, search, totalPages])

    useEffect(()=> {
        setPage(1)
        window.scrollTo(0, 0)
    }, [search])

    return {
        movies,
        search,
        totalPages,
        page,
        setPage,
        waiting
    }
}

export default useSearch