import react from "react";
import { Navigate,Location, useLocation } from "react-router-dom";

const Result=()=>{
    const location=useLocation();
    if(!location.state?.frombutton){
        return <Navigate to="/home" replace />
    }
return (
    <div>
        <h1>
            result page
        </h1>
    </div>
);
};

export default Result;