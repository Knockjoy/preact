import React, { createContext, useContext, useEffect, useState, useRef } from "../../node_modules/react"
import { useWebSocketContext } from "./WebSocketManager";


export const BattleManagerContext = createContext(undefined);


export const BattleManagerProvider = ({ children }) => {

    const { sendMessage, isConnected, subscribe, unsubscribe } = useWebSocketContext();

    const [userid, setUserid] = useState(null);
    const [battleid, setBattleid] = useState(null);
    const [mycards, setMycards] = useState([]);
    const [opponetcards, setOpponentcards] = useState([]);
    const [thisturnskillindex, setThisturnskillindex] = useState("");
    const [thisturntarget, setThisturntarget] = useState("");
    const [thisturn, setThisturn] = useState(false);
    const [thisturncard, setThisturncard] = useState(false);
    const [game_continue, setGame_continue] = useState(true);
    const [thisturnHistory, setThisturnHistory] = useState([]);

    // TODO:型
    const [battle,setBattle]=useState<Battle.State|null>(null);
    useEffect(() => {
        const handler = (e) => {
            const data = e
            const status = data["status"]
            if (status == "firstConnect") {
                setUserid(data["userid"]);
            }
            if (status == "match_found") {
                const btinfo:Battle.State={
                    id:data["battleid"],
                    myId:userid,
                    myCards:mycards,
                    opponentCards:data["opponentcards"],
                    opponentId:data["opponent"],
                    thisTurnHistory:[]
                }
                setBattle(btinfo)
            }
            if (status == "exec_battle") {
                if (data["msg"] == "success") {
                    const battle_log = data["battle_log"];
                    if (battle_log["game_status"] == "finish") {
                        setGame_continue(false); return;
                    }
                    setThisturnHistory(battle_log["history"])
                }
            }
            setThisturnskillindex(null)
            setThisturntarget(null)
            setThisturn(false)
            setThisturncard(null)
        }
    
    subscribe(handler)
    return()=>unsubscribe(handler)
    }, [subscribe, unsubscribe])

    const SetSkill=()=>{
        sendMessage(JSON.stringify({
            "status":"set_skill",
            "userid":userid,
            "battleid":battle
        }))
    }

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
            thisturncard,
            game_continue,
            setGame_continue,
            setThisturnHistory,
            thisturnHistory,
            battle
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