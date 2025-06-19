import react from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import Home from "./home";
import "../assets/css/Battle.css"
import "../assets/css/Cards.css"
import Card from "../components/Card.tsx";
import Cardbox from "../components/CardBox.tsx";
import EnemyCard from "../components/EnemyCard.tsx";

const Battle = () => {
    const location = useLocation();
    const navigate = useNavigate()
    const changePage = () => {
        navigate("/result", { state: { frombutton: true } })
    };
    if (!location.state?.frombutton) {
        return (<Navigate to={"/home"} replace />);
    }
    return (
        <div class="Battle">
            {/* <h1>battle</h1> */}
            {/* <button onClick={changePage}>go to result</button> */}
            <div className="BattleLeft">
                {/* <div>
                    <span>対戦相手の名前</span>
                    <span>thinking...</span>
                </div> */}
                <div className="card-slider">
                    <EnemyCard cardSize={200}></EnemyCard>
                    <EnemyCard></EnemyCard>
                    <EnemyCard></EnemyCard>
                    <EnemyCard></EnemyCard>
                    <EnemyCard></EnemyCard>

                </div>
                <div class="battle-field">
                    <Cardbox></Cardbox>
                </div>

                <div class="card-slider">
                    <div class="arrow" onclick="scrollCards(-1)">&#8592;</div>
                    <Card cardSize={200}></Card>
                    <Card cardSize={200}></Card>
                    <Card cardSize={200}></Card>
                    <Card cardSize={200}></Card>
                    <Card cardSize={200}></Card>

                    <div class="arrow" onclick="scrollCards(1)">&#8594;</div>
                </div>
            </div>
            <div class="BattleMenubox">
                <div className="BattleMenu">
                    <div>
                    <Card></Card>
                    <span>skill</span>
                    <div><span>skill1</span><div>説明文</div></div>
                    <div><span>skill2</span><div>説明文</div></div>
                    <div><span>skill3</span><div>説明文</div></div>
                    <div>target</div>
                    <div>決定</div>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default Battle;