import "../assets/css/Rules.css"
import "../assets/css/Home.css"
import { useNavigate } from "react-router-dom";
import "../assets/fonts/Handlee.css"
import "../assets/fonts/ZenMaru.css"
import {motion} from "framer-motion"
import chevron_right_24dp_0F0F0F_FILL0_wght400_GRAD0_opsz24 from "../assets/icons/chevron_right_24dp_0F0F0F_FILL0_wght400_GRAD0_opsz24.svg"
import { Colors } from "../constants/Colors";


const Rules = () => {
    const navigate = useNavigate();
    const changePage = () => {
        // ws.send("drawing");
        navigate("/usersettings", { state: { frombutton: true } })
    };
    return (
        <div className="box">
            <div className="RuleTitle"><span className="handlee-regular" style={{ "fontWeight": "550" }}>Rules</span><span>💡</span></div>
            <div className="ruleex zen-maru-gothic-regular">
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
            <motion.div
                whileHover={{ y: 10 }}
                style={{display:"flex"}}
                color={Colors.light.text}
                className="DrawingButton huninn-regular" onClick={changePage}>
                理解した！
                    <img src={chevron_right_24dp_0F0F0F_FILL0_wght400_GRAD0_opsz24} alt="" />
            </motion.div>
        </div>
    );
}

export default Rules;