import react from "react";
import { useLocation,Navigate } from "react-router-dom";

import App from "../components/camvas.tsx";

const Drawing=()=>{
    const location =useLocation();
    if(!location.state?.frombutton){
        return <Navigate to={"/home"} replace/>
    }
    return (
        <div>
            <h1>draw</h1>
            <App></App>
        </div>
    );
}

export default Drawing;