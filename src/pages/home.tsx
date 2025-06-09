import react from "react";
import { BrowserRouter, useNavigate } from "react-router-dom";

const Home = () => {
    const navigate =useNavigate();
    const changePage=()=>{
        navigate("/drawing",{state:{frombutton:true}})
    };
    return (
    <div>
        <h1>
            home
        </h1>
        <button onClick={changePage}>let's drawing</button>
    </div>);
};


export default Home;