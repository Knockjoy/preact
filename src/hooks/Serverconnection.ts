import React,{useState,useEffect,useRef} from "react";

let ws=<WebSocket|null>null;
const wsurl="ws://localhost:19009/ws"
const isConnected=true;
export const ServerSocket=()=>{
    ws=new WebSocket(wsurl);
};
export default ServerSocket;
