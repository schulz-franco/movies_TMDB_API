export const controlPage = (ev, option, setPage, page)=> {
    if (option == "next") {
        return setPage(page + 1)
    } else return setPage(page - 1)
}

export const seePages = (totalPages)=> {
    if (totalPages > 999) {
        return "..."
    } else {
        return totalPages
    }
}

export const controlArrows = (arrow1, arrow2, page, setPage, totalPages)=> {
    if (arrow1 && arrow2) {
        if (page <= 1) {
            arrow1.classList.add("invalid")
            setPage(1)
        } else {
            arrow1.classList.remove("invalid")
        }
        if (page >= totalPages) {
            arrow2.classList.add("invalid")
            setPage(totalPages)
        } else {
            arrow2.classList.remove("invalid")
        }
    }
}