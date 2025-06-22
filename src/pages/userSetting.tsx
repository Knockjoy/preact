import React, { useEffect, useState } from "react";
import "../assets/css/UserSettings.css";
import { useNavigate } from "react-router-dom";
import { useWebSocketContext } from "../hooks/WebSocketManager.tsx"

const UserSettings = () => {
    // TODO:エラー表示の作成
    //TODO:直リンク防止
    const navigate = useNavigate();
    const [nickname, setNickname] = useState("");

    const { sendMessage, isConnected,userID } = useWebSocketContext();
    // useEffect(() => {
    //     if (isConnected) {
    //         sendMessage('connect');
    //     }
    // }, [isConnected]);

    const ChangePage = () => {
        // ws.send("drawing");
        
        if (nickname.trim() && isConnected) {
            sendMessage(JSON.stringify({status:"usersetup",userid:userID,nickname:nickname}));
            navigate("/drawing", { state: { frombutton: true } })
        };
    };


    return (
        <div class="usersettingsBox huninn-regular">
            {/* <WebSocketProvider> */}
            <div style={{ "font-size": "3em" }}><span>ニックネームを入力</span><span>✨</span></div>
            <input type="text" onChange={(event) => { setNickname(event.target.value) }} id="nickname" />
            <div onClick={ChangePage}>決定 </div>
            {/* </WebSocketProvider> */}
        </div>
    );
}

export default UserSettings;