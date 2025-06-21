// WebSocketContext.tsx
import React, { createContext, useContext, useRef, useEffect, useState} from 'react';
type WebSocketContextType = {
  socket: WebSocket | null;
  sendMessage: (msg: string) => void;
  isConnected: boolean;
};


export const WebSocketContext = createContext(undefined);

export const WebSocketProvider= ({ children }) => {
  const socketRef = useRef(null);
  const [isConnected, setIsConnected] = useState(false);
  const [userID,setUserID]=useState(-1);
  useEffect(() => {
    const socket = new WebSocket('ws://localhost:19009/ws');
    socketRef.current = socket;

    socket.onopen = () => {setIsConnected(true);sendMessage(JSON.stringify({status:"::connect::"}));}
    socket.onclose = () => setIsConnected(false);
    socket.onerror = (e) => console.error(e);
    socket.onmessage = (e) => {
      if(!e.data.trim()) return;
      const data=JSON.parse(e.data);
      const status=data["status"];
      if (status=="firstConnect"){
        setUserID(data["userid"]);
      }
      
      console.log('Received:', e.data);};

    return () => socket.close();
  }, []);

  const sendMessage = (msg: string) => {
    if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
      socketRef.current.send(msg);
    }
  };
  return (
    <WebSocketContext.Provider value= {{ socket: socketRef.current, sendMessage, isConnected,userID }}>
  { children }
  </WebSocketContext.Provider>
);
};

export const useWebSocketContext = () => {
  const context = useContext(WebSocketContext);
  if (!context) throw new Error('useWebSocketContext must be used within WebSocketProvider');
  return context;
};
