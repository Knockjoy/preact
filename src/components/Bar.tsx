import styled from "styled-components";
const BarContainer = styled.div`
position:relative;
height:20px;
background:lightgray;
border-radius:5px;
display:inline-block;
`
const BarInnter = styled.div`
  display: block;
  position: relative;
  overflow: hidden;
  height: 100%;
  width: 0;
  border-radius:5px;
  `

const Bar = ({ width,widthp=70,color="darkslateblue",point=-1 }) => {
    let pointStr="";
    pointStr=point.toString()
    if (point==-1){
        pointStr="-";
    }

    return (
        <BarContainer style={{display:"flex",width:`${widthp}%`,"align-items":"center"}}>
            <span style={{position:"absolute",right:"0","z-index":"3",padding:"2px","font-size":"0.9em"}}>{pointStr}</span>
            <BarInnter style={{ width: `${width}%`,background:`${color}` }} />
        </BarContainer>
    )
}

export default Bar;