// import react,{useState} from "react";
import { useLocation, Navigate, useNavigate } from "react-router-dom";
// import App from "../components/camvas.tsx";
// import useWindowWidth from "../hooks/pageWidth.ts";
import "../assets/css/Cards.css"
import "../components/Card.tsx"
import React, { ReactNode, useCallback, useEffect, useRef, useState, useContext } from "react";
import * as fabric from "fabric";
import { EraserBrush } from "@erase2d/fabric";
import "../assets/css/Canvas.css";
import "../assets/css/Drawing.css"
import useWindowWidth from "../hooks/pageWidth";
import useWindowHeight from "../hooks/pageHeight";
import { SketchPicker } from 'react-color';
import edit_24dp_1F1F1F_FILL0_wght400_GRAD0_opsz24 from "../assets/icons/edit_24dp_1F1F1F_FILL0_wght400_GRAD0_opsz24.svg";
import border_color_24dp_1F1F1F_FILL0_wght400_GRAD0_opsz24 from "../assets/icons/border_color_24dp_1F1F1F_FILL0_wght400_GRAD0_opsz24.svg"
import ink_eraser_24dp_1F1F1F_FILL0_wght400_GRAD0_opsz24 from "../assets/icons/ink_eraser_24dp_1F1F1F_FILL0_wght400_GRAD0_opsz24.svg";
import redo_24dp_1F1F1F_FILL0_wght400_GRAD0_opsz24 from "../assets/icons/redo_24dp_1F1F1F_FILL0_wght400_GRAD0_opsz24.svg";
import undo_24dp_1F1F1F_FILL0_wght400_GRAD0_opsz24 from "../assets/icons/undo_24dp_1F1F1F_FILL0_wght400_GRAD0_opsz24.svg";
import { useWebSocketContext } from "../components/WebSocketManager.tsx";
import DrawingSmallCard from "../components/DrawingSmallCard.tsx";
import { BattleManagerContext, useBattleManagerContext } from "../components/BattleManager.tsx";
import { Colors } from "../constants/Colors";
const DEFAULT_COLOR = "#000000";
const DEFAULT_WIDTH = 10;


const Drawing = () => {
  const { sendMessage, isConnected, subscribe, unsubscribe } = useWebSocketContext();
  const { userid, myCards: myCards, battle_in } = useContext(BattleManagerContext)
  const canvasEl = useRef(null);
  const [canvas, setCanvas] = useState<fabric.Canvas | null>(null);
  const [width, setWidth] = useState(DEFAULT_WIDTH);
  const [color, setColor] = useState(DEFAULT_COLOR);
  const [picker, setPicker] = useState(DEFAULT_COLOR);
  const [cardslen, setCardslen] = useState(0);
  const [drawingCards, setDrawingCards] = useState([...myCards])
  const [windowWidth, setWindowWidth] = useState();
  const [cardsEle, setCardsEle] = useState([]);
  const [cardids, setCardids] = useState([]);
  const [cardNickname, setCardNickname] = useState("");
  const [createError, setCreateError] = useState("");

  //画面更新用
  useEffect(() => { console.log(myCards); setDrawingCards(myCards); }, [myCards]);



  useEffect(() => {
    if (canvasEl.current === null) {
      return;
    }

    const canvas = new fabric.Canvas(canvasEl.current);

    setCanvas(canvas);

    // 手書き機能を追加
    const pencil = new fabric.PencilBrush(canvas);
    pencil.color = DEFAULT_COLOR;
    pencil.width = DEFAULT_WIDTH;
    canvas.freeDrawingBrush = pencil;
    canvas.isDrawingMode = true;

    // 消しゴムで線を消せるようにするため
    canvas.on("object:added", (e) => {
      e.target.erasable = true;
    });

    return () => {
      canvas.dispose();
    };
  }, []);

  const changeToRed = () => {
    if (canvas?.freeDrawingBrush === undefined) {
      return;
    }
    canvas.freeDrawingBrush = new fabric.PencilBrush(canvas);
    canvas.freeDrawingBrush.color = "#ff0000";
    canvas.freeDrawingBrush.width = width;
    setColor("#ff0000");
  };

  const Download2img = () => {
    if (cardslen < 5) {
      const dataURL = canvas!.toDataURL({
        multiplier: 1,
        format: "png",
        quality: 1,
      });
      const nickname = cardNickname == "" ? "Untitle" : cardNickname
      sendMessage(JSON.stringify({ status: "createCard", userID: userid, charaname: nickname, sketch: dataURL }))
      setCardslen(pre => pre + 1);
      //init
      setHistories({
        undo: [],
        redo: [],
      });
      canvas!.clear();
      clearNickname();
    }
    else {
      setCreateError("カードが作成できるのは5枚までです。")
    }
  };

  const handleChange = (color_) => {
    canvas!.freeDrawingBrush = new fabric.PencilBrush(canvas!);
    canvas!.freeDrawingBrush.width = width
    const r = parseInt(color_.rgb["r"], 10).toString(16).padEnd(2, "0");
    const g = parseInt(color_.rgb["g"], 10).toString(16).padEnd(2, "0");
    const b = parseInt(color_.rgb["b"], 10).toString(16).padEnd(2, "0");
    const colorCode = `#${r}${g}${b}`.toUpperCase();
    canvas!.freeDrawingBrush.color = colorCode;
    setPicker(color_);
    setColor(colorCode);
  }
  const changeToThick = () => {
    if (canvas?.freeDrawingBrush === undefined) {
      return;
    }
    canvas.freeDrawingBrush = new fabric.PencilBrush(canvas);
    canvas.freeDrawingBrush.width = 20;
    canvas.freeDrawingBrush.color = color;
    setWidth(20);
  };

  const changeToThin = () => {
    if (canvas?.freeDrawingBrush === undefined) {
      return;
    }
    canvas.freeDrawingBrush = new fabric.PencilBrush(canvas);
    canvas.freeDrawingBrush.width = 10;
    canvas.freeDrawingBrush.color = color;
    setWidth(10);
  };

  const changeToEraser = () => {
    if (canvas?.freeDrawingBrush === undefined) {
      return;
    }
    const eraser = new EraserBrush(canvas);
    eraser.on("end", async (e) => {
      e.preventDefault();

      await eraser.commit(e.detail);
      setHistories((prev) => ({
        undo: [...prev.undo, canvas.toJSON()],
        redo: [],
      }));
    });

    canvas.freeDrawingBrush = eraser;
    canvas.freeDrawingBrush.width = 20;
  };

  interface brushHistory {
    undo: any[],
    redo: any[]
  }

  const [histories, setHistories] = useState<brushHistory>({
    undo: [],
    redo: [],
  });

  const isCanvasLocked = useRef(false);

  useEffect(() => {
    if (!canvas) {
      return;
    }

    // 空のcanvasを履歴の初期値に追加
    setHistories({
      undo: [canvas.toJSON()],
      redo: [],
    });

    const onCanvasModified = (e: { target: fabric.FabricObject }) => {
      if (isCanvasLocked.current) {
        return;
      }

      const targetCanvas = e.target.canvas;
      if (targetCanvas) {
        setHistories((prev) => ({
          undo: [...prev.undo, targetCanvas.toJSON()],
          redo: [],
        }));
      }
    };

    canvas.on("object:added", onCanvasModified);

    return () => {
      canvas.off("object:added", onCanvasModified);
    };
  }, [canvas]);

  const undo = useCallback(async () => {
    if (!canvas || isCanvasLocked.current) {
      return;
    }

    const lastHistory = histories.undo.at(-2);
    const currentHistory = histories.undo.at(-1);
    if (!lastHistory || !currentHistory) {
      return;
    }

    isCanvasLocked.current = true;

    await canvas.loadFromJSON(lastHistory);
    canvas.renderAll();
    setHistories((prev) => ({
      undo: prev.undo.slice(0, -1),
      redo: [...prev.redo, currentHistory],
    }));

    isCanvasLocked.current = false;
  }, [canvas, histories.undo]);

  const redo = useCallback(async () => {
    if (!canvas || isCanvasLocked.current) {
      return;
    }

    const lastHistory = histories.redo.at(-1);
    if (!lastHistory) {
      return;
    }

    isCanvasLocked.current = true;

    await canvas.loadFromJSON(lastHistory);
    canvas.renderAll();
    setHistories((prev) => ({
      undo: [...prev.undo, lastHistory],
      redo: prev.redo.slice(0, -1),
    }));

    isCanvasLocked.current = false;
  }, [canvas, histories.redo]);
  // TODO:ショートカットキー対応

  const [cards, setCards] = useState();
  // setWindowWidth(useWindowHeight());

  const navigate = useNavigate();
  const changePage = () => {
    if (myCards.length == cardslen&&myCards.length==5) {
      battle_in()
      navigate("/loading", { state: { frombutton: true } })
    } else {
      setCreateError("カードの枚数が5枚でないです。")
    }
  };
  const location = useLocation();
  if (!location.state?.frombutton) {
    return <Navigate to={"/home"} replace />
  }

  const handleNickname = (e) => setCardNickname(e.target.value);
  const clearNickname = () => setCardNickname("");

  return (
    <div className="boxbox .huninn-regular" color={Colors.light.text}>
      <div className="SideGap"></div>
      <div className="drawingbox">
        {/* <button onClick={changePage}>go to battle</button> */}
        {/* <link rel="stylesheet" href="../assets/css/Drawing.css" /> */}

        <div className="CanvasMenu">
          <div className="RightMenu">
            <div className="ToolField">
              <div className="ColorBox">
                <div className=""><SketchPicker color={picker} onChange={handleChange}></SketchPicker></div>
              </div>
              <div className="ToolBox">
                <div className="toolIconBox" onClick={changeToThick}>
                  <img src={border_color_24dp_1F1F1F_FILL0_wght400_GRAD0_opsz24} alt="太くする" />
                </div>
                <div className="toolIconBox" onClick={changeToThin}>
                  <img src={edit_24dp_1F1F1F_FILL0_wght400_GRAD0_opsz24} alt="細くする" />
                </div>
                <div className="toolIconBox" onClick={changeToEraser}>
                  <img src={ink_eraser_24dp_1F1F1F_FILL0_wght400_GRAD0_opsz24} alt="消しゴム" />
                </div>
                <div className="toolIconBox" onClick={undo}>
                  <img src={undo_24dp_1F1F1F_FILL0_wght400_GRAD0_opsz24} alt="元に戻す" />
                </div>
                <div className="toolIconBox" onClick={redo}>
                  <img src={redo_24dp_1F1F1F_FILL0_wght400_GRAD0_opsz24} alt="取り消し" />
                </div>
              </div>
            </div>

          </div>
          <div className="canvas">
            <canvas ref={canvasEl} width={window.innerHeight * 0.55} height={window.innerHeight * 0.55} />
            {/* TODO:幅整える */}
          </div>
          <div style={{ width: "30%" }}>
            <input type="text" name="" id="" value={cardNickname} onChange={handleNickname} placeholder="カードのニックネームを記入" style={{ fontSize: "1.2em", padding: "10px", height: "25%", "margin": "10px", width: "100%" }} />

            <div className="CreateCardButtonBox" onClick={Download2img} >
              <div className="CreateCardButton">
                カードを作成
              </div>
              <div style={{
                fontSize: " 1.2em",
                display: "flex",
                margin: "10px",
                height: "1.2em",
              }}>
                <span>{createError}</span>
              </div>
            </div>
          </div>



        </div>

        <div className="undermenubox">
          <div className="undermenu">
            <div className="card-slider">
              {/* <div className="arrow" onClick="scrollCards(-1)">&#8592;</div> */}
              <div className="cards-container drawing_cards" id="cardsContainer">
                {
                  drawingCards.map((item, index) => (
                    <DrawingSmallCard
                      name={item.name}
                      hp={item.hp}
                      attack={item.attack}
                      defence={item.defence}
                      speed={item.speed}
                      types={item.role}
                      cardSize={150}
                      img={item.img}
                    ></DrawingSmallCard>
                  ))
                }

              </div>
              {/* <div className="arrow" onClick="scrollCards(1)">&#8594;</div> */}
            </div>
            <div className="gotobattlebox" onClick={changePage}>
              <span>Go to Battle</span>
            </div>
          </div>
        </div>
      </div>
      <div className="SideGap"></div>
    </div>
  );
}

export default Drawing;