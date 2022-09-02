const seePages = (totalPages)=> {
    if (totalPages > 999) {
        return "..."
    } else {
        return totalPages
    }
}

export default seePages