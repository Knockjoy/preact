import react from "react";
import { useLocation, Navigate, useNavigate } from "react-router-dom";
import App from "../components/camvas.tsx";
import "../assets/css/Drawing.css"
import "../assets/css/Cards.css"

const Drawing = () => {
    
    const navigate =useNavigate();
    const changePage=()=>{
        navigate("/battle",{state:{frombutton:true}})
    };
    const location = useLocation();
    if (!location.state?.frombutton) {
        return <Navigate to={"/home"} replace />
    }
    return (
        <div class="box">
          {/* <button onClick={changePage}>go to battle</button> */}
        {/* <link rel="stylesheet" href="../assets/css/Drawing.css" /> */}
            <div class="canvas">
    <App class="canvas"></App>
  </div>

    <div class="undermenubox">
      <div class="undermenuGap"></div>
      <div class="undermenu">
        <div class="card-slider">
    <div class="arrow" onclick="scrollCards(-1)">&#8592;</div>
    <div class="cards-container" id="cardsContainer">
      <div class="card">cards</div>
      <div class="card"></div>
      <div class="card"></div>
      <div class="card"></div>
      <div class="card"></div>
      <div class="card"></div>
    </div>
    <div class="arrow" onclick="scrollCards(1)">&#8594;</div>
  </div>
<div class="gotobattlebox" onClick={changePage}>
<span>Go to Battle</span>
</div>
</div>
<div className="undermenuGap"></div>
    </div>


  {/* <script>
    function scrollCards(direction) {
      const container = document.getElementById('cardsContainer');
      const scrollAmount = 120;
      container.scrollLeft += direction * scrollAmount;
    }
  </script> */}

        </div>
    );
}

export default Drawing;