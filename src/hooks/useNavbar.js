import { useEffect, useRef, useState } from "react"

import getGenres from "../services/getGenres"

import navbarListenerScroll from "../utilities/navbarListenerScroll"

const useNavbar = ()=> {
    const [open, setOpen] = useState(false)
    const [genres, setGenres] = useState(null)
    const [search, setSearch] = useState("")
    const navbarRef = useRef(null)
    const inputRef = useRef(null)

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
        setSearch
    }
}

export default useNavbar