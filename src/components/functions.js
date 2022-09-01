export const control_page = (ev, option, set_page, page)=> {
    if (option == "next") {
        return set_page(page + 1)
    } else return set_page(page - 1)
}

export const see_pages = (total_pages)=> {
    if (total_pages > 999) {
        return "..."
    } else {
        return total_pages
    }
}

export const control_arrows = (arrow1, arrow2, page, set_page, total_pages)=> {
    if (arrow1 && arrow2) {
        if (page <= 1) {
            arrow1.classList.add("invalid")
            set_page(1)
        } else {
            arrow1.classList.remove("invalid")
        }
        if (page >= total_pages) {
            arrow2.classList.add("invalid")
            set_page(total_pages)
        } else {
            arrow2.classList.remove("invalid")
        }
    }
}