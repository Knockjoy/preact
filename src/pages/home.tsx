import react from "react";
import { motion } from "framer-motion";
import { BrowserRouter, useNavigate } from "react-router-dom";
import "../assets/css/Home.css"
import "../assets/fonts/Handlee.css"
import pencil from "../assets/icons/pencil.png";
import { ScrollImages } from "../components/ScrollImages.tsx";
import Card from "../components/Card.tsx";
import "../assets/fonts/Huninn.css";
import SmallCard from "../components/SmallCard.tsx";

const Home = () => {
    const navigate = useNavigate();
    const changePage = () => {
        // ws.send("drawing");
        navigate("/rules", { state: { frombutton: true } })
    };
    // ServerSocket();  
    return (
        <div class="home">
            <div class="HeaderBox"><div>Settings</div></div>
            <div class="TitleBox">
                <span class="Title handlee-regular">
                    Let's start Sketch Card Battle
                </span>
                <img src={pencil} alt="pencil" class="titleIcon" />
            </div>
            <motion.div

            className="Gallery">
                {/* <SmallCard skills={[{"nickname":"aaa","ex":"基礎解析学のテストは難しかったけど、点数が上がった"},{"nickname":"aaa","ex":"aaa"},{"nickname":"aaa","ex":"aaa"},{"nickname":"aaa","ex":"aaa"}]}></SmallCard> */}
            </motion.div>
            <motion.div
                whileHover={{ y: 10 }}
                className="DrawingButtonBox">
                <div className="DrawingButton" onClick={changePage}>
                    <span class="huninn-regular">Let's Drawing</span>
                </div>
                {/* <button onClick={changePage}>let's drawing</button> */}
            </motion.div>
        </div>);
};


export default Home;