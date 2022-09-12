import { Link } from "react-router-dom"
import { BsGithub, BsLinkedin, BsInstagram } from "react-icons/bs"
import logoImage from "../assets/logo.png"

const instagramUrl = "https://www.instagram.com/fran.schulzz/"
const githubUrl = "https://github.com/schulz-franco"
const linkedinUrl = "https://www.linkedin.com/in/franco-schulz-967b78249"

const Footer = ({ margin }) => {
    let styles = {
        marginTop: margin ? margin : 0
    }
    return (
        <div style={styles} className="footer-container">
            <div className="title-container">
                <img width={36} height={36} src={logoImage} alt="MDB" />
                <span className="title">Movies Data Base</span>
                <span></span>
            </div>
            <span className="author">© 2022 - Franco Schulz</span>
            <div className="social-networks">
                <a href={githubUrl}><BsGithub className="social" /></a>
                <a href={linkedinUrl}><BsLinkedin className="social" /></a>
                <a href={instagramUrl}><BsInstagram className="social" /></a>
            </div>
        </div>
    )
}

export default Footer