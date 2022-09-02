const navbarListenerScroll = (navbarRef)=> {
    window.addEventListener("scroll", (e)=> {
        try {
            if (window.scrollY > 10) {
                navbarRef.current.style.backgroundColor = "#080f28"
            } else if (window.scrollY < 50) {
                navbarRef.current.style.backgroundColor = ""
            }
        } catch {
        }
    }, false)
}

export default navbarListenerScroll