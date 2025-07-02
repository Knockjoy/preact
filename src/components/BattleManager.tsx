import React, { createContext, useContext, useEffect, useState, useRef, Dispatch, SetStateAction } from "react"
import { useWebSocketContext } from "./WebSocketManager";
import Card from "./Card";

export const BattleManagerContext = createContext({} as {
    userid: String;
    myCards: Card.MyCard[];
    battle: Battle.State;
    thisTurnSkillIndex: number;
    setThisTurnSkillIndex: Dispatch<SetStateAction<number>>;
    thisTurn: Battle.ThisTurn,
    setThisTurn: Dispatch<SetStateAction<Battle.ThisTurn>>;
    SetSkill: (card: Card.MyCard, skill_num: Number, target_card: Card.OpponentCard | Card.MyCard) => void;
    battle_in;
    setBattle: Dispatch<SetStateAction<Battle.State>>;
});


export const BattleManagerProvider = ({ children }) => {

    const { sendMessage, isConnected, subscribe, unsubscribe } = useWebSocketContext();

    const [userid, setUserid] = useState("");
    const [myCards, setMyCards] = useState<Card.MyCard[]>([]);
    const [thisTurnSkillIndex, setThisTurnSkillIndex] = useState(-1);
    const [thisTurn, setThisTurn] = useState<Battle.ThisTurn>({
        "card": {} as Card.MyCard,
        "set": false,
        "skill_num": -1,
        "targetCard": {} as Card.OpponentCard
    } as Battle.ThisTurn);

    const [battle, setBattle] = useState<Battle.State>({} as Battle.State);
    // init
    useEffect(() => {
        const cards: Card.MyCard[] = [...myCards]
        const handler = (e) => {
            const data = e
            const status = data["status"]
            console.log("receive:")
            console.log(data)
            if (status == "firstConnect") {
                setUserid(data["userid"]);
            }
            if (status == "cardCreated" && data["createStatus"] == "success") {

                createCard(data)
            }
            if (status == "match_found") {
                const btinfo: Battle.State = {
                    id: data["battleid"],
                    myId: userid,
                    myCards: myCards,
                    opponentCards: data["opponentcards"].map((item) => ({
                        ...item,
                        hpmax: item["hp"],
                        type: "op"
                    } as Card.OpponentCard)),
                    opponentId: data["opponent"],
                    thisTurnHistory: [],
                    continue: true
                }
                console.log(btinfo)
                setBattle(btinfo)
            }
            if (status == "exec_battle") {
                if (data["msg"] == "success") {
                    const battle_log = data["battle_log"];
                    const player = data["players"]["player1"] == userid ? "player1" : "player2"
                    const opponent = player == "player1" ? "player2" : "player1"
                    // if (battle_log["game_status"] == "finish") {
                    //     battle.continue = false; 
                    //     const temp_history=createHistory(battle_log["history"])
                    //     return;
                    // }
                    // if (battle_log["game_status"] == "finish") {
                    //     const temp_battle = {
                    //         ...battle,
                    //         continue: false
                    //     }
                    //     setBattle(temp_battle)
                    // }

                    console.log(player)
                    console.log(opponent)

                    const temp_history: (Battle.History.Skill | Battle.History.NextTurn | Battle.History.SysMsg)[] = createHistory(battle_log["history"], player, opponent)
                    // if (battle_log["game_status"]=="finish"){
                    //     temp_history.push({"type":"BattleHistorySysMsg","msg":battle_log["game_status"],"game_msg":battle_log["msg"]} as Battle.History.SysMsg)
                    // }
                    setThisTurnHistory(temp_history)

                }
            }
        }
        subscribe(handler)
        return () => unsubscribe(handler)
    }, [subscribe, unsubscribe, myCards, battle, thisTurn])

    const createHistory = (historydata, player: string, opponent: string): (Battle.History.Skill | Battle.History.NextTurn | Battle.History.SysMsg)[] => {
        return historydata.map((item) => {
            if (item["status"] == "skill") {
                const temp_history_: Battle.History.Skill = {
                    "type": "BattleHistorySkill",
                    "msg": item["msg"].map((item) => ({ "msg": item["msg"], "motion": item["motion"]["motion"], "target": item["motion"]["target"] } as TurnMsg)),
                    "executor": item["executor"],
                    "target": item["target"],
                    "myCards": battle.myCards.map((item_, index) => {
                        const temp_mycard: Card.MyCard = {
                            ...item_,
                            "skills": item_.skills.map((item__, index__) => {
                                return {
                                    ...item__,
                                    "lookturn": parseInt(item["cards"][player][index]["skillStatus"][index__]["lookturn"]),
                                    "useTimes": item["cards"][player][index]["skillStatus"][index__]["usetimes"],
                                    "nowlooktime": item["cards"][player][index]["skillStatus"][index__]["nowlooktime"]
                                } as Card.Skill
                            }),
                            "hp": item["cards"][player][index]["charactorStatus"]["hp"],
                            "attack": item["cards"][player][index]["charactorStatus"]["attack"],
                            "defence": item["cards"][player][index]["charactorStatus"]["defence"],
                            "speed": item["cards"][player][index]["charactorStatus"]["speed"],
                        }
                        return temp_mycard
                    }),
                    "opponentCards": battle.opponentCards.map((item_, index_) => {
                        const temp_opcard: Card.OpponentCard = {
                            ...item_,
                            "hp": item["cards"][opponent][index_]["charactorStatus"]["hp"]
                        }
                        return temp_opcard
                    }, [])
                }
                return temp_history_
            }
            if (item["status"] == "nextTurn") {
                const temp_history_: Battle.History.NextTurn = {
                    "type": "BattleHistoryNextTurn",
                    "msg": item["msg"],
                    "target": item["target"],
                    "myCards": battle.myCards.map((item_, index) => {
                        const temp_mycard: Card.MyCard = {
                            ...item_,
                            "skills": item_.skills.map((item__, index__) => {
                                return {
                                    ...item__,
                                    "lookturn": parseInt(item["cards"][player][index]["skillStatus"][index__]["lookturn"]),
                                    "useTimes": item["cards"][player][index]["skillStatus"][index__]["usetimes"],
                                    "nowlooktime": item["cards"][player][index]["skillStatus"][index__]["nowlooktime"]
                                } as Card.Skill
                            }),
                            "hp": item["cards"][player][index]["charactorStatus"]["hp"],
                            "attack": item["cards"][player][index]["charactorStatus"]["attack"],
                            "defence": item["cards"][player][index]["charactorStatus"]["defence"],
                            "speed": item["cards"][player][index]["charactorStatus"]["speed"],
                        }
                        return temp_mycard
                    }),
                    "opponentCards": battle.opponentCards.map((item_, index) => {
                        const temp_opcard: Card.OpponentCard = {
                            ...item_,
                            "hp": item["cards"][opponent][index]["charactorStatus"]["hp"]
                        }
                        return temp_opcard
                    }, [])
                }
                return temp_history_
            }
            if (item["status"] == "::nextturn::" || item["status"] == "::Confirmed::"||item["status"]=="::finish::") {
                return {
                    "type": "BattleHistorySysMsg",
                    "msg": item["status"],
                    "game_msg":item["msg"]["gamefinish"]
                } as Battle.History.SysMsg
            }
        }
        )
    }

    const setThisTurnHistory = (th: (Battle.History.Skill | Battle.History.NextTurn | Battle.History.SysMsg)[]) => {
        const newHistory: Battle.State = {
            ...battle,
            thisTurnHistory: th
        }
        console.log(newHistory)
        setBattle(newHistory)
    }

    const createCard = (data) => {
        const temp_card: Card.MyCard = {
            "id": data["cardid"],
            "name": data["charaname"],
            "img": data["sketch"],
            "hp": data["cardstatus"]["hp"],
            "attack": data["cardstatus"]["attack"],
            "defence": data["cardstatus"]["defence"],
            "speed": data["cardstatus"]["speed"],
            "skills": data["cardstatus"]["skills"],
            "role": data["cardstatus"]["role"],
            "hpmax": data["cardstatus"]["hp"],
            "type": "my"
        }
        setMyCards(prev => [...prev, temp_card])
    }
    const sendSkill = (turn: Battle.ThisTurn) => {
        console.log(turn)
        sendMessage(JSON.stringify({
            "status": "set_skill",
            "userid": userid,
            "battleid": battle.id,
            "cardid": turn.card.id,
            "skillnum": turn.skill_num,
            "targetcardid": turn.targetCard.id
        }))

    }
    const SetSkill = (card: Card.MyCard, skill_num: Number, target_card: Card.OpponentCard | Card.MyCard) => {
        const newtrun = {
            ...thisTurn,
            card,
            skill_num,
            "targetCard": target_card,
            set: true
        };

        setThisTurn(newtrun)
        console.log("set skill")

        sendSkill(newtrun)
    }
    useEffect(() => console.log("update thisTurn"), [thisTurn])
    const battle_in = () => {
        sendMessage(JSON.stringify({
            "status": "battle_in",
            "cardids": myCards.map((item) => item.id),
            "userid": userid,
        }))
    }

    return (
        <BattleManagerContext.Provider value={{
            userid: userid,
            myCards: myCards,
            thisTurnSkillIndex: thisTurnSkillIndex,
            setThisTurnSkillIndex: setThisTurnSkillIndex,
            setThisTurn: setThisTurn,
            thisTurn: thisTurn,
            battle: battle,
            SetSkill: SetSkill,
            battle_in: battle_in,
            setBattle
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