// WebSocketContext.tsx
import React, { createContext, useContext, useRef, useEffect, useState } from 'react';
import { BattleManagerContext, useBattleManagerContext } from "./BattleManager"
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
  const socketRef = useRef<WebSocket|null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const messageHandlersRef = useRef<Set<MessageHandler>>(new Set())
  useEffect(() => {
    const uri=window.location.hostname
    const socket = new WebSocket(`ws://${uri}:19004/ws`);

    // const socket = new WebSocket(`ws://${uri}:19005/ws`);
    // const socket = new WebSocket(`ws://${uri}:55239/ws`);

    socketRef.current = socket;

    socket.onopen = () => { setIsConnected(true); sendMessage(JSON.stringify({ status: "::connect::" })); }
    socket.onclose = () => setIsConnected(false);
    socket.onerror = (e) => console.error(e);
    socket.onmessage = (e) => {
      if (!e.data.trim()) return;
      const data = JSON.parse(e.data);
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
