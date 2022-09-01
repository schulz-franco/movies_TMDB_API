import { Link } from "react-router-dom"
import { CSSTransition } from "react-transition-group"
import { IoIosArrowDown, IoMdClose, IoMdMenu, IoMdSearch } from "react-icons/io"
import logo from "../assets/logo.png"
import useNavbar from "../hooks/useNavbar"

const open_button = (open, setOpen, controlNavbar)=> {
    if (open) {
        return <IoMdClose onClick={()=> controlNavbar(open, setOpen)} className="menu-icon"/>
    } else {
        return <IoMdMenu onClick={()=> controlNavbar(open, setOpen)} className="menu-icon"/>
    }
}

const controlNavbar = (open, setOpen)=> {
    if (open) {
        setOpen(false)
    } else {
        setOpen(true)
    }
}

const search = ()=> {
    window.location.href = "/movies/search/" + document.querySelector(".navbar-menu-container .search-bar .search-input").value
}

export default function Navbar() {

    const { open, setOpen, genres, navbarRef } = useNavbar()

    return(
        <div className="navbar-container" ref={navbarRef}>
            <img className="logo" src={logo} alt="Movies" />
            <span className="logo-title">MDB</span>
            <span/>
            {open_button(open, setOpen, controlNavbar)}
            <div className="circle"/>
            <CSSTransition in={open} timeout={200} classNames={'black-background-anim'} unmountOnExit>
                <div onClick={()=> controlNavbar(open, setOpen)} className="black-background"></div>
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
}