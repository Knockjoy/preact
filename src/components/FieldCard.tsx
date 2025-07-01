import React, { FC, useState, useEffect, useContext } from 'react';
import { AnimatePresence, m, motion, Variants } from "framer-motion";
import "../assets/css/card.css"
import sports_mma_16dp_EECECD_FILL0_wght400_GRAD0_opsz20 from "../assets/icons/sports_mma_16dp_EECECD_FILL0_wght400_GRAD0_opsz20.svg";
import sword from "../assets/icons/sword.png";
import shield from "../assets/icons/shield (1).png";
import Bar from "../components/Bar";
import science_16dp_48752C_FILL0_wght400_GRAD0_opsz20 from "../assets/icons/science_16dp_48752C_FILL0_wght400_GRAD0_opsz20.svg";
import shield_16dp_2854C5_FILL0_wght400_GRAD0_opsz20 from "../assets/icons/shield_16dp_2854C5_FILL0_wght400_GRAD0_opsz20.svg";
import sprint_16dp_2854C5_FILL0_wght400_GRAD0_opsz20 from "../assets/icons/sprint_16dp_2854C5_FILL0_wght400_GRAD0_opsz20.svg";
import star_shine_16dp_321D71_FILL0_wght400_GRAD0_opsz20 from "../assets/icons/star_shine_16dp_321D71_FILL0_wght400_GRAD0_opsz20.svg";
import question_mark_16dp_434343_FILL0_wght400_GRAD0_opsz20 from "../assets/icons/question_mark_16dp_434343_FILL0_wght400_GRAD0_opsz20.svg"
import { BattleManagerContext } from './BattleManager';


// Main App component
const FieldCard = (props) => {
  const { thisTurn ,battle} = useContext(BattleManagerContext)
  // Destructure cardSize from props, with a default of 'medium'
  let { cardSize = 300 } = props;
  let { name = "name" } = thisTurn?.card;
  let { role = "Attack" } = thisTurn?.card;
  let { hp = -1 } = thisTurn?.card;
  let { attack = -1 } = thisTurn?.card;
  let { defence = -1 } = thisTurn?.card;
  let { speed = -1 } = thisTurn?.card;
  let { img = "" } = thisTurn?.card;
  let {hpmax=100}=thisTurn?.card;
  let {className=""}=props;
  let {style}=props;
  let [role_, setRole] = useState("");
  const par=(hp/hpmax)*100<0?100:(hp/hpmax)*100

  useEffect(() => {
    if(thisTurn.set)
    hp=thisTurn.card.hp
    attack=thisTurn.card.attack
    defence=thisTurn.card.defence
    speed=thisTurn.card.speed
  }, [thisTurn.set,battle])

  useEffect(() => {
    if (role == "Attacker") {
      setRole(sports_mma_16dp_EECECD_FILL0_wght400_GRAD0_opsz20)
      return
    }
    if (role == "Guard") {
      setRole(shield_16dp_2854C5_FILL0_wght400_GRAD0_opsz20)
      return
    }
    if (role == "Healer") {
      setRole(science_16dp_48752C_FILL0_wght400_GRAD0_opsz20)
      return
    }
    if (role == "Speeder") {
      setRole(sprint_16dp_2854C5_FILL0_wght400_GRAD0_opsz20)
      return
    }
    if (role == "Magician") {
      setRole(star_shine_16dp_321D71_FILL0_wght400_GRAD0_opsz20)
      return
    }
    setRole(question_mark_16dp_434343_FILL0_wght400_GRAD0_opsz20)
  }, [role, setRole])


  // Define an inline style object to apply the dynamic max-width
  const cardStyle = {
    maxWidth: `${cardSize}px`,
  };
  const game_motion: Variants = {
    wait: {},
    receive: {
      transition: {
        duration: 0.05,
      },
      rotate: [5, 0, -5, 0, 5, 0, -5, 0, 5, 0, -5, 0,]
    },
    attack: {
      transition: {
        duration: 0.3,
      },
      x: [0, 15, 30, 0],
      y: [0, -15, 0, 0,]
    }
  };

  const [motionState, setMotionState] = useState("wait");

  useEffect(() => {
    if (motionState != "wait") {
      setMotionState("wait")
    }
  }, [motionState])
  return (
    <motion.div
      variants={game_motion}
      initial="wait"
      animate={motionState}
      // animate="attack_motion"
      style={style}
      className={`app-container ${className}`}>
      <motion.div
        // whileHover={{ y: -10 }}
        className="polaroid-card" style={cardStyle}>
        <div className="image-container">
          <div className="image-placeholder">
            <img src={role_} className="typeIcon" alt="" />
            <img src={img} alt="" style={{ "width": "100%" }} />
          </div>
        </div>
        <div className="text-content">
          <span className="price">{name}</span>
          <div className="statusBox">
            <span className="status">HP </span>
            {/* <span>{hp}</span> */}
            <Bar width={par} widthp={90} point={hp} color='#A4DD00'></Bar>
          </div>
          <div className="statusBox">
            {/* <img src={sword} alt="" /> */}
            <span className="status">ATK </span>
            <span>{attack>0?attack.toString():"-"}</span>
            {/* <Bar width={100} color='#D84040'></Bar> */}

          </div>
          <div className="statusBox">
            {/* <img src={shield} alt="" /> */}
            <span className="status">DEF </span>
            <span>{defence>0?defence.toString():"-"}</span>
            {/* <Bar width={100}></Bar> */}

          </div>
          <div className="statusBox">
            <span className="status">SPD </span>
            <span>{speed>0?speed.toString():"-"}</span>
            {/* <Bar width={100} color='#0D92F4'></Bar> */}

          </div>
        </div>
      </motion.div>

    </motion.div>
  );
};

export default FieldCard;