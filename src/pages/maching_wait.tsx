import React, { useState, useEffect } from "react"
import { useWebSocketContext } from "../components/WebSocketManager";
import { useLocation, Navigate, useNavigate } from 'react-router-dom';
import "../assets/css/waiting.css"


const Waiting = () => {
    const [waitmsg, setWaitmsg] = useState("対戦相手を待っています . . .");
    const location = useLocation();
    const [index,setIndex]=useState(0)
    const { sendMessage, isConnected, subscribe, unsubscribe } = useWebSocketContext();
    const navigate = useNavigate();
    const changePage = () => {
        navigate("/battle", { state: { frombutton: true } });
    }

    // useEffect(()=>{
    //     const interval=setInterval(() => {
    //         setIndex(prev=>prev+1);
    //     }, 1000);
    //     // return clearInterval(interval)
    // },[])
    // useEffect(()=>{
    //     let msg="対戦相手を待っています."
    //     for(let i=0;i<=index%4;i++){
    //         msg+=" ."
    //     }
    //     setWaitmsg(msg)
    // },[index])
    useEffect(() => {
        const handler = (e) => {
            const data = e;
            const status = data["status"]
            if (status == "match_found") {
                setWaitmsg("対戦相手が見つかりました。")
                changePage()
            }
        }
        subscribe(handler);
        return () => unsubscribe(handler);
    }, [subscribe, unsubscribe, waitmsg])
    return (
        <div className="handlee-regular" style={{display:"flex",justifyContent:"center",alignContent:"center",width:"100vw",height:"100vh",alignItems:"center"}}>
        <div style={{fontSize:"2em"}}>{waitmsg}</div>
{/* <div style={{height:"10vh",display:"flex"}}>
    <div className="loadingbox"></div>
    <div className="loadingbox"></div>
    <div className="loadingbox"></div>
    <div className="loadingbox"></div>
    <div className="loadingbox"></div>
</div> */}
        </div>
    );
}
export default Waiting;
