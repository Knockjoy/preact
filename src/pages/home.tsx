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
import { Colors } from "../constants/Colors";
import chevron_right_24dp_0F0F0F_FILL0_wght400_GRAD0_opsz24 from "../assets/icons/chevron_right_24dp_0F0F0F_FILL0_wght400_GRAD0_opsz24.svg"


const Home = () => {
    const navigate = useNavigate();
    const changePage = () => {
        // ws.send("drawing");
        navigate("/rules", { state: { frombutton: true } })
    };
    const licences = () => { navigate("/licences") }
    const handle = () => {
        document.documentElement.requestFullscreen()
        // document.body.requestFullscreen()
    }
    // ServerSocket();  
    return (
        <div className="home">
            <div style={{display:"flex",flexDirection:"row",justifyContent:"space-between"}} className="HeaderBox" >
                <div onClick={licences}><span style={{ color: Colors.light.text }}>Settings</span></div>
                <div onClick={handle}><span>in fullscreen</span></div>
            </div>
            <div className="TitleBox">
                <span className="Title handlee-regular" color={Colors.light.text}>
                    Let's start Sketch Card Battle
                </span>
                <img src={pencil} alt="pencil" className="titleIcon" />
            </div>
            <motion.div
                className="Gallery">
            </motion.div>
            <div
                className="DrawingButtonBox">
                <motion.div
                    whileHover={{ y: 10 }}
                    className="DrawingButton"
                    onClick={changePage}
                    style={{ display: "flex" }}>
                    <span className="huninn-regular" color={Colors.light.text}>Let's Drawing</span>
                    <img src={chevron_right_24dp_0F0F0F_FILL0_wght400_GRAD0_opsz24} alt="" />
                </motion.div>
                {/* <button onClick={changePage}>let's drawing</button> */}
            </div>
        </div>);
};


export default Home;