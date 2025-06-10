import react from "react";
import { BrowserRouter, useNavigate } from "react-router-dom";
import "../assets/css/Home.css"


const Home = () => {
    const navigate = useNavigate();
    const changePage = () => {
        navigate("/drawing", { state: { frombutton: true } })
    };
    return (
        <div>
            <div class="HeaderBox"><div>Settings</div></div>
            <div class="TitleBox">
                <span class="Title">
                    Let's start Sketch Card Battle
                </span>
            </div>

            <button onClick={changePage}>let's drawing</button>
        </div>);
};


export default Home;