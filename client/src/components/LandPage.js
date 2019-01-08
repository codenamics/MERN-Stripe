import React from "react";
import styled from "styled-components";
import phone from "../assets/smart.png";
const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;

  background: #6772e5;
`;
const ImgCon = styled.div`
  height: 100vh;
  display: flex;

  align-items: center;
  justify-content: center;
`;
const Img = styled.img`
  width: auto;
  height: 90%;
`;
export default function LandPage() {
  return (
    <Grid>
      <div />
      <ImgCon>
        <Img src={phone} alt="" className="img-fluid" />
      </ImgCon>
    </Grid>
  );
}
