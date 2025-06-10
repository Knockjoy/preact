import react from "react";
import { Navigate,Location, useLocation, useNavigate } from "react-router-dom";

const Result=()=>{
    const location=useLocation();
    const navigate=useNavigate();
    const changePage=()=>{
        navigate("/home");
    };
    if(!location.state?.frombutton){
        return <Navigate to="/home" replace />
    }
return (
    <div>
        <h1>
            result page
        </h1>
        <button onClick={changePage}>go to home</button>
    </div>
);
};

export default Result;