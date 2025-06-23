// import react,{useState} from "react";
import { useLocation, Navigate, useNavigate } from "react-router-dom";
import App from "../components/camvas.tsx";
// import useWindowWidth from "../hooks/pageWidth.ts";
import "../assets/css/Drawing.css"
import "../assets/css/Cards.css"
import "../components/Card.tsx"
import Card from "../components/Card.tsx";
import SmallCard from "../components/SmallCard.tsx";
import { useCallback, useEffect, useRef, useState } from "react";
import * as fabric from "fabric";
import { EraserBrush } from "@erase2d/fabric";
import "../assets/css/Canvas.css";
import "../assets/css/Drawing.css"
import useWindowWidth from "../hooks/pageWidth.ts";
import useWindowHeight from "../hooks/pageHeight.ts";
import { SketchPicker } from 'react-color';
import edit_24dp_1F1F1F_FILL0_wght400_GRAD0_opsz24 from "../assets/icons/edit_24dp_1F1F1F_FILL0_wght400_GRAD0_opsz24.svg";
import border_color_24dp_1F1F1F_FILL0_wght400_GRAD0_opsz24 from "../assets/icons/border_color_24dp_1F1F1F_FILL0_wght400_GRAD0_opsz24.svg"
import ink_eraser_24dp_1F1F1F_FILL0_wght400_GRAD0_opsz24 from "../assets/icons/ink_eraser_24dp_1F1F1F_FILL0_wght400_GRAD0_opsz24.svg";
import redo_24dp_1F1F1F_FILL0_wght400_GRAD0_opsz24 from "../assets/icons/redo_24dp_1F1F1F_FILL0_wght400_GRAD0_opsz24.svg";
import undo_24dp_1F1F1F_FILL0_wght400_GRAD0_opsz24 from "../assets/icons/undo_24dp_1F1F1F_FILL0_wght400_GRAD0_opsz24.svg";
import { useWebSocketContext } from "../hooks/WebSocketManager.tsx";
import DrawingSmallCard from "../components/DrawingSmallCard.tsx";
const DEFAULT_COLOR = "#000000";
const DEFAULT_WIDTH = 10;


const Drawing = () => {
  const { sendMessage, isConnected, userID, subscribe, unsubscribe } = useWebSocketContext();

  const canvasEl = useRef(null);
  const [canvas, setCanvas] = useState(null);
  const [width, setWidth] = useState(DEFAULT_WIDTH);
  const [color, setColor] = useState(DEFAULT_COLOR);
  const [picker, setPicker] = useState(DEFAULT_COLOR);
  const [cardslen, setCardslen] = useState(0);
  const [windowWidth, setWindowWidth] = useState();
  const [cardsEle, setCardsEle] = useState([]);
  const [cardids,setCardids]=useState([]);
  useEffect(() => {
    const handler = (e) => {
      const data = e
      console.log("receive data")
      console.log(e)
      const status = data["status"]
      if (status == "cardCreated" && data["careateStatus"] == "success") {
        console.log(data["cardid"])
        setCardids([...cardids,data["cardid"]])
        setCardsEle([...cardsEle, { id: data["cardid"], name:data["charaname"],sketch:data["sketch"],status: data["cardstatus"] }])
      };
    }
    subscribe(handler);
    return () => unsubscribe(handler);

  }, [subscribe, unsubscribe, cardsEle]);
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
    const dataURL = canvas.toDataURL({
      format: "png",
      quality: 1,
    });
    sendMessage(JSON.stringify({ status: "createCard", userID: userID, charaname: "sample", sketch: dataURL }))
    setCardslen(cardslen + 1);
    //init
    setHistories({
      undo: [],
      redo: [],
    });
    canvas.clear();

  };

  const handleChange = (color_) => {
    canvas.freeDrawingBrush = new fabric.PencilBrush(canvas);
    canvas.freeDrawingBrush.width = width
    const r = parseInt(color_.rgb["r"], 10).toString(16).padEnd(2, "0");
    const g = parseInt(color_.rgb["g"], 10).toString(16).padEnd(2, "0");
    const b = parseInt(color_.rgb["b"], 10).toString(16).padEnd(2, "0");
    const colorCode = `#${r}${g}${b}`.toUpperCase();
    canvas.freeDrawingBrush.color = colorCode;
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

  const [histories, setHistories] = useState({
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
    sendMessage(JSON.stringify({"status":"battle_in","cardids":cardids}))
    navigate("/battle", { state: { frombutton: true } })
  };
  const location = useLocation();
  if (!location.state?.frombutton) {
    return <Navigate to={"/home"} replace />
  }

  return (
    <div class="boxbox .huninn-regular">
      <div className="SideGap"></div>
      <div class="box">
        {/* <button onClick={changePage}>go to battle</button> */}
        {/* <link rel="stylesheet" href="../assets/css/Drawing.css" /> */}

        <div class="CanvasMenu">

          <div class="canvas">
            <canvas ref={canvasEl} width={500} height={500} />
            {/* TODO:幅整える */}
          </div>

          <div className="RightMenu">
            <div className="ToolField">
              <div class="ColorBox">
                <div className=""><SketchPicker color={picker} onChange={handleChange}></SketchPicker></div>
              </div>
              <div class="ToolBox">
                <img src={border_color_24dp_1F1F1F_FILL0_wght400_GRAD0_opsz24} alt="太くする" onClick={changeToThick} />
                <img src={edit_24dp_1F1F1F_FILL0_wght400_GRAD0_opsz24} alt="細くする" onClick={changeToThin} />
                <img src={ink_eraser_24dp_1F1F1F_FILL0_wght400_GRAD0_opsz24} alt="消しゴム" onClick={changeToEraser} />
                <img src={undo_24dp_1F1F1F_FILL0_wght400_GRAD0_opsz24} alt="元に戻す" onClick={undo} />
                <img src={redo_24dp_1F1F1F_FILL0_wght400_GRAD0_opsz24} alt="取り消し" onClick={redo} />
              </div>
            </div>
            <div class="CreateCardButtonBox" onClick={Download2img}>
              <div class="CreateCardButton">
                カードを作成
              </div>
            </div>
          </div>

        </div>

        <div class="undermenubox">
          <div class="undermenu">
            <div class="card-slider">
              <div class="arrow" onClick="scrollCards(-1)">&#8592;</div>
              <div class="cards-container drawing_cards" id="cardsContainer">
                {
                  cardsEle.map((item, index) => (
                    <DrawingSmallCard
                      hp={item.status["hp"]}
                      attack={item.status["attack"]}
                      defence={item.status["defence"]}
                      speed={item.status["speed"]}
                      types={item.status["role"]}
                      cardSize={200}
                      img={item.sketch}
                      ></DrawingSmallCard>
                  ))
                }

              </div>
              <div class="arrow" onClick="scrollCards(1)">&#8594;</div>
            </div>
            <div class="gotobattlebox" onClick={changePage}>
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