import { useEffect, useRef, useState } from "react"
import { useMediaQuery } from "react-responsive"

import getGenres from "../services/getGenres"

import navbarListenerScroll from "../utilities/navbarListenerScroll"

const useNavbar = ()=> {
    const [open, setOpen] = useState(false)
    const [genres, setGenres] = useState(null)
    const [search, setSearch] = useState("")
    const navbarRef = useRef(null)
    const inputRef = useRef(null)
    const isDesktop = useMediaQuery({
        query: '(min-width: 1024px)'
    })

    useEffect(()=> {
        getGenres().then(res => {
            setGenres(res)
        })
        navbarListenerScroll(navbarRef)
    }, [])

    return {
        open,
        setOpen,
        genres,
        navbarRef,
        inputRef,
        search,
        setSearch,
        isDesktop
    }
}

export default useNavbar