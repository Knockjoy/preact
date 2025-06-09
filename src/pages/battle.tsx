import react from "react";
import { Navigate,useLocation } from "react-router-dom";
import Home from "./home";

const Battle=()=>{
    const location=useLocation();
    if(!location.state?.frombutton){
        return(<Navigate to={"/home"} replace/>);
    }
    return(
        <div>
            <h1>battle</h1>
        </div>
    );
}

export default Battle;