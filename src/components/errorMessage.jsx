import { CSSTransition } from "react-transition-group"
import { MdOutlineUpdate } from "react-icons/md"

function ErrorMessage(props) {
  return (
        <div className="error-background">
            <CSSTransition appear in={true} timeout={200} classNames="error-anim" >
                <div className="error-modal">
                    <span className="code">{props.code}</span>
                    <span className="message">{props.message}</span>
                    <MdOutlineUpdate onClick={()=> window.location.href = "/"} className="reload" />
                </div>
            </CSSTransition>
        </div>
  )
}

export default ErrorMessage