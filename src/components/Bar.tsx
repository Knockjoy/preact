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

const Bar = ({ width,widthp=70,color="darkslateblue" }) => {
    
    return (
        <BarContainer style={{width:`${widthp}%`}}>
            <BarInnter style={{ width: `${width}%`,background:`${color}` }} />
        </BarContainer>
    )
}

export default Bar;