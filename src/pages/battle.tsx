import React,{ReactNode} from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
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

const Battle = () => {
    // TODO:自動遷移
    //TODO:技選択、実行の実装
    //TODO:技を受けた時の実装
    //TODO:敵の画像と体力ロード
    // TODO:マインドコントロールの時はどう表示するのか
    const location = useLocation();
    const navigate = useNavigate()
    const changePage = () => {
        navigate("/result", { state: { frombutton: true } })
    };
    if (!location.state?.frombutton) {
        return (<Navigate to={"/home"} replace />);
    }
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


    const CardWrapper = ({className, children}:{className?:string,children?:ReactNode}) => {
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
                    <EnemyCard cardSize={enemyCardSize}></EnemyCard>
                    <EnemyCard cardSize={enemyCardSize}></EnemyCard>
                    <EnemyCard cardSize={enemyCardSize}></EnemyCard>
                    <EnemyCard cardSize={enemyCardSize}></EnemyCard>
                    <EnemyCard cardSize={enemyCardSize}></EnemyCard>

                </div>
                <div class="battle-field">
                    <div class="Battle-fieldCard">
                        <span>Your Card</span>
                        <Card cardSize={250}
                            style={{ width: 2 }}
                        ></Card>
                    </div>
                    <div>VS</div>
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
                    <div class="arrow" onclick="scrollCards(-1)">&#8592;</div>
                    <CardWrapper className="CardsSlider">
                        <SmallCard id={1} cardSize={myCardsize}></SmallCard>
                        <SmallCard id={2} cardSize={myCardsize}></SmallCard>
                        <SmallCard id={3} cardSize={myCardsize}></SmallCard>
                        <SmallCard id={4} cardSize={myCardsize}></SmallCard>
                        <SmallCard id={5} cardSize={myCardsize}></SmallCard>
                    </CardWrapper>
                    <div class="arrow" onclick="scrollCards(1)">&#8594;</div>
                </div>
            </div>

        </div >

    );
}

export default Battle;