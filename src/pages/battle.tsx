import react from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import Home from "./home";
import "../assets/css/Battle.css"
import "../assets/css/Cards.css"
import Card from "../components/Card.tsx";
import Cardbox from "../components/CardBox.tsx";
import EnemyCard from "../components/EnemyCard.tsx";
import arrow_drop_down_24dp_1F1F1F_FILL0_wght400_GRAD0_opsz24 from "../assets/icons/arrow_drop_down_24dp_1F1F1F_FILL0_wght400_GRAD0_opsz24.svg"

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
                    <div class="Battle-fieldCard">
                        <span>Your Card</span>
                        <Card cardSize={250}
                        style={{width:2}}
                        ></Card>
                    </div>
                    <div>VS</div>
                    <div class="Battle-fieldCard">
                        <span>Enemy's Card</span>
                        <Card
                            cardSize={250}
                            style={{width:2}}
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
                        <span>skills</span>
                        <div class="SkillButton" style={{background:"#95E1D3"}}><span class="SkillName">skill1</span><div>説明文</div></div>
                        <div class="SkillButton" style={{background:"#EAFFD0"}}><span class="SkillName">skill1</span><div>説明文</div></div>
                        <div class="SkillButton" style={{background:"#FCE38A"}}><span class="SkillName">skill2</span><div>説明文</div></div>
                        <div class="SkillButton" style={{background:"#F38181"}}><span class="SkillName">skill3</span><div>説明文</div></div>
                        <div class="TargetSelecter"><div><img src={arrow_drop_down_24dp_1F1F1F_FILL0_wght400_GRAD0_opsz24} alt="" /></div>target</div>
                        <div class="decision">決定</div>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default Battle;