import React from "react"
import { instagram } from "../data/InstaIcons"
import "../style/HomePage.css"
import icon1 from "../Assets/adv-aseets/icons/icon-1.png"
import icon2 from "../Assets/adv-aseets/icons/icon-2.png"
import icon3 from "../Assets/adv-aseets/icons/icon-3.png"


const Footer = () => {
    const year = new Date().getFullYear()
    return (
        <>
        <div className="footer">
            <div className="footer-menu">
                <h3>Teknolojik Yemekler</h3>
                <p><span><img alt="address" src={icon1} /></span> 341 Londonderry Road. <br></br>Istanbul Türkiye</p>
                <p><span><img alt="email" src={icon2} /></span>  aciktim@teknolojikyemekler.com</p>
                <p><span><img alt="tel" src={icon3} /> </span> +90 216 123 45 67</p>
            </div>
            <div className="footer-menu">
                <h4>Sıcacık Menüler</h4>
                <ul>
                    <li>Terminal Pizza</li>
                    <li>5 Kişilik Hackathlon Pizza</li>
                    <li>useEffect Tavuklu Pizza</li>
                    <li>Beyaz Console Frosty</li>
                    <li>Testler Geçti Mutlu Burger</li>
                    <li>Position Absolute Acı Burger</li>
                </ul>
            </div>
            <div className="footer-menu">
            <h4>Instagram</h4>
            <div>
                {instagram.map((pic) => (
                  <img alt="food item" src={pic.img}/>
                ))}
            </div>
            </div>
        </div>
        <div className="copyright">
                <p>© Copyright {year} Teknolojik Yemekler</p>
                <i className="fa-brands fa-twitter" style={{color: "#ffffff"}}></i>
        </div>
        </>
    )
}

export default Footer;