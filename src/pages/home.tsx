import react from "react";
import { motion } from "framer-motion";
import { BrowserRouter, useNavigate } from "react-router-dom";
import "../assets/css/Home.css"
import "../assets/fonts/Handlee.css"
import pencil from "../assets/icons/pencil.png";
import { ScrollImages } from "../components/ScrollImages";
import Card from "../components/Card";
import "../assets/fonts/Huninn.css";
import SmallCard from "../components/SmallCard";

const Home = () => {
    const navigate = useNavigate();
    const changePage = () => {
        // ws.send("drawing");
        navigate("/rules", { state: { frombutton: true } })
    };
    // ServerSocket();  
    return (
        <div className="home">
            <div className="HeaderBox"><div>Settings</div></div>
            <div className="TitleBox">
                <span className="Title handlee-regular">
                    Let's start Sketch Card Battle
                </span>
                <img src={pencil} alt="pencil" className="titleIcon" />
            </div>
            <motion.div

            className="Gallery">
                {/* <SmallCard skills={[{"nickname":"aaa","ex":"基礎解析学のテストは難しかったけど、点数が上がった"},{"nickname":"aaa","ex":"aaa"},{"nickname":"aaa","ex":"aaa"},{"nickname":"aaa","ex":"aaa"}]}></SmallCard> */}
            </motion.div>
            <motion.div
                whileHover={{ y: 10 }}
                className="DrawingButtonBox">
                <div className="DrawingButton" onClick={changePage}>
                    <span className="huninn-regular">Let's Drawing</span>
                </div>
                {/* <button onClick={changePage}>let's drawing</button> */}
            </motion.div>
        </div>);
};


export default Home;