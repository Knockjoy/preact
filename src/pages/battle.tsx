import react from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import Home from "./home";
import "../assets/css/Battle.css"
import "../assets/css/Cards.css"
import Card from "../components/Card.tsx";
import Cardbox from "../components/CardBox.tsx";
import EnemyCard from "../components/EnemyCard.tsx";
import SmallCard from "../components/SmallCard.tsx";
import "../assets/fonts/Huninn.css"

const Battle = () => {
    const location = useLocation();
    const navigate = useNavigate()
    const changePage = () => {
        navigate("/result", { state: { frombutton: true } })
    };
    if (!location.state?.frombutton) {
        return (<Navigate to={"/home"} replace />);
    }
    const enemyCardSize=180;
    const myCardsize=200;
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

                <div class="card-slider">
                    <div class="arrow" onclick="scrollCards(-1)">&#8592;</div>
                    <SmallCard id={1}  cardSize={myCardsize}></SmallCard>
                    <SmallCard id={1}  cardSize={myCardsize}></SmallCard>
                    <SmallCard id={2}  cardSize={myCardsize}></SmallCard>
                    <SmallCard id={3}  cardSize={myCardsize}></SmallCard>
                    <SmallCard id={4}  cardSize={myCardsize}></SmallCard>
                    <SmallCard id={5}  cardSize={myCardsize}></SmallCard>

                    <div class="arrow" onclick="scrollCards(1)">&#8594;</div>
                </div>
            </div>
            
        </div>

    );
}

export default Battle;