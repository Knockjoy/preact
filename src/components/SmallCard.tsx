import React, { useState, useEffect, useRef, createRef } from 'react';
import { motion } from "framer-motion";
import "../assets/css/card.css";
import sports_mma_16dp_EECECD_FILL0_wght400_GRAD0_opsz20 from "../assets/icons/sports_mma_16dp_EECECD_FILL0_wght400_GRAD0_opsz20.svg";
import sword from "../assets/icons/sword.png";
import shield from "../assets/icons/shield (1).png";
import heart from "../assets/icons/heart.png";
import boots from "../assets/icons/boot.png";
import Card from '../components/Card.tsx';
import arrow_drop_down_24dp_1F1F1F_FILL0_wght400_GRAD0_opsz24 from "../assets/icons/arrow_drop_down_24dp_1F1F1F_FILL0_wght400_GRAD0_opsz24.svg";
import "../assets/css/smallCard.css";
import "../assets/css/Battle.css";

import styled from 'styled-components';
import science_16dp_48752C_FILL0_wght400_GRAD0_opsz20 from "../assets/icons/science_16dp_48752C_FILL0_wght400_GRAD0_opsz20.svg";
import shield_16dp_2854C5_FILL0_wght400_GRAD0_opsz20 from "../assets/icons/shield_16dp_2854C5_FILL0_wght400_GRAD0_opsz20.svg";
import sprint_16dp_2854C5_FILL0_wght400_GRAD0_opsz20 from "../assets/icons/sprint_16dp_2854C5_FILL0_wght400_GRAD0_opsz20.svg";
import star_shine_16dp_321D71_FILL0_wght400_GRAD0_opsz20 from "../assets/icons/star_shine_16dp_321D71_FILL0_wght400_GRAD0_opsz20.svg";
import question_mark_16dp_434343_FILL0_wght400_GRAD0_opsz20 from "../assets/icons/question_mark_16dp_434343_FILL0_wght400_GRAD0_opsz20.svg";
import close_16dp_000000_FILL0_wght400_GRAD0_opsz20 from "../assets/icons/close_16dp_000000_FILL0_wght400_GRAD0_opsz20.svg";
// Main App component
const SmallCard = (props) => {
  // Destructure cardSize from props, with a default of 'medium'
  const { cardSize = 300 } = props;
  const { name = "name" } = props;
  const { types = "Attack" } = props;
  const { hp = 51 } = props;
  const { attack = 52 } = props;
  const { defence = 53 } = props;
  const { speed = 54 } = props;
  const { id = -1 } = props;
  const { img = "" } = props;
  const { skills = [] } = props;
  const [role, setRole] = useState(null);
  const { targets = [] } = props;
  const targetselect = useRef<HTMLSelectElement>(null);


  // Define an inline style object to apply the dynamic max-width
  const cardStyle = {
    maxWidth: `${cardSize}px`,
  };
  useEffect(() => (console.log(targets)))

  const DetailMenu = styled.div`
  &#detailMenu${id}{
    // left: 50%;
    // top:50%;
    border:none;
    width:100vw;
    height:100vh;
    background:rgba(0,0,0,0.7);
    margin:0;
    padding:0;
    }
  `;

  useEffect(() => {
    if (types == "Attacker") {
      setRole(sports_mma_16dp_EECECD_FILL0_wght400_GRAD0_opsz20)
      return
    }
    if (types == "Guard") {
      setRole(shield_16dp_2854C5_FILL0_wght400_GRAD0_opsz20)
      return
    }
    if (types == "Healer") {
      setRole(science_16dp_48752C_FILL0_wght400_GRAD0_opsz20)
      return
    }
    if (types == "Speeder") {
      setRole(sprint_16dp_2854C5_FILL0_wght400_GRAD0_opsz20)
      return
    }
    if (types == "Magician") {
      setRole(star_shine_16dp_321D71_FILL0_wght400_GRAD0_opsz20)
      return
    }
    setRole(question_mark_16dp_434343_FILL0_wght400_GRAD0_opsz20)
  }, [types, setRole])
  const item = {
    hidden: {
      y: 15
    },
    show: {
      y: [15, 0],
      transition: {
        duration: 0.4,
        ease: "easeInOut"
      }
    }
  };

  const handleSendSkill = () => {
    const skill = document.querySelector<HTMLInputElement>("input[name='skill']:checked")?.value;
    const target = targetselect.current.value
    console.log(skill)
    console.log(targetselect.current.value)
    // TODO:thisturn系に登録
  };

  return (
    <motion.div
      variants={item}
      className="app-container" style={{ width: "20%" }}>
      <motion.button
        class="Mbutton polaroid-card"
        style={cardStyle}
        whileHover={{ y: -10 }}
        popovertarget={`detailMenu${id}`}
        popovertargetaction="show"
      >
        <div className="image-container">
          {/* Placeholder SVG for the image */}
          <div className="image-placeholder">
            <img src={role} class="typeIcon" alt="" />
            <img src={img} alt="" style={{ "width": "100%" }} />
            {/* <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16">
              <path d="M15 12V6a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1zM2 5a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1H2zm3.5-3.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zM9.496 7.422a.5.5 0 0 0-.8-.11l-3.23 2.923L2.5 7.644a.5.5 0 0 0-.646.002L.892 9.02a.5.5 0 0 0-.002.646L4 13.5l1.646-1.492a.5.5 0 0 0 .646-.002l3.23-2.923L13.108 14a.5.5 0 0 0 .798-.11l1.5-3a.5.5 0 0 0-.8-.11L13 9.422l-3.504-2.113z" />
            </svg> */}
          </div>
        </div>
        <div className="text-content smallName">
          <span class="name">{name}</span>
          <div style={{ "display": "flex" }}>
            <div style={{
              width: "50%",
              display: "flex",
              "flex-direction": "column",
              "align-items": "flex-start"
            }}>
              {/* TODO:数字と文字の間に空白 */}
              <div class="smallStatus" >
                <img src={heart} alt="" />
                <span>{hp}</span>
              </div>
              <div class="smallStatus">
                <img src={sword} alt="" />
                <span>{attack}</span>
              </div>
            </div>
            <div style={{
              width: "50%",
              display: "flex",
              "flex-direction": "column",
              "align-items": "flex-start"
            }}>
              <div class="smallStatus">
                <img src={shield} alt="" />
                <span>{defence}</span>
              </div>
              <div class="smallStatus">
                <img src={boots} alt="" />
                <span>{speed}</span>
              </div>
            </div>
          </div>
        </div>
      </motion.button>

      <DetailMenu class="BattleMenubox" id={`detailMenu${id}`} popover="auto">
        {/* <button
          popovertarget={`detailMenu${id}`}
          popovertargetaction="hidden"
          style={{ position: "absolute", width: "100vw", height: "100vh", "z-index": "0", "background": "none", padding: 0, margin: 0 }}>

        </button> */}
        <div className="detailMenu">
          <div className="BattleMenu">
            <div style={{
              "display": "flex",
              "flex-direction": " row-reverse"
            }}>
              <button
                popovertarget={`detailMenu${id}`}
                popovertargetaction="hidden"
                style={{
                  "background": "none",
                  "padding": "0",
                  "margin": "0",
                  "border": "0"
                }}
              >
                <img src={close_16dp_000000_FILL0_wght400_GRAD0_opsz20} alt="" style={{ scale: "2" }} />
              </button>
            </div>

            <Card
              name={name}
              types={types}
              hp={hp}
              attack={attack}
              defence={defence}
              speed={speed}
              img={img}
            ></Card>
            <span style={{ 'font-weight': "500", "font-size": "1.1em", "margin": "10px 0" }}>skills</span>
            <div class="skill_choice">
              {skills.map((item, index) => {
                return (
                  <div style={{ "display": "flex", "width": "100%" }}>
                    <input value={index} type="radio" name="skill" id={`radio-${id}-${index}`} />
                    <label class="SkillButton" id={`select-${id}-${index}`} for={`radio-${id}-${index}`}>{item["nickname"]}
                      <div style={{ "color": "#3e3e3e" }}>{item["ex"]}</div>
                    </label>
                  </div>
                );
              })}
            </div>
            <div class="select TargetSelecter">
              <select name="target" class="item" style={{ "width": "100%" }} ref={targetselect} >
                <option value="" style={{ "width": "100%" }}>targetを選択</option>
                {targets.map((item, index) => (
                  <option value={item[0]} style={{ "width": "100%" }}>{`${item[1]}`}</option>
                ))}
                <option value="aaa" style={{ "width": "100%" }}>aaa</option>

              </select>
              {/* <div class="TargetSelecter"><div><img src={arrow_drop_down_24dp_1F1F1F_FILL0_wght400_GRAD0_opsz24} alt="" /></div>target</div> */}

            </div>
            <button
              class="decision Mbutton"
              style={{ width: "100%" }}
              popovertarget={`detailMenu${id}`}
              popovertargetaction="hidden"
              onClick={handleSendSkill}
            >
              決定
            </button>

          </div>
        </div>
      </DetailMenu>
    </motion.div>
  );
};

export default SmallCard;