import Loader from "../assets/loading.gif"

const Loading = ()=> {
    return(
        <div className="loading">
            <img src={Loader} alt="Loading..." />
        </div>
    )
}

export default Loading