import { useEffect, useState } from "react"
import getMovies from "../services/getMovies"
import controlArrows from "../utilities/controlArrows"

const useMovies = ()=> {
    
    const [movies, setMovies] = useState(null)
    const [category, setCategory] = useState("latest")
    const [page, setPage] = useState(1)
    const [totalPages, setTotalPages] = useState(null)

    useEffect(()=> {
        let arrow1 = document.querySelector(".pagination-container .arrow1")
        let arrow2 = document.querySelector(".pagination-container .arrow2")
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
        controlArrows(arrow1, arrow2, page, setPage, totalPages)
    }, [page, category, totalPages])

    return {
        movies,
        setCategory,
        page,
        setPage,
        totalPages
    }
}

export default useMovies