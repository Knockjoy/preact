import React, { ReactNode, useState, useEffect } from "../../node_modules/react";
import { data, Navigate, useLocation, useNavigate } from "react-router-dom";
import Home from "./home";
import "../assets/css/Battle.css"
import "../assets/css/Cards.css"
import Card from "../components/Card.tsx";
import Cardbox from "../components/CardBox.tsx";
import EnemyCard from "../components/EnemyCard.tsx";
import SmallCard from "../components/SmallCard.tsx";
import "../assets/fonts/Huninn.css"
import { Show } from "@chakra-ui/react";
import { motion, animate, stagger } from "framer-motion";
import { useWebSocketContext } from "../components/WebSocketManager.tsx";
import { useBattleManagerContext } from "../components/BattleManager.tsx";

const Battle = () => {
    //TODO:技を受けた時の実装
    const location = useLocation();
    const navigate = useNavigate()
    const { sendMessage, isConnected, subscribe, unsubscribe } = useWebSocketContext();
    const { userid, battleid, mycards, opponetcards, thisturn, thisturncard, thisturnskillindex, thisturntarget, game_continue, thisturnHistory } = useBattleManagerContext();
    // 敵カード
    const [battleopponetcards, setBattleOpponentcards] = useState([]);
    // myカード
    const [battlemycards, setBattleMycards] = useState([]);
    // smallcardsに渡す用
    const [alltargetcards, setAlltargetcards] = useState([]);
    // field card用
    const [fieldcardStatus, setFieldcardstatus] = useState(null);

    const [gamefield_msgindex, setGamefield_msgindex] = useState(-1);
    const [gamefield_msg, setGamefield_msg] = useState("");

    // 画面遷移
    useEffect(() => {
        const changePage = () => {
            navigate("/result", { state: { frombutton: true } })
        };
        if (!location.state?.frombutton) {
            return (<Navigate to={"/home"} replace />);
        }
        if (!game_continue) {
            changePage()
        }
    }, [game_continue])

    // 技送信
    useEffect(() => {
        if (thisturn && isConnected) {
            setFieldcardstatus(thisturncard)

            sendMessage(JSON.stringify({
                "status": "set_skill",
                "userid": userid,
                "battleid": battleid,
                "cardid": thisturncard.id,
                "skillnum": thisturnskillindex,
                "targetcardid": thisturntarget
            }))
        }
    }, [thisturn])



    useEffect(() => {
        const interval = setInterval(() => {
            setGamefield_msgindex(prev => {
                if (prev < thisturnHistory.length - 1) {
                    return prev + 1
                } else {
                    clearInterval(interval)
                    setFieldcardstatus(null)

                    return -1
                }
            });
            // setGamefield_msg(prev=>{
            //     if(prev<thisturnHistory.length-1 && thisturnHistory!=null){
            //         return thisturnHistory[prev+1]["msg"]
            //     }else{
            //         clearInterval(interval)
            //         setFieldcardstatus(null)

            //         return ""
            //     }
            // })
        }, 1000);

    }, [thisturnHistory])
    useEffect(() => {
        if (gamefield_msgindex === -1) {
            setGamefield_msg("")
            return
        }
        console.log(thisturnHistory[gamefield_msgindex]["msg"])
        setGamefield_msg(thisturnHistory[gamefield_msgindex]["msg"])
    }, [gamefield_msgindex])

    // 自分のカードと相手のカードの画面更新
    useEffect(() => {
        setBattleOpponentcards(opponetcards[1])
        setBattleMycards(mycards)

        // setAllcards(battlemycards.concat(battleopponetcards))
    }, [mycards, opponetcards])

    // 自動的にカードをまとめる
    useEffect(() => {
        const cards: any[] = []
        for (let i = 0; i < battlemycards.length; i++) {
            const card = battlemycards[i]
            cards.push([card["id"], card["name"], "my"])
        }
        for (let i = 0; i < battleopponetcards.length; i++) {
            const card = battleopponetcards[i]
            console.log(card["cardid"])
            if (typeof card["cardid"] == "string") {
                cards.push([card["cardid"], card["charaname"], "op"])
            } else {
                cards.push([card["cardid"].toString(), card["charaname"], "op"])
            }
        }
        setAlltargetcards(cards);
    }, [battlemycards, battleopponetcards])

    useEffect(() => {
        if(gamefield_msgindex){
            return
        }
        console.log(battleopponetcards)
        const opcard: any[] = [...battleopponetcards]
        opcard.map((item, index) => {
            console.log(item)
            console.log(thisturnHistory[gamefield_msgindex]["cards"]["player2"][index]["charactorStatus"]["hp"])
            item["hp"] = thisturnHistory[gamefield_msgindex]["cards"]["player2"][index]["charactorStatus"]["hp"]
        })
        console.log(opcard)
        setBattleOpponentcards(opcard)
        // gamefield_msg=thisturnHistory[i][]
    }, [gamefield_msgindex])

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
                variants={container}
                initial="hidden"
                whileInView="show"
                className={`${className}`}
            >
                {children}
            </motion.div>
        );
    }

    const enemyCardSize = 180;
    const myCardsize = 200;
    return (
        <div class="Battle huninn-regular">
            {/* <h1>battle</h1> */}
            {/* <button onClick={changePage}>go to result</button> */}
            <div className="BattleLeft">
                {/* <div>
                    <span>対戦相手の名前</span>
                    <span>thinking...</span>
                </div> */}
                <div className="card-slider" style={{ "justify-content": "space-evenly" }}>
                    {
                        battleopponetcards.map((item, index) => (
                            <EnemyCard
                                cardSize={enemyCardSize}
                                img={item["img"]}
                                hp={item["hp"]}
                                name={item["charaname"]}
                            ></EnemyCard>
                        ))
                    }

                </div>
                <div class="battle-field">
                    <div class="Battle-fieldCard">
                        {/* TODO:thisturn系を監視 */}
                        <span>Your Card</span>
                        <Card cardSize={250}
                            style={{ width: 2 }}
                            name={(fieldcardStatus != null) ? fieldcardStatus.name : ""}
                            types={fieldcardStatus != null ? fieldcardStatus.status["role"] : ""}
                            hp={fieldcardStatus != null ? fieldcardStatus.status["hp"] : ""}
                            attack={fieldcardStatus != null ? fieldcardStatus.status["attack"] : ""}
                            defence={fieldcardStatus != null ? fieldcardStatus.status["defence"] : ""}
                            speed={fieldcardStatus != null ? fieldcardStatus.status["speed"] : ""}
                            img={fieldcardStatus != null ? fieldcardStatus.sketch : ""}
                        ></Card>
                    </div>
                    <div class="battle-msgbox">
                        <div class="battle-msgVS">
                            <span>
                                VS
                                {/* <div class="arrow">&#8592;</div> */}
                            </span>
                        </div>
                        <div>
                            <span>{(thisturnHistory != null && gamefield_msgindex != -1) ? thisturnHistory[gamefield_msgindex]["msg"] : ""}</span>
                            {/* <span>Aの攻撃！AはBにXXダメージを与えた</span> */}
                        </div>
                    </div>
                    <div class="Battle-fieldCard enemymenu">
                        <span>Enemy's Card</span>
                        <Card
                            cardSize={250}
                            style={{ width: 2 }}
                            type="?"
                            // hp="?"
                            attack="?"
                            defence="?"
                            speed="?"
                        ></Card>
                    </div>

                    {/* <Cardbox></Cardbox> */}
                </div>

                <div class="card-slider" style={{
                    height: "30vh",
                    display: "flex",
                    "justify-content": "space-between"
                }}>
                    {/* <div class="arrow" onclick="scrollCards(-1)">&#8592;</div> */}
                    <CardWrapper className="CardsSlider">
                        {battlemycards.map((item, index) => (
                            <SmallCard
                                mycard={item}
                                id={item.id}
                                name={item.name}
                                img={item.sketch}
                                hp={item.status["hp"]}
                                attack={item.status["attack"]}
                                defence={item.status["defence"]}
                                speed={item.status["speed"]}
                                types={item.status["role"]}
                                cardSize={myCardsize}
                                skills={item.status["skills"]}
                                targets={alltargetcards}
                                nouse={thisturn}
                            ></SmallCard>
                        ))}
                        {/* <SmallCard id={1} cardSize={myCardsize}></SmallCard>
                        <SmallCard id={2} cardSize={myCardsize}></SmallCard>
                        <SmallCard id={3} cardSize={myCardsize}></SmallCard>
                        <SmallCard id={4} cardSize={myCardsize}></SmallCard>
                        <SmallCard id={5} cardSize={myCardsize}></SmallCard> */}
                    </CardWrapper>
                    {/* <div class="arrow" onclick="scrollCards(1)">&#8594;</div */}
                </div>
            </div>

        </div >

    );
}

export default Battle;