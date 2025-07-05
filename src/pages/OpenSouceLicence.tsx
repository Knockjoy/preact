import { Navigate,useNavigate } from "react-router-dom";

const OpenSourceLicence=()=>{
    const navi=useNavigate()
    return(
        <div>
<div onClick={()=>navi("/home")}>goto back</div>
            <li><a href="https://www.flaticon.com/free-icons/writer" title="writer icons">Writer icons created by Freepik - Flaticon</a></li>
            <li><a href="https://www.flaticon.com/free-icons/sword" title="sword icons">Sword icons created by Freepik - Flaticon</a></li>
            <li><a href="https://www.flaticon.com/free-icons/shield" title="shield icons">Shield icons created by Maniprasanth - Flaticon</a></li>
            <li><a href="https://www.flaticon.com/free-icons/heart" title="heart icons">Heart icons created by Md Tanvirul Haque - Flaticon</a></li>
            <li><a href="https://www.flaticon.com/free-icons/magic" title="magic icons">Magic icons created by redempticon - Flaticon</a></li>
        </div>
    );
}

export default OpenSourceLicence;