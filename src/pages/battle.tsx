import React, { ReactNode, useState, useEffect, useContext, useRef } from "react";
import { data, Navigate, useLocation, useNavigate } from "react-router-dom";
import Home from "./home";
import "../assets/css/Battle.css"
import "../assets/css/Cards.css"
import Card from "../components/Card";
import Cardbox from "../components/CardBox";
import EnemyCard from "../components/EnemyCard";
import SmallCard from "../components/SmallCard";
import "../assets/fonts/Huninn.css"
// import { Card, Card, Show } from "@chakra-ui/react";
import { motion, animate, stagger } from "framer-motion";
import { useWebSocketContext } from "../components/WebSocketManager";
import { BattleManagerContext, useBattleManagerContext } from "../components/BattleManager";
import FieldCard from "../components/FieldCard";

const Battle = () => {

    const location = useLocation();
    const navigate = useNavigate()
    const { sendMessage, isConnected, subscribe, unsubscribe } = useWebSocketContext();
    const { userid, myCards: mycards, setThisTurn, battle, setBattle } = useContext(BattleManagerContext)
    // smallcardsに渡す用
    const [alltargetcards, setAlltargetcards] = useState<(Card.MyCard | Card.OpponentCard)[]>([]);
    // field card用
    const [fieldcardStatus, setFieldcardstatus] = useState(null);
    const [targetcard,setTargetcard]=useState<Card.MyCard|Card.OpponentCard|null>(null)

    const [intervalupdate, setIntervalUpdate] = useState(-1);
    const [historyIndex, setHistoryIndex] = useState(-1);
    const [gamefield_msg, setGamefield_msg] = useState("");
    const msgforward = useRef(true);
    const [screen, setScreen] = useState({
        "continue": true,
        "id": "",
        "myCards": [] as Card.MyCard[],
        "opponentCards": [] as Card.OpponentCard[],
        "myId": "",
        "opponentId": "",
        "thisTurnHistory": []
    } as Battle.State);
    useEffect(()=>{document.documentElement.requestFullscreen()},[])
    const [finishbattle, setFinishbattle] = useState(false);
    useEffect(() => { setScreen(battle) }, [])
    // useEffect(() => { setScreen(battle) }, [battle])
    // 画面遷移
    useEffect(() => {
        const changePage = () => {
            navigate("/result", { state: { frombutton: true } })
        };
        // if (!location.state?.frombutton) {
        //     return (<Navigate to={"/home"} replace />);
        // }
        if (!screen.continue) {
            changePage()
        }
    }, [screen.continue])


    useEffect(() => {
        console.log("bt log ")
        console.log(battle.thisTurnHistory)
        let plueTimes = 0;
        const interval = setInterval(() => {
            setIntervalUpdate(prev => {
                if (prev < battle.thisTurnHistory.length - 1) {
                    // update_ScreenWithhistory(battle.thisTurnHistory)
                    return prev + 1
                } else {
                    clearInterval(interval)
                    setFieldcardstatus(null)
                    setTargetcard(null)
                    // setBattle(screen)
                    setThisTurn({
                        "card": {} as Card.MyCard,
                        "set": false,
                        "skill_num": -1,
                        "targetCard": {} as Card.OpponentCard
                    } as Battle.ThisTurn);
                    return -1
                }
            });

        }, 1500);

    }, [battle.thisTurnHistory])

    useEffect(() => {
        if (intervalupdate === -1) {
            setGamefield_msg("")
            return
        }

        else {
            const log = battle.thisTurnHistory[intervalupdate]
            console.log(log)
            // TODO:Skill,nextTurn,::Confirmed::,::nextTurn::
            // console.log(log.msg)
            // setGamefield_msg(log.msg)
            switch (log.type) {
                case "BattleHistorySkill": {
                    let num = 0;
                    setGamefield_msg(log.msg[0].msg)
                    const skilllog: Battle.History.Skill = log
                    const newBT: Battle.State = {
                        ...battle,
                        "myCards": skilllog.myCards,
                        "opponentCards": skilllog.opponentCards
                    }
                    if(log.target.type=="op"){
                    setTargetcard(log.target);
                    }

                    setScreen(newBT)
                }; break;
                // case "BattleHistoryNextTurn": {
                //     const nextTurnlog: Battle.History.NextTurn = log
                //     const newBT: Battle.State = {
                //         ...battle,
                //         "myCards": nextTurnlog.myCards,
                //         "opponentCards": nextTurnlog.opponentCards
                //     }
                //     setScreen(newBT)
                // }; break;
                case "BattleHistorySysMsg": {
                    if(log.msg=="finish"){
                        setGamefield_msg(log.game_msg)
                    }
                    if (log.msg == "::confirmed::") {
                        const newBT: Battle.State = {
                            ...battle,
                            continue: false
                        };
                        setScreen(newBT);
                    }
                }
                    break;
            }
        }
    }, [intervalupdate])

    // 自動的にカードをまとめる
    useEffect(() => {
        console.log(battle)
        let cards: (Card.MyCard | Card.OpponentCard)[] = []
        cards = cards.concat(battle.myCards);
        cards = cards.concat(battle.opponentCards)
        console.log(cards)
        setAlltargetcards(cards);
    }, [battle.myCards, battle.opponentCards])

    const container = {
        hidden: {
            y: 200
        },
        show: {
            y: 0,
            transition: {
                duration: 0,
                staggerChildren: 0.1
            }
        }
    }


    const CardWrapper = ({ className, children }: { className?: string, children?: ReactNode }) => {
        return (
            <motion.div
                style={{ width: "100%", justifyContent: "space-evenly" }}
                // variants={container}
                // initial="hidden"
                // whileInView="show"
                className={`${className}`}
            >
                {children}
            </motion.div>
        );
    }

    const fieldCard = {
        width: "75%"
    }

    const enemyCardSize = 180;
    const myCardsize = 170;
    return (
        <div className="Battle huninn-regular">
            {/* <h1>battle</h1> */}
            {/* <button onClick={changePage}>go to result</button> */}
            <div className="BattleLeft">
                {/* <div>
                    <span>対戦相手の名前</span>
                    <span>thinking...</span>
                </div> */}
                <div className="card-slider" style={{ 'justifyContent': "space-evenly", width: "90%" }}>
                    {
                        screen.opponentCards.map((item) => (
                            <EnemyCard
                                cardSize={enemyCardSize}
                                img={item.img}
                                hp={item.hp}
                                name={item.name}
                                max={item.hpmax}
                            ></EnemyCard>
                        ))
                    }

                </div>
                <div className="battle-field">
                    <div className="Battle-fieldCard">
                        {/* TODO:thisturn系を監視 */}
                        <span style={{ display: "none" }}>Your Card</span>
                        <FieldCard
                            style={fieldCard}
                        // cardSize={250}
                        // style={{ width: 2 }}
                        // name={((thisTurn.card.name==null&&typeof thisTurn.card.name!="object")&&typeof thisTurn.card.name!="undefined")?thisTurn.card.name:""}
                        // img={((thisTurn.card.img!=null&&typeof thisTurn.card.img!="object")&&typeof thisTurn.card.img!="undefined")?thisTurn.card.img:""}
                        // types={((thisTurn.card.role!=null&&typeof thisTurn.card.role!="object")&&typeof thisTurn.card.role!="undefined")?thisTurn.card.role:""}
                        // hp={((thisTurn.card.hp!=null&&typeof thisTurn.card.hp!="object")&&typeof thisTurn.card.hp!="undefined")?thisTurn.card.hp:""}
                        // attack={((thisTurn.card.attack!=null&&typeof thisTurn.card.attack!="object")&&typeof thisTurn.card.attack!="undefined")?thisTurn.card.attack:""}
                        // defence={((thisTurn.card.defence!=null&&typeof thisTurn.card.defence!="object")&&typeof thisTurn.card.defence!="undefined")?thisTurn.card.defence:""}
                        // speed={((thisTurn.card.speed!=null&&typeof thisTurn.card.speed!="object")&&typeof thisTurn.card.speed!="undefined")?thisTurn.card.speed:""}
                        ></FieldCard>
                    </div>
                    <div className="battle-msgbox">
                        <div className="battle-msgVS">
                            <span>
                                VS
                                {/* <div className="arrow">&#8592;</div> */}
                            </span>
                        </div>
                        <div>
                            <span>{(screen.thisTurnHistory != null && intervalupdate != -1) ? gamefield_msg : ""}</span>
                            {/* <span>Aの攻撃！AはBにXXダメージを与えた</span> */}
                        </div>
                    </div>
                    <div className="Battle-fieldCard enemymenu">
                        <span style={{ display: "none" }}>Enemy's Card</span>
                        <Card
                            className={targetcard!=null?targetcard.name:""}
                            // cardSize={250}
                            // style={{ width: 2 }}
                            style={fieldCard}
                            type="?"
                            hp={targetcard!=null?targetcard.hp:-1}
                            attack="?"
                            defence="?"
                            speed="?"
                        ></Card>
                    </div>

                    {/* <Cardbox></Cardbox> */}
                </div>

                <div className="card-slider" style={{
                    height: "30vh",
                    width: "90%",
                    display: "flex",
                    'justifyContent': "space-between"
                }}>
                    {/* <div className="arrow" onclick="scrollCards(-1)">&#8592;</div> */}
                    <CardWrapper className="CardsSlider">
                        {screen.myCards.map((item) => (
                            <SmallCard
                                cardSize={myCardsize}
                                mycard={item}
                                targets={alltargetcards}
                            ></SmallCard>
                        ))}
                    </CardWrapper>
                </div>
            </div>

        </div >

    );
}

export default Battle;