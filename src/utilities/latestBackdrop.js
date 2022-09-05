const latestBackdrop = (personCast)=> {
    let result = null
    personCast.cast.map(cast => {
        if (!result) {
            result = cast.backdrop_path ? cast.backdrop_path : null
        }
    })
    return result
}

export default latestBackdrop