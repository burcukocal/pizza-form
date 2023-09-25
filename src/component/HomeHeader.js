import { Link } from "react-router-dom";
import Header from "./Header";
import "../style/HomePage.css";

const HomeHeader = () => {

    return (
        <>
            <div className="home-header">
                <Header/>
                <div className="header-title">
                    <p>fırsatı kaçırma</p>
                    <h2>KOD ACIKTIRIR</h2>
                    <h2>PIZZA, DOYURUR</h2>
                    <Link to="/pizza">
                        <button>ACIKTIM</button>
                    </Link>
                </div>

            </div>
        </>
    )

}
export default HomeHeader;