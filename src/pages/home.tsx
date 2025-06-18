import react from "react";
import { BrowserRouter, useNavigate } from "react-router-dom";
import "../assets/css/Home.css"
import "../assets/fonts/Handlee.css"
import pencil from "../assets/icons/pencil.png";
import {ServerSocket} from "../hooks/Serverconnection.ts";

const Home = () => {
    const navigate = useNavigate();
    const changePage = () => {
        ws.send("drawing");
        navigate("/drawing", { state: { frombutton: true } })
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
        <div className="Gallery"></div>
        <div className="DrawingButtonBox">
            <div className="DrawingButton" onClick={changePage}>
                <span>Let's Drawing</span>
            </div>
                    {/* <button onClick={changePage}>let's drawing</button> */}
            </div>
        </div>);
};


export default Home;