import React from "react";
import "../style/HomePage.css";
import { Col, Container, Row } from "reactstrap";
import icon1 from "../Assets/adv-aseets/icons/1.svg";
import icon2 from "../Assets/adv-aseets/icons/2.svg";
import icon3 from "../Assets/adv-aseets/icons/3.svg";
import icon4 from "../Assets/adv-aseets/icons/4.svg";
import icon5 from "../Assets/adv-aseets/icons/5.svg";
import icon6 from "../Assets/adv-aseets/icons/6.svg";
import { Link } from "react-router-dom";

const HomeContent = ({ menuItems }) => {
    const orderButton = <button className="order-button">SİPARİŞ VER</button>

    return (
        <div>
            <Container className="main-container">
                <div className="menu-box">
                    <Row>
                        <Col xs="12" lg="6">
                            <div className="box1">
                                <h2>Özel <br /> Lezzetus</h2>
                                <p>Position: Absolute Acı Burger</p>
                                <br />
                                <Link to="/pizza">{orderButton}</Link>
                            </div>
                        </Col>
                        <Col>
                            <div className="boxes">
                                <div className="box2">
                                    <h2>Hackathlon <br /> Burger Menü</h2>
                                    <br />
                                    <Link to="/pizza">{orderButton}</Link>
                                </div>
                                <div className="box3">
                                    <h2><span>Çoooook</span> hızlı <br /> npm gibi kurye</h2>
                                    <br />
                                    <Link to="/pizza">{orderButton}</Link>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </div>
                <Row className="mb-5">
                    <div>
                        <div className="home-food-filter">
                            <p>en çok paketlenen menüler</p>
                            <h3>Acıktıran Kodlara Doyuran Lezzetler</h3>
                        </div>
                        <div className="home-filters">
                            <div className="header-icons"><img alt="food item" src={icon1} /> <span>YENİ! Kore</span></div>
                            <div className="header-icons active"><img alt="food item" src={icon2} /> <span>Pizza</span></div>
                            <div className="header-icons"><img alt="food item" src={icon3} /> <span>Burger</span></div>
                            <div className="header-icons"><img alt="food item" src={icon4} /> <span>Kızartmalar</span></div>
                            <div className="header-icons"><img alt="food item" src={icon5} /> <span>Fast Food</span></div>
                            <div className="header-icons"><img alt="food item" src={icon6} /> <span>Gazlı İçecekler</span></div>
                        </div>
                    </div>
                    <div className="menu-items">
                        {menuItems.map((item) => (
                            <div className="food-cards">
                                <div>
                                    <img alt="food" src={item.img} />
                                    <h4>{item.name}</h4>
                                    <div className="item-info">
                                        <p>{item.point}</p>
                                        <p>({item.comment})</p>
                                        <p className="food-info-price">{item.price}₺</p>

                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </Row>
            </Container>

        </div>
    )

}
export default HomeContent;