import React, { useState, useEffect } from 'react';
import { motion, Variants } from "framer-motion";
import "../assets/css/card.css";
import sports_mma_16dp_EECECD_FILL0_wght400_GRAD0_opsz20 from "../assets/icons/sports_mma_16dp_BB271A_FILL0_wght400_GRAD0_opsz20.svg";
import shield_16dp_2854C5_FILL0_wght400_GRAD0_opsz20 from "../assets/icons/shield_16dp_2854C5_FILL0_wght400_GRAD0_opsz20.svg";
import science_16dp_48752C_FILL0_wght400_GRAD0_opsz20 from "../assets/icons/science_16dp_48752C_FILL0_wght400_GRAD0_opsz20.svg";
import sprint_16dp_2854C5_FILL0_wght400_GRAD0_opsz20 from "../assets/icons/sprint_16dp_2854C5_FILL0_wght400_GRAD0_opsz20.svg";
import star_shine_16dp_321D71_FILL0_wght400_GRAD0_opsz20 from "../assets/icons/star_shine_16dp_321D71_FILL0_wght400_GRAD0_opsz20.svg";


import sword from "../assets/icons/sword.png";
import shield from "../assets/icons/shield (1).png";
import heart from "../assets/icons/heart.png";
import boots from "../assets/icons/boot.png";
import Card from '../components/Card';
import arrow_drop_down_24dp_1F1F1F_FILL0_wght400_GRAD0_opsz24 from "../assets/icons/arrow_drop_down_24dp_1F1F1F_FILL0_wght400_GRAD0_opsz24.svg";
import "../assets/css/smallCard.css";
import "../assets/css/Battle.css";

import styled from 'styled-components';
import { Button } from '@chakra-ui/react';

// Main App component
const DrawingSmallCard = (props) => {
  // Destructure cardSize from props, with a default of 'medium'
  const { cardSize = 300 } = props;
  const { name = "name" } = props;
  const { types = "Attack" } = props;
  const { hp = 51 } = props;
  const { attack = 52 } = props;
  const { defence = 53 } = props;
  const { speed = 54 } = props;
  const { id = -1 } = props;
  const [role, setRole] = useState("");
  const { img } = props;
  // Define an inline style object to apply the dynamic max-width
  const cardStyle = {
    maxWidth: `${cardSize}px`,
  };
  useEffect(() => {
    if (types == "Attacker") {
      setRole(sports_mma_16dp_EECECD_FILL0_wght400_GRAD0_opsz20)
    }
    if (types == "Guard") {
      setRole(shield_16dp_2854C5_FILL0_wght400_GRAD0_opsz20)
    }
    if (types == "Healer") {
      setRole(science_16dp_48752C_FILL0_wght400_GRAD0_opsz20)
    }
    if (types == "Speeder") {
      setRole(sprint_16dp_2854C5_FILL0_wght400_GRAD0_opsz20)
    }
    if (types == "Magician") {
      setRole(star_shine_16dp_321D71_FILL0_wght400_GRAD0_opsz20)
    }
  }, [types, setRole])
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
  const item:Variants = {
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
        className="Mbutton polaroid-card"
        style={cardStyle}
        whileHover={{ y: -10 }}
      >
        <div className="image-container">
          {/* Placeholder SVG for the image */}
          <div className="image-placeholder">
            <img src={
              role
            }
              className="typeIcon" alt="" />
            <img src={img} alt="" style={{ "width": "100%" }} />
            {/* <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16">
              <path d="M15 12V6a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1zM2 5a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1H2zm3.5-3.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zM9.496 7.422a.5.5 0 0 0-.8-.11l-3.23 2.923L2.5 7.644a.5.5 0 0 0-.646.002L.892 9.02a.5.5 0 0 0-.002.646L4 13.5l1.646-1.492a.5.5 0 0 0 .646-.002l3.23-2.923L13.108 14a.5.5 0 0 0 .798-.11l1.5-3a.5.5 0 0 0-.8-.11L13 9.422l-3.504-2.113z" />
            </svg> */}
          </div>
        </div>
        <div className="text-content smallName">
          <span className="name">{name}</span>
          <div style={{ "display": "flex" }}>
            <div style={{
              width: "50%",
              display: "flex",
              'flexDirection': "column",
              'alignItems': "flex-start"
            }}>
              {/* TODO:数字と文字の間に空白 */}
              <div className="smallStatus" >
                <img src={heart} alt="" />
                <span>{hp}</span>
              </div>
              <div className="smallStatus">
                <img src={sword} alt="" />
                <span>{attack}</span>
              </div>
            </div>
            <div style={{
              width: "50%",
              display: "flex",
              'flexDirection': "column",
              'alignItems': "flex-start"
            }}>
              <div className="smallStatus">
                <img src={shield} alt="" />
                <span>{defence}</span>
              </div>
              <div className="smallStatus">
                <img src={boots} alt="" />
                <span>{speed}</span>
              </div>
            </div>
          </div>
        </div>
      </motion.button>
    </motion.div>
  );
};

export default DrawingSmallCard;