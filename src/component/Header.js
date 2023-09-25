import { Link } from "react-router-dom";
import logo from "../Assets/logo.svg";

const Header = () => {

    return (
        <div style={{display:"flex", justifyContent:"center", background:"#CE2829", paddingTop:"2%"}}>
            <Link to="/">
                <img alt="Teknolojik Yemekler" src={logo} />
            </Link>
        </div>
    )

}
export default Header;