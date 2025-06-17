import React,{useState,useEffect,useRef} from "react";

export const serverSocket=()=>{
    const [data,setData]=useState();
    const [isConnected,setIsConnected]=useState(false);
    const ws=useRef(null);

    useEffect(()=>{
        ws.current=new WebSocket("ws://localhost:19009/ws");

        ws.current.onopen=()=>{
            console.log("ws connected");
            setIsConnected(true);
        };

        ws.current.onmessage=(event)=>{
            console.log(event.data);
        }

        ws.current.onerror=(error)=>{
            console.error("ws error:",error);
        }

        ws.current.onclose=()=>{
            console.log("ws disconnected");
            setIsConnected(false);
        }
    },[]);

    // return (<div></div>);
}

export default serverSocket;