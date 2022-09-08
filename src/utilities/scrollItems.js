const scrollItems = (elementPath, direction) => {
    let count = 0
    if (direction === "rigth") {
        let interval = setInterval(()=> {
            if (count === 29) return clearInterval(interval)
            elementPath.scrollLeft = elementPath.scrollLeft + 10
            count++
        }, 15)
    } else if (direction === "left") {
        let interval = setInterval(()=> {
            if (count === 29) return clearInterval(interval)
            elementPath.scrollLeft = elementPath.scrollLeft - 10
            count++
        }, 15)
    }
}

export default scrollItems