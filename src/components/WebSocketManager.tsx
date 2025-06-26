// WebSocketContext.tsx
import React, { createContext, useContext, useRef, useEffect, useState } from 'react';
import {BattleManagerContext, useBattleManagerContext} from "./BattleManager.tsx"
type MessageHandler = (message: MessageEvent) => void;

type WebSocketContextType = {
  socket: WebSocket | null;
  sendMessage: (msg: string) => void;
  isConnected: boolean;
  subscribe: (handler: MessageHandler) => void;
  unsubscribe: (handler: MessageHandler) => void;
};

export const WebSocketContext = createContext<WebSocketContextType | undefined>(undefined);

interface Dictionary<T> {
  [key: string]: T;
}

export const WebSocketProvider = ({ children }) => {
  const socketRef = useRef(null);
  const [isConnected, setIsConnected] = useState(false);
  const messageHandlersRef = useRef<Set<MessageHandler>>(new Set())
  const {setUserid,setOpponentcards,setBattleid}=useBattleManagerContext();
  useEffect(() => {
    const socket = new WebSocket('ws://192.168.1.201:19004/ws');
    socketRef.current = socket;

    socket.onopen = () => { setIsConnected(true); sendMessage(JSON.stringify({ status: "::connect::" })); }
    socket.onclose = () => setIsConnected(false);
    socket.onerror = (e) => console.error(e);
    socket.onmessage = (e) => {
      if (!e.data.trim()) return;
      const data = JSON.parse(e.data);
      const status = data["status"];
      if (status == "firstConnect") {
        setUserid(data["userid"]);
      }
      if (status == "match_found") {
        const opinfo = [
          data["opponet"], // userid
          data["opponetcards"] //[cardid]
        ];
        setBattleid(data["battleid"])
        setOpponentcards(opinfo)
      }
      // TODO:技実行されたらthisturn系をリセット

      messageHandlersRef.current.forEach((handler) => handler(data))

      console.log('Received:', e.data);
    };

    return () => socket.close();
  }, []);

  const sendMessage = (msg: string) => {
    if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
      socketRef.current.send(msg);
    }
  };
  const subscribe = (handler: MessageHandler) => {
    console.log("add torigger")
    messageHandlersRef.current.add(handler);
  };

  const unsubscribe = (handler: MessageHandler) => {
    messageHandlersRef.current.delete(handler);
  };

  return (
    <WebSocketContext.Provider value={{ socket: socketRef.current, sendMessage, isConnected, subscribe, unsubscribe }}>
      {children}
    </WebSocketContext.Provider>
  );
};

export const useWebSocketContext = () => {
  const context = useContext(WebSocketContext);
  if (!context) throw new Error('useWebSocketContext must be used within WebSocketProvider');
  return context;
};
