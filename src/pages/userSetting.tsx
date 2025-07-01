import React, { useContext, useEffect, useState } from "react";
import "../assets/css/UserSettings.css";
import { useNavigate } from "react-router-dom";
import { useWebSocketContext } from "../components/WebSocketManager"
import { BattleManagerContext, useBattleManagerContext } from "../components/BattleManager";
import { motion } from "framer-motion";
import "../assets/css/inputs.css";
import chevron_right_24dp_0F0F0F_FILL0_wght400_GRAD0_opsz24 from "../assets/icons/chevron_right_24dp_0F0F0F_FILL0_wght400_GRAD0_opsz24.svg"
import { Colors } from "../constants/Colors";

const UserSettings = () => {
    // TODO:エラー表示の作成
    //TODO:直リンク防止
    const navigate = useNavigate();
    const [nickname, setNickname] = useState("");

    const { sendMessage, isConnected } = useWebSocketContext();
    const { userid } = useContext(BattleManagerContext)
    const [errormsg,setErrormsg]=useState("")
    const ChangePage = () => {

        if (nickname.trim() && isConnected) {
            sendMessage(JSON.stringify({ status: "usersetup", userid: userid, nickname: nickname }));
            navigate("/drawing", { state: { frombutton: true } })
        };
        if (!isConnected){
            setErrormsg("No connection to the Server.")
        }
        if (!nickname.trim()){
            setErrormsg("名前を入力してください。")
        }
    };


    return (
        <div className="usersettingsBox huninn-regular" >
            <div style={{ "fontSize": "3em", "marginBottom": "10vh" }}><span color={Colors.light.text}>ニックネームを入力</span><span>✨</span></div>
            <input color={Colors.light.text} type="text" placeholder="ニックネームを入力" style={{
                "marginBottom": "10vh", "width": "40vw",
                "height": " 5vh",
                "fontSize": "1.5em",
                padding: "25px"

            }} onChange={(event) => { setNickname(event.target.value) }} id="nickname" />
            <motion.div whileHover={{ y: 10 }}
                style={{ display: "flex", color: Colors.light.text }}

                className="DrawingButton" onClick={ChangePage}>決定 <img src={chevron_right_24dp_0F0F0F_FILL0_wght400_GRAD0_opsz24} alt="" />
                
                </motion.div >
        <div>
            <span>{errormsg}</span>
        </div>
        </div>
    );
}

export default UserSettings;