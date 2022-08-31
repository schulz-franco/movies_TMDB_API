import { useEffect, useRef, useState } from "react"
import { CSSTransition } from "react-transition-group"
import { get_genres } from "../tmdb-api/api_methods"
import { Link } from "react-router-dom"

import logo from "../assets/logo.png"
import { IoIosArrowDown, IoMdClose, IoMdMenu, IoMdSearch } from "react-icons/io"

export default function Navbar() {

    const [open, set_open] = useState(false)
    const [genres, set_genres] = useState([])
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
        get_genres().then(res => {
            set_genres(res)
        })
    }, [])

    function control_navbar() {
        if (open) {
            set_open(false)
        } else {
            set_open(true)
        }
    }

    function open_button() {
        if (open) {
            return <IoMdClose onClick={control_navbar} className="menu-icon"/>
        } else {
            return <IoMdMenu onClick={control_navbar} className="menu-icon"/>
        }
    }

    function search() {
        window.location.href = "/movies/search/" + document.querySelector(".navbar-menu-container .search-bar .search-input").value
    }

    return(
        <div className="navbar-container" ref={navbar_ref}>
            <img className="logo" src={logo} alt="Movies" />
            <span className="logo-title">MDB</span>
            <span/>
            {open_button()}
            <div className="circle"/>
            <CSSTransition in={open} timeout={200} classNames={'black-background-anim'} unmountOnExit>
                <div onClick={control_navbar} className="black-background"></div>
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
                        control_navbar()
                        window.scrollTo(0 ,0)
                    }} className="navbar-link" to="/">Home</Link>
                    <div className="navbar-genres-title-container">
                        <span className="navbar-genres-title">Genres</span>
                        <IoIosArrowDown className="navbar-arrow"/>
                    </div>
                    <div className="navbar-genres-container">
                        {genres.map(genre => {
                            return(
                                <Link onClick={control_navbar} className="genre-link" to={"/movies/genres/" + genre.id + "/" + genre.name}>{genre.name}</Link>
                            )
                        })}
                    </div>
                </div>
            </CSSTransition>
        </div>
    )
}