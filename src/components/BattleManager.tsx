import React, { createContext, useContext, useEffect, useState, useRef } from "react"

export const BattleManagerContext = createContext(undefined);

export const BattleManagerProvider = ({ children }) => {
    const [userid, setUserid] = useState(null);
    const [battleid, setBattleid] = useState(null);
    const [mycards, setMycards] = useState([]);
    const [opponetcards, setOpponentcards] = useState([]);
    const [thisturnskillindex, setThisturnskillindex] = useState("");
    const [thisturntarget, setThisturntarget] = useState("");
    const [thisturn,setThisturn]=useState(false);
    const [thisturncard,setThisturncard]=useState(false);


    return (
        <BattleManagerContext.Provider value={{
            userid,
            setUserid,
            battleid,
            setBattleid,
            mycards,
            setMycards,
            opponetcards,
            setOpponentcards,
            thisturnskillindex,
            setThisturnskillindex,
            thisturntarget,
            setThisturntarget,
            setThisturn,
            thisturn,
            setThisturncard,
            thisturncard

        }}>
            {children}
        </BattleManagerContext.Provider>
    )
}

export const useBattleManagerContext = () => {
    const context = useContext(BattleManagerContext);
    if (!context) throw new Error('useWebSocketContext must be used within BattleManagerProvider');
    return context;
};