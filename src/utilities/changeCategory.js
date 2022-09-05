const changeCategory = (ev, button, setCategory, page, setPage)=> {
    if (button === "ranking") {
        setCategory("ranking")
        ev.target.previousSibling.classList.remove("category-current")
    } else {
        setCategory("latest")
        ev.target.nextSibling.classList.remove("category-current")
    }
    ev.target.classList.add("category-current")
    if (page > 1) {
        setPage(1)
    }
}

export default changeCategory