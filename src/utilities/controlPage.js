const controlPage = (ev, option, setPage, page)=> {
    if (option === "next") {
        return setPage(page + 1)
    } else return setPage(page - 1)
}

export default controlPage