import "../assets/css/Rules.css"
import { useNavigate } from "react-router-dom";
import "../assets/fonts/Handlee.css"
import "../assets/fonts/ZenMaru.css"


const Rules = () => {
    const navigate = useNavigate();
    const changePage = () => {
        // ws.send("drawing");
        navigate("/usersettings", { state: { frombutton: true } })
    };
    return (
        <div class="box">
            <div class="RuleTitle"><span class="handlee-regular" style={{"font-weight":"550"}}>Rules</span><span>💡</span></div>
            <div class="ruleex zen-maru-gothic-regular">
                <span>このゲームは絵を描いて自分だけのカードを作成して、バトルをする新感覚ゲームです。</span>
                <br />
                <span>1. このゲームのカードには4つの役職のうちの一つが割り当てられます！</span>
                <div>
                    <div>
                        <span>アタッカー</span>
                    </div>
                    
                    <div>
                        <span>アタッカー</span>
                    </div>
                    <div>
                        <span>アタッカー</span>
                    </div>
                    <div>
                        <span>アタッカー</span>
                    </div>
                </div>
                <br />
                <span>2. このゲームのカードにはhp,アタック,ディフェンス,スピードの四つのステータスがあり、これらのステータスをもとにゲームが進行します。</span>
            </div>
            <div onClick={changePage}>
                理解した！
            </div>
        </div>
    );
}

export default Rules;