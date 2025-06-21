import "../assets/css/UserSettings.css";
import { useNavigate } from "react-router-dom";
// import { WebSocketProvider } from "../hooks/Serverconnection.ts";

const UserSettings = () => {
    const navigate = useNavigate();
    const changePage = () => {
        // ws.send("drawing");
        navigate("/drawing", { state: { frombutton: true } })
    };

    return (
        <div class="usersettingsBox huninn-regular">
            {/* <WebSocketProvider> */}
                <div style={{"font-size":"3em"}}><span>ニックネームを入力</span><span>✨</span></div>
                <input type="text" />
                <div onClick={changePage}>決定 </div>
            {/* </WebSocketProvider> */}
        </div>
    );
}

export default UserSettings;