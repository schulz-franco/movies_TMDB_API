const carouselMove = (currentItem, setCurrentItem)=> {
    if (currentItem == 4) {
        setCurrentItem(0)
    } else {
        setCurrentItem(currentItem + 1)
    }
}

export default carouselMove