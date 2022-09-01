import Loader from "../assets/loading.gif"

export default function Loading() {
    return(
        <div className="loading">
            <img src={Loader} alt="Loading..." />
        </div>
    )
}