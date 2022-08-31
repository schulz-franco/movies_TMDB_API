import web_error_img from "../assets/web-error.png"

export default function Res_error() {
    return(
        <div className="error-container">
            <div className="error-mobile">
                <img width={180} src={web_error_img} alt="Web error" className="img-error-mobile" />
                <span className='error'>Sorry, this site is only available for mobile devices.</span>
            </div>
        </div>
    )
}