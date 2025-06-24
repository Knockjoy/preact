import React, { useState, useEffect } from "react"
import { useWebSocketContext } from "../components/WebSocketManager.tsx";
import { useLocation, Navigate, useNavigate } from 'react-router-dom';


const Waiting = () => {
    const [waitmsg, setWaitmsg] = useState("waiting oponent");
    const location = useLocation();

    const { sendMessage, isConnected, subscribe, unsubscribe } = useWebSocketContext();
    const navigate = useNavigate();
    const changePage = () => {
        navigate("/battle", { state: { frombutton: true } });
    }

    useEffect(() => {
        const handler = (e) => {
            const data = e;
            const status = data["status"]
            if (status == "match_found") {
                setWaitmsg("found oponent")
                changePage()
            }
        }
        subscribe(handler);
        return () => unsubscribe(handler);
    }, [subscribe, unsubscribe, waitmsg])
    return (
        <div>{waitmsg}</div>
    );
}
export default Waiting;
