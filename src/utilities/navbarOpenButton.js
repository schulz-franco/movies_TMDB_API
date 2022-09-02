const navbarOpenButton = (open, setOpen, controlNavbar, IoMdClose, IoMdMenu)=> {
    if (open) {
        return <IoMdClose onClick={()=> controlNavbar(open, setOpen)} className="menu-icon"/>
    } else {
        return <IoMdMenu onClick={()=> controlNavbar(open, setOpen)} className="menu-icon"/>
    }
}

export default navbarOpenButton