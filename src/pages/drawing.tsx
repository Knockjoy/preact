import react from "react";
import { useLocation, Navigate, useNavigate } from "react-router-dom";
import App from "../components/camvas.tsx";
import useWindowWidth from "../hooks/pageWidth.ts";
import "../assets/css/Drawing.css"
import "../assets/css/Cards.css"
import "../components/Card.tsx"
import Card from "../components/Card.tsx";

const Drawing = () => {

  const navigate = useNavigate();
  const changePage = () => {
    navigate("/battle", { state: { frombutton: true } })
  };
  const location = useLocation();
  if (!location.state?.frombutton) {
    return <Navigate to={"/home"} replace />
  }
  return (
    <div class="boxbox">
      <div className="SideGap"></div>
      <div class="box">
        {/* <button onClick={changePage}>go to battle</button> */}
        {/* <link rel="stylesheet" href="../assets/css/Drawing.css" /> */}

        <App ></App>

        <div class="undermenubox">
          <div class="undermenu">
            <div class="card-slider">
              <div class="arrow" onClick="scrollCards(-1)">&#8592;</div>
              <div class="cards-container" id="cardsContainer">
                <Card cardSize={()=>{return 200}}></Card>
                <Card cardSize={200}></Card>
                <Card cardSize={200}></Card>
                <Card cardSize={200}></Card>
                <Card cardSize={200}></Card>
                <Card cardSize={200}></Card>
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