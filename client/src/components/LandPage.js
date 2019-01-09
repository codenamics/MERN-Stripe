import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import phone from "../assets/smart.png";
const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  background: #2d46c9;
  color: #fff;
`;
const H1 = styled.h1`
  font-size: 60px;
`;
const Text = styled.p`
  font-size: 18px;
`;
const LeftCon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0 25px;
`;
const Heading = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  margin-left: 8.99%;
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
      <LeftCon>
        <Heading>
          <H1>Reactive news</H1>
          <Text>
            Take control over your news feed: keep track of latates hot topic.
            Get to know what is going around. Stay informed!
          </Text>
          <div>
            <Link to="/pricing">
              <button className="btn btn-main">Pricing</button>
            </Link>
            <Link to="/subscriptions">
              <button className="btn btn-main btn-main--sub btn-main--pricing ml-25">
                Subscriptions
              </button>
            </Link>
          </div>
        </Heading>
      </LeftCon>
      <ImgCon>
        <Img src={phone} alt="phone" className="img-fluid" />
      </ImgCon>
    </Grid>
  );
}
