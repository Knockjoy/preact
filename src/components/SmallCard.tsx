import React from 'react';
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
import { Button } from '@chakra-ui/react';

// Main App component
const SmallCard = (props) => {
  // Destructure cardSize from props, with a default of 'medium'
  const { cardSize = 300 } = props;
  const { name = "name" } = props;
  const { type = "Attack" } = props;
  const { hp = 51 } = props;
  const { attack = 52 } = props;
  const { defence = 53 } = props;
  const { speed = 54 } = props;
  const { id = -1 } = props;

  // Define an inline style object to apply the dynamic max-width
  const cardStyle = {
    maxWidth: `${cardSize}px`,
  };

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
            <img src={sports_mma_16dp_EECECD_FILL0_wght400_GRAD0_opsz20} class="typeIcon" alt="" />

            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16">
              <path d="M15 12V6a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1zM2 5a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1H2zm3.5-3.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zM9.496 7.422a.5.5 0 0 0-.8-.11l-3.23 2.923L2.5 7.644a.5.5 0 0 0-.646.002L.892 9.02a.5.5 0 0 0-.002.646L4 13.5l1.646-1.492a.5.5 0 0 0 .646-.002l3.23-2.923L13.108 14a.5.5 0 0 0 .798-.11l1.5-3a.5.5 0 0 0-.8-.11L13 9.422l-3.504-2.113z" />
            </svg>
          </div>
        </div>
        <div className="text-content smallName">
          <span class="name">{name}</span>
          <div class="smallStatus">
            <img src={heart} alt="" />
            <span>{hp}</span>
          </div>
          <div class="smallStatus">
            <img src={sword} alt="" />
            <span>{attack}</span>
          </div>
          <div class="smallStatus">
            <img src={shield} alt="" />
            <span>{defence}</span>
          </div>
          <div class="smallStatus">
            <img src={boots} alt="" />
            <span>{speed}</span>
          </div>
        </div>
      </motion.button>

      <DetailMenu class="BattleMenubox" id={`detailMenu${id}`} popover="auto">
        <button 
        popovertarget={`detailMenu${id}`}
        popovertargetaction="hidden"
        style={{position:"absolute",width:"100vw",height:"100vh","z-index":"0","background":"none",padding:0,margin:0}}>

        </button>
        <div className="detailMenu">
          <div className="BattleMenu">
            <Card></Card>
            <span style={{ 'font-weight': "500", "font-size": "1.1em", "margin": "10px 0" }}>skills</span>
            <div>
              <input type="radio" name="skill" id="SelectSkill1" checked />
              {/* <div class="SkillButton" style={{ background: "#95E1D3" }}> */}
              <div class="SkillButton" style={{ background: "#eeeeee" }}>

                <span class="SkillName">skill1</span>
                <div>説明文</div></div>
              <input type="radio" name="skill" id="SelectSkill2" />
              {/* <div class="SkillButton" style={{ background: "#EAFFD0" }}> */}
              <div class="SkillButton" style={{ background: "#eeeeee" }}>

                <span class="SkillName">skill1</span>
                <div>説明文</div>
              </div>
              <input type="radio" name="skill" id="SelectSkill3" />
              {/* <div class="SkillButton" style={{ background: "#FCE38A" }}> */}
              <div class="SkillButton" style={{ background: "#eeeeee" }}>

                <span class="SkillName">skill2</span>
                <div>説明文</div>
              </div>
              <input type="radio" name="skill" id="SelectSkill4" />
              {/* <div class="SkillButton" style={{ background: "#F38181" }}> */}
              <div class="SkillButton" style={{ background: "#eeeeee" }}>

                <span class="SkillName">skill3</span>
                <div>説明文</div>
              </div>
            </div>
            <div>

              <div class="TargetSelecter"><div><img src={arrow_drop_down_24dp_1F1F1F_FILL0_wght400_GRAD0_opsz24} alt="" /></div>target</div>
              <button class="decision Mbutton" style={{width:"100%"}} popovertarget={`detailMenu${id}`} popovertargetaction="hidden">決定</button>

            </div>
          </div>
        </div>
      </DetailMenu>
    </motion.div>
  );
};

export default SmallCard;