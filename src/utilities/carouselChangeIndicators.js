const carouselChangeIndicators = (carouselIndicators, currentItem)=> {
    carouselIndicators.current.childNodes.forEach(node => {
        node.classList.remove("current")
    })
    if (currentItem!== 4) {
        carouselIndicators.current.childNodes[currentItem + 1].classList.add("current")
    } else {
        carouselIndicators.current.childNodes[0].classList.add("current")
    }
}

export default carouselChangeIndicators