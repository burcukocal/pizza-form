import React from "react"
import "../style/HomePage.css";
import { foodItems } from "../data/FoodIcons";

const HomeNavBar = () => {
    return (
        <div className="nav-bar">
            {foodItems.map((item) => (
                <div className="nav-icons">
                    <img alt="food-item" src={item.img} />
                    <span>{item.name}</span>
                </div>
            ))}
        </div>
    )
}

export default HomeNavBar;