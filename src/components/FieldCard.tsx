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
  let { hp = 51 } = thisTurn?.card;
  let { attack = 52 } = thisTurn?.card;
  let { defence = 53 } = thisTurn?.card;
  let { speed = 54 } = thisTurn?.card;
  let { img = "" } = thisTurn?.card;
  let [role_, setRole] = useState("");

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
      className="app-container">
      <motion.div
        // whileHover={{ y: -10 }}
        className="polaroid-card" style={cardStyle}>
        <div className="image-container">
          {/* Placeholder SVG for the image */}
          <div className="image-placeholder">
            <img src={role_} className="typeIcon" alt="" />
            <img src={img} alt="" style={{ "width": "100%" }} />
            {/* 
            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16">
              <path d="M15 12V6a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1zM2 5a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1H2zm3.5-3.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zM9.496 7.422a.5.5 0 0 0-.8-.11l-3.23 2.923L2.5 7.644a.5.5 0 0 0-.646.002L.892 9.02a.5.5 0 0 0-.002.646L4 13.5l1.646-1.492a.5.5 0 0 0 .646-.002l3.23-2.923L13.108 14a.5.5 0 0 0 .798-.11l1.5-3a.5.5 0 0 0-.8-.11L13 9.422l-3.504-2.113z" />
            </svg> */}
          </div>
        </div>
        <div className="text-content">
          <span className="price">{name}</span>
          <div className="statusBox">
            <span className="status">HP </span>
            {/* <span>{hp}</span> */}
            <Bar width={100} widthp={90} point={hp} color='#A4DD00'></Bar>
          </div>
          <div className="statusBox">
            {/* <img src={sword} alt="" /> */}
            <span className="status">ATK </span>
            <span>{attack.toString()}</span>
            {/* <Bar width={100} color='#D84040'></Bar> */}

          </div>
          <div className="statusBox">
            {/* <img src={shield} alt="" /> */}
            <span className="status">DEF </span>
            <span>{defence.toString()}</span>
            {/* <Bar width={100}></Bar> */}

          </div>
          <div className="statusBox">
            <span className="status">SPD </span>
            <span>{speed.toString()}</span>
            {/* <Bar width={100} color='#0D92F4'></Bar> */}

          </div>
        </div>
      </motion.div>

    </motion.div>
  );
};

export default FieldCard;