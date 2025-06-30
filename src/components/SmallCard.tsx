import React, { useState, useEffect, useRef, createRef, useContext } from 'react';
import { motion, Variants } from "framer-motion";
import Modal from "react-modal";
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
import { BattleManagerContext, useBattleManagerContext } from './BattleManager';
import { wait } from '@testing-library/user-event/dist/utils';
// Main App component
interface Props {
  cardSize: number;
  mycard: Card.MyCard;
  targets: (Card.MyCard | Card.OpponentCard)[];
}
const SmallCard = (props: Props) => {
  let cardSize = props.cardSize
  const mycard = props.mycard
  const targets = props.targets
  const targetselect = useRef<HTMLSelectElement | null>(null);
  const [role, setRole] = useState<string>("");
  const [showDetail,setShowDetail]=useState(false)
  const { SetSkill} = useContext(BattleManagerContext);
  const { thisTurn,battle } = useContext(BattleManagerContext)
  if (cardSize == null || cardSize == undefined || cardSize == -1) {
    cardSize = 300
  }

  // Define an inline style object to apply the dynamic max-width
  const cardStyle = {
    maxWidth: `${cardSize}px`,
  };

  const DetailMenu = styled.div`
  &#detailMenu${mycard.id}{
    // position:absolute;  
    // left: 50%;
    // top:50%;
    border:none;
    width:100vw;
    height:100vh;
    background:rgba(0,0,0,0.7);
    margin:0;
    padding:0;
    z-index:100;
    display:none;
    }
  `;

  useEffect(() => {
    if (mycard.role == "Attacker") {
      setRole(sports_mma_16dp_EECECD_FILL0_wght400_GRAD0_opsz20)
      return
    }
    if (mycard.role == "Guard") {
      setRole(shield_16dp_2854C5_FILL0_wght400_GRAD0_opsz20)
      return
    }
    if (mycard.role == "Healer") {
      setRole(science_16dp_48752C_FILL0_wght400_GRAD0_opsz20)
      return
    }
    if (mycard.role == "Speeder") {
      setRole(sprint_16dp_2854C5_FILL0_wght400_GRAD0_opsz20)
      return
    }
    if (mycard.role == "Magician") {
      setRole(star_shine_16dp_321D71_FILL0_wght400_GRAD0_opsz20)
      return
    }
    setRole(question_mark_16dp_434343_FILL0_wght400_GRAD0_opsz20)
  }, [mycard.role, setRole])
  const item: Variants = {
    hidden: {
      y: 15
    },
    show: {
      y: [15, 0],
      transition: {
        duration: 0.4,
        ease: "easeInOut"
      }
    },
    wait:{}
  };
  const detailHandler=()=>setShowDetail(!showDetail)
  const handleSendSkill = () => {
    detailHandler()
    const skill = document.querySelector<HTMLInputElement>("input[name='skill']:checked")!.value;
    const target= document.querySelector<HTMLSelectElement>(`#selectbox-${mycard.id}`);
    const skillIndex=parseInt(skill)
    console.log(skill)
    console.log(target?.value)
    if(!thisTurn.set){
    SetSkill(mycard,skillIndex,targets.find((item)=>item.id==target?.value)!)
    }else{
      // TODO:技をせっていできなかった時
    }
  };

  return (
    <motion.div
    // TODO:技更新時にアニメーションしない
      variants={item}
      className="app-container" style={{ width: "20%" }}>
      <motion.button
        className="Mbutton polaroid-card"
        style={cardStyle}
        whileHover={{ y: -10 }}
        onClick={detailHandler}
      // popoverTarget={`detailMenu${mycard.id}`}
      // popoverTargetAction="hide"
      // disabled={thisTurn.set}/
      >
        <div className="image-container">
          <div className="image-placeholder">
            <img src={role} className="typeIcon" alt="" />
            <img src={mycard.img} alt="" style={{ "width": "100%" }} />
          </div>
        </div>
        <div className="text-content smallName">
          <span className="name">{mycard.name}</span>
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
                <span>{mycard.hp.toString()}</span>
              </div>
              <div className="smallStatus">
                <img src={sword} alt="" />
                <span>{mycard.attack.toString()}</span>
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
                <span>{mycard.defence.toString()}</span>
              </div>
              <div className="smallStatus">
                <img src={boots} alt="" />
                <span>{mycard.speed.toString()}</span>
              </div>
            </div>
          </div>
        </div>
      </motion.button>

      {/* <DetailMenu className="BattleMenubox"> */}
      {/* <Modal isOpen={true}  */}
      {/* // className="BattleMenuBox" */}
      {/* > */}
      {/* <Modal  className="BattleMenubox"> */}
      {/* <button
          popovertarget={`detailMenu${id}`}
          popovertargetaction="hidden"
          style={{ position: "absolute", width: "100vw", height: "100vh", "z-index": "0", "background": "none", padding: 0, margin: 0 }}>

        </button> */}
      <Modal style={{ "zIndex": "100" }} className="detailMenu" overlayClassName="overlay" isOpen={showDetail}>
        <DetailMenu className='BattleMenuBox'>

          <div className="BattleMenu">
            <div style={{
              "display": "flex",
              'flexDirection': "row-reverse"
            }}>
              <button
              onClick={detailHandler}
                // popoverTarget={`detailMenu${mycard.id}`}
                // popoverTargetAction="hide"
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
              name={mycard.name}
              types={mycard.role}
              hp={mycard.hp.toString()}
              attack={mycard.attack.toString()}
              defence={mycard.defence.toString()}
              speed={mycard.speed.toString()}
              img={mycard.img}
            ></Card>
            <span style={{ 'fontWeight': "500", 'fontSize': "1.1em", "margin": "10px 0" }}>skills</span>
            <div className="skill_choice">
              {mycard.skills.map((item, index) => {
                return (
                  <div style={{ "display": "flex", "width": "100%" }}>
                    <input value={index} type="radio" name="skill" id={`radio-${mycard.id}-${index}`} />
                    <label className="SkillButton" id={`select-${mycard.id}-${index}`} htmlFor={`radio-${mycard.id}-${index}`}>{item.nickname}
                      <div style={{ "color": "#3e3e3e" }}>{item.ex}</div>
                    </label>
                  </div>
                );
              })}
            </div>
            <div className="select TargetSelecter">
              <select name="target" className="item" style={{ "width": "100%" }} id={`selectbox-${mycard.id}`} >
                <option value="" style={{ "width": "100%" }}>targetを選択</option>
                {targets.map((item, index) => (
                  <option value={item.id} style={{ "width": "100%" }}>{`${item.name}`}</option>
                ))}
              </select>

            </div>
            <button
              className="decision Mbutton"
              style={{ width: "100%" }}
              onClick={handleSendSkill}
            >
              決定
            </button>

          </div>
        </DetailMenu>

      </Modal>
      {/* </div> */}
      {/* </DetailMenu> */}
      {/* </Modal> */}
    </motion.div >
  );
};

export default SmallCard;