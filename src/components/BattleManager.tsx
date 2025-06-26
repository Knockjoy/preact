import React,{createContext,useContext,useEffect,useState,useRef} from "react"

export const BattleManagerContext=createContext(undefined);

export const BattleManagerProvider=({children})=>{
    const [userid,setUserid]=useState(null);
    const [battleid,setBattleid]=useState(null);
    const [mycards,setMycards]=useState([]);
    const [opponetcards,setOpponentcards]=useState([]);
    const [thisturnskillindex,setThisturnindex]=useState("");
    const [thisturntarget,setThisturntarget]=useState("");

    return (
        <BattleManagerContext.Provider value={{userid,setUserid,battleid,setBattleid,mycards,setMycards,opponetcards,setOpponentcards}}>
            {children}
        </BattleManagerContext.Provider>
    )
}

export const useBattleManagerContext = () => {
  const context = useContext(BattleManagerContext);
  if (!context) throw new Error('useWebSocketContext must be used within BattleManagerProvider');
  return context;
};