import { Link, useNavigate } from "react-router-dom"
import { CSSTransition } from "react-transition-group"
import { IoIosArrowDown, IoMdClose, IoMdMenu, IoMdSearch } from "react-icons/io"

import useNavbar from "../hooks/useNavbar"

import navbarOpenButton from "../utilities/navbarOpenButton"
import controlNavbar from "../utilities/controlNavbar"

import logo from "../assets/logo.png"

const onSubmitHandler = (e, open, setOpen, search, navigate)=> {
    e.preventDefault()
    controlNavbar(open, setOpen)
    window.scrollTo(0 ,0)
    navigate(search ? ("/movies/search/" + search) : "/", {replace: true})
}


export default function Navbar() {
    
    const { open, setOpen, genres, navbarRef, inputRef, search, setSearch, isDesktop } = useNavbar()
    const navigate = useNavigate()

    if (!isDesktop) return(
        <div className="navbar-container" ref={navbarRef}>
            <img className="logo" src={logo} alt="Movies" />
            <span className="logo-title">MDB</span>
            <span/>
            {navbarOpenButton(open, setOpen, controlNavbar, IoMdClose, IoMdMenu)}
            <div className="circle"/>
            <CSSTransition in={open} timeout={200} classNames={'black-background-anim'} unmountOnExit>
                <div onClick={()=> controlNavbar(open, setOpen)} className="black-background"></div>
            </CSSTransition>
            <CSSTransition in={open} timeout={200} classNames={'navbar-menu-anim'}>
                <div className="background-title"></div>
            </CSSTransition>
            <CSSTransition in={open} timeout={200} classNames={'navbar-menu-anim'} unmountOnExit>
                <div className="navbar-menu-container">
                    <form onSubmit={(e)=> onSubmitHandler(e, open, setOpen, search, navigate)} id="form-search" className="search-bar">
                        <input maxLength={40} ref={inputRef} onChange={()=> setSearch(inputRef.current.value)} className="search-input" type="text" placeholder="Search movies..."/>
                        <button type="submit" form="form-search" className="search-link">
                            <IoMdSearch className="search-icon"/>
                        </button>
                    </form>
                    <Link onClick={()=> {
                        controlNavbar(open, setOpen)
                        window.scrollTo(0 ,0)
                    }} className="navbar-link" to="/">Home</Link>
                    <div className="navbar-genres-title-container">
                        <span className="navbar-genres-title">Genres</span>
                        <IoIosArrowDown className="navbar-arrow"/>
                    </div>
                    <div className="navbar-genres-container">
                        {genres && genres.map(genre => {
                            return(
                                <Link onClick={()=> controlNavbar(open, setOpen)} className="genre-link" to={"/movies/genres/" + genre.id + "/" + genre.name}>{genre.name}</Link>
                            )
                        })}
                    </div>
                </div>
            </CSSTransition>
        </div>
    )
    return (
        <div className="navbar-container" ref={navbarRef}>
            <img className="logo" src={logo} alt="Movies" />
            <span className="logo-title">MDB</span>
            <span></span>
            <Link onClick={()=> {window.scrollTo(0 ,0)}} className="navbar-link" to="/">Home</Link>
            <div onMouseEnter={()=> setOpen(true)} onMouseLeave={()=> setOpen(false)} className="desktop-genres-container" >
                <div className="navbar-genres-title-container">
                    <span className="navbar-genres-title">Genres</span>
                    <IoIosArrowDown className="navbar-arrow"/>
                </div>
                <CSSTransition in={open} timeout={200} classNames={''} unmountOnExit>
                    <div>
                        <div className="arrow-menu"></div>
                        <div className="navbar-genres-container">
                            {genres && genres.map(genre => {
                                return(
                                    <Link onClick={()=> controlNavbar(open, setOpen)} className="genre-link" to={"/movies/genres/" + genre.id + "/" + genre.name}>{genre.name}</Link>
                                )
                            })}
                        </div>
                    </div>
                </CSSTransition>
            </div>
            <form onSubmit={(e)=> onSubmitHandler(e, open, setOpen, search, navigate)} id="form-search" className="search-bar">
                <input maxLength={40} ref={inputRef} onChange={()=> setSearch(inputRef.current.value)} className="search-input" type="text" placeholder="Search movies..."/>
                <button type="submit" form="form-search" className="search-link">
                    <IoMdSearch className="search-icon"/>
                </button>
            </form>
        </div>
    )
}