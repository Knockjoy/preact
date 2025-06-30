import React, { createContext, useContext, useEffect, useState, useRef, Dispatch, SetStateAction } from "react"
import { useWebSocketContext } from "./WebSocketManager";

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
                    opponentCards: data["opponentcards"],
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
                    if (battle_log["game_status"] == "finish") {
                        battle.continue = false; return;
                    }
                    const player = data["players"]["player1"] == userid ? "player1" : "player2"
                    const opponent = player == "player1" ? "player2" : "player1"
                    console.log(player)
                    console.log(opponent)

                    const temp_history: (Battle.History.Skill | Battle.History.NextTurn | Battle.History.SysMsg)[] = battle_log["history"].map((item) => {
                        if (item["status"] == "skill") {
                            const temp_history_: Battle.History.Skill = {
                                "type": "BattleHistorySkill",
                                "msg": item["msg"],
                                "executor": item["executor"],
                                "target": item["target"],
                                "myCards": battle.myCards.map((item_, index) => {
                                    const temp_mycard: Card.MyCard = {
                                        ...item_,
                                        "skills": item_.skills.map((item__, index__) => {
                                            return {
                                                "ex": item__.ex,
                                                "lookturn": parseInt(item["cards"][player][index]["skillStatus"][index__]["lookturn"]),
                                                "name": item__.name,
                                                "nickname": item__.nickname,
                                                "target_exist": item__.target_exist,
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
                                        "name": item_.name,
                                        "id": item_.id,
                                        "img": item_.img,
                                        "userId": item_.userId,
                                        "username": item_.username,
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
                                                "ex": item__.ex,
                                                "lookturn": parseInt(item["cards"][player][index]["skillStatus"][index__]["lookturn"]),
                                                "name": item__.name,
                                                "nickname": item__.nickname,
                                                "target_exist": item__.target_exist,
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
                                        "name": item_.name,
                                        "id": item_.id,
                                        "img": item_.img,
                                        "userId": item_.userId,
                                        "username": item_.username,
                                        "hp": item["cards"][opponent][index]["charactorStatus"]["hp"]
                                    }
                                    return temp_opcard
                                }, [])
                            }
                            return temp_history_
                        }
                        if (item["status"] == "::nextturn::" || item["status"] == "::Confirmed::") {
                            return { "type": "BattleHistorySysMsg", "msg": item["msg"] } as Battle.History.SysMsg
                        }
                    }
                    )
                    setThisTurnHistory(temp_history)

                }
            }
        }
        subscribe(handler)
        return () => unsubscribe(handler)
    }, [subscribe, unsubscribe, myCards, battle, thisTurn])

    const setThisTurnHistory = (th: (Battle.History.Skill | Battle.History.NextTurn | Battle.History.SysMsg)[]) => {
        const newHistory:Battle.State={
            ...battle,
            thisTurnHistory:th
        }
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
            "role": data["cardstatus"]["role"]
        }
        setMyCards(prev => [...prev, temp_card])
    }
    const sendSkill = (turn: Battle.ThisTurn) => {
        sendMessage(JSON.stringify({
            "status": "set_skill",
            "userid": userid,
            "battleid": battle.id,
            "cardid": turn.card.id,
            "skillnum": turn.skill_num,
            "targetcardid": turn.card.id
        }))

    }
    const SetSkill = (card: Card.MyCard, skill_num: Number, target_card: Card.OpponentCard | Card.MyCard) => {
        const newtrun = {
            ...thisTurn,
            card,
            skill_num,
            target_card: target_card,
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