import HomeContent from "../component/HomeContent";
import HomeHeader from "../component/HomeHeader";
import HomeNavBar from "../component/HomeNavBar";
import food1 from "../Assets/adv-aseets/food-1.png";
import food2 from "../Assets/adv-aseets/food-2.png";
import food3 from "../Assets/adv-aseets/food-3.png";
import Footer from "../component/Footer";

const HomePage = () => {
    const menuItems = [
        {
          id: 1,
          name: "Terminal Pizza",
          point: 4.9,
          comment: 200,
          price: 60,
          img: food1
        },
        {
          id: 2,
          name: "Position Absolute Acı Pizza",
          point: 4.9,
          comment: 928,
          price: 85,
          img: food2
        },
        {
          id: 3,
          name: "useEffect Tavuklu Burger",
          point: 4.9,
          comment: 462,
          price: 75,
          img: food3
        }
      ]

    return (
        <div>
            <HomeHeader />
            <HomeNavBar />
            <HomeContent menuItems={menuItems} />
            <Footer/>
        </div>
    )

}
export default HomePage;