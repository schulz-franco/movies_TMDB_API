import { useEffect, useRef, useState } from "react"
import getGenres from "../services/getGenres"

const useNavbar = ()=> {
    const [open, setOpen] = useState(false)
    const [genres, setGenres] = useState(null)
    const navbarRef = useRef(null)

    window.addEventListener("scroll", (e)=> {
        try {
            if (window.scrollY > 10) {
                navbarRef.current.style.backgroundColor = "#080f28"
            } else if (window.scrollY < 50) {
                navbarRef.current.style.backgroundColor = ""
            }
        } catch {
        }
    }, false)

    useEffect(()=> {
        getGenres().then(res => {
            setGenres(res)
        })
    }, [])

    return {
        open,
        setOpen,
        genres,
        navbarRef
    }
}

export default useNavbar