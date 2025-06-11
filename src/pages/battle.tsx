import react from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import Home from "./home";
import "../assets/css/Battle.css"
import "../assets/css/Cards.css"

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
        <div>
            <h1>battle</h1>
            <button onClick={changePage}>go to result</button>

            <div class="canvas">
                <div class="battle-status">
                    敵：スライム (HP: 50) ｜ プレイヤー：勇者 (HP: 80)
                </div>
                <div class="characters">
                    <div class="character">スライム</div>
                    <div class="character">VS</div>
                    <div class="character">勇者</div>
                </div>
            </div>

            <div class="card-slider">
                <div class="arrow" onclick="scrollCards(-1)">&#8592;</div>
                <div class="cards-container" id="cardsContainer">
                    <div class="card" onclick="selectCard('たたかう')">たたかう</div>
                    <div class="card" onclick="selectCard('まほう')">まほう</div>
                    <div class="card" onclick="selectCard('アイテム')">アイテム</div>
                    <div class="card" onclick="selectCard('ぼうぎょ')">ぼうぎょ</div>
                    <div class="card" onclick="selectCard('にげる')">にげる</div>
                </div>
                <div class="arrow" onclick="scrollCards(1)">&#8594;</div>
            </div>

        </div>
    );
}

export default Battle;