import react, { ReactNode, useContext } from "react";
import { Navigate, Location, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { BattleManagerContext, useBattleManagerContext } from "../components/BattleManager";
import DrawingSmallCard from "../components/DrawingSmallCard";
import "../assets/css/result.css"
import "../assets/css/Home.css"

const Result = () => {
    const { battle } = useContext(BattleManagerContext)
    const location = useLocation();
    const navigate = useNavigate();
    const changePage = () => {
        navigate("/home");
        window.location.reload()
    };
    if (!location.state?.frombutton) {
        return <Navigate to="/home" replace />
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
    return (
        <div className="box">
            <div>
            <div style={{ fontSize: "2em" }}>
                遊んでいただきありがとうございました！
            </div>
<div>

</div>
            </div>
            <motion.div onClick={changePage}
                whileHover={{ y: 10 }}
                className="DrawingButton">ホームページに戻る</motion.div>
            <CardWrapper className="CardsSlider">
                {battle.myCards.map((item) => (<DrawingSmallCard
                    name={item.name}
                    hp={item.hp}
                    attack={item.attack}
                    defence={item.defence}
                    speed={item.speed}
                    types={item.role}
                    cardSize={150}
                    img={item.img}
                ></DrawingSmallCard>
                ))}
            </CardWrapper>
        </div>
    );
};

export default Result;