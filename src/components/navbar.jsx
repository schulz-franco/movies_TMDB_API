import { useEffect, useRef, useState } from "react"
import { Link } from "react-router-dom"
import { CSSTransition } from "react-transition-group"
import { IoIosArrowDown, IoMdClose, IoMdMenu, IoMdSearch } from "react-icons/io"
import getGenres from "../services/getGenres"
import logo from "../assets/logo.png"

const open_button = (open, set_open, control_navbar)=> {
    if (open) {
        return <IoMdClose onClick={()=> control_navbar(open, set_open)} className="menu-icon"/>
    } else {
        return <IoMdMenu onClick={()=> control_navbar(open, set_open)} className="menu-icon"/>
    }
}

const control_navbar = (open, set_open)=> {
    if (open) {
        set_open(false)
    } else {
        set_open(true)
    }
}

const search = ()=> {
    window.location.href = "/movies/search/" + document.querySelector(".navbar-menu-container .search-bar .search-input").value
}

export default function Navbar() {

    const [open, set_open] = useState(false)
    const [genres, set_genres] = useState(null)
    const navbar_ref = useRef(null)

    window.addEventListener("scroll", (e)=> {
        try {
            if (window.scrollY > 10) {
                navbar_ref.current.style.backgroundColor = "#080f28"
            } else if (window.scrollY < 50) {
                navbar_ref.current.style.backgroundColor = ""
            }
        } catch {
        }
    }, false)

    useEffect(()=> {
        getGenres().then(res => {
            set_genres(res)
        })
    }, [])

    return(
        <div className="navbar-container" ref={navbar_ref}>
            <img className="logo" src={logo} alt="Movies" />
            <span className="logo-title">MDB</span>
            <span/>
            {open_button(open, set_open, control_navbar)}
            <div className="circle"/>
            <CSSTransition in={open} timeout={200} classNames={'black-background-anim'} unmountOnExit>
                <div onClick={()=> control_navbar(open, set_open)} className="black-background"></div>
            </CSSTransition>
            <CSSTransition in={open} timeout={200} classNames={'navbar-menu-anim'}>
                <div className="background-title"></div>
            </CSSTransition>
            <CSSTransition in={open} timeout={200} classNames={'navbar-menu-anim'} unmountOnExit>
                <div className="navbar-menu-container">
                    <div className="search-bar">
                        <input className="search-input" type="text" placeholder="Search movies..."/>
                        <IoMdSearch onClick={search} className="search-icon"/>
                    </div>
                    <Link onClick={()=> {
                        control_navbar(open, set_open)
                        window.scrollTo(0 ,0)
                    }} className="navbar-link" to="/">Home</Link>
                    <div className="navbar-genres-title-container">
                        <span className="navbar-genres-title">Genres</span>
                        <IoIosArrowDown className="navbar-arrow"/>
                    </div>
                    <div className="navbar-genres-container">
                        {genres && genres.map(genre => {
                            return(
                                <Link onClick={()=> control_navbar(open, set_open)} className="genre-link" to={"/movies/genres/" + genre.id + "/" + genre.name}>{genre.name}</Link>
                            )
                        })}
                    </div>
                </div>
            </CSSTransition>
        </div>
    )
}