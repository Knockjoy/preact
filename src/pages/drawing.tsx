import react from "react";
import { useLocation, Navigate, useNavigate } from "react-router-dom";

import App from "../components/camvas.tsx";

const Drawing = () => {
    
    const navigate =useNavigate();
    const changePage=()=>{
        navigate("/battle",{state:{frombutton:true}})
    };
    const location = useLocation();
    if (!location.state?.frombutton) {
        return <Navigate to={"/home"} replace />
    }
    return (
        <div>
            <h1>draw</h1>
            <button onClick={changePage}>確定</button>
            <App></App>
        </div>
    );
}

export default Drawing;