import React, { Component } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Pricing = styled.section`
  padding: 100px 0;
  background: #fafafa6c;
  height: 100vh;
  background-size: cover;
  background-position: center;

  @media (max-width: 992px) {
    margin: 0;
    padding-top: 35px;
  }
`;

const Container = styled.div`
  width: 70%;
  margin: 0 auto;
  @media (max-width: 992px) {
    width: 90%;
  }
`;

const Row = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  margin-right: -15px;
  margin-left: -15px;
  background: #ffffff;
  border-radius: 8px;
  box-shadow: 12.622px 12.829px 114px 0px rgba(48, 52, 73, 0.13);
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const PricingBox = styled.div`
  padding: 35px;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  max-width: 345px;
  height: 425px;
  margin: 0 auto;
`;

const Price = styled.span`
  font-size: 50px;
  ${props => (props.active ? "color: #ff6866" : "color: #404355")};
`;

const Period = styled.div`
  color: #1e3bb2;
  font-size: 9px;
  transform: translateY(-20px);
`;

const HeadingSecondary = styled.h2`
  text-align: center;
`;
const HeadingTeriniary = styled.h3`
  text-align: center;
`;

const Description = styled.p``;

export default class Pricings extends Component {
  render() {
    return (
      <Pricing>
        <Container>
          <HeadingSecondary> Pricing </HeadingSecondary>{" "}
          <p className="text__secondary text__secondary--desc text-center">
            Get started for free, or have multiple calendars right from the
            beginning.Explore our monthly and yearly plans and pick the one that
            best suits your needs.{" "}
          </p>{" "}
          <Row>
            <PricingBox>
              <HeadingTeriniary> Starter Plan </HeadingTeriniary>{" "}
              <Price> Free </Price> <Period> MONTH </Period>{" "}
              <Description>
                The easiest way to get started with Dollarbird for everyone.{" "}
              </Description>{" "}
              <Link to="/charge">
                <button className="btn btn-main--pricing"> Start Now </button>{" "}
              </Link>{" "}
            </PricingBox>{" "}
            <PricingBox className="horizontal">
              <HeadingTeriniary> Enterprise Plan </HeadingTeriniary>{" "}
              <Price active> $19 .00 </Price> <Period> MONTH </Period>{" "}
              <Description>
                Unlimited for 15 Users.Advanced collaborative option for
                partners, families, freelancers.{" "}
              </Description>{" "}
              <Link to="/charge">
                <button className="btn btn-main"> Start Now </button>{" "}
              </Link>{" "}
            </PricingBox>{" "}
            <PricingBox>
              <HeadingTeriniary> Unlimited Plan </HeadingTeriniary>{" "}
              <Price> $39 .00 </Price> <Period> MONTH </Period>{" "}
              <Description>
                Collaborative financial tracking and planning for small
                businesses and enterprises.{" "}
              </Description>{" "}
              <Link to="/charge">
                <button className="btn btn-main--pricing"> Start Now </button>{" "}
              </Link>{" "}
            </PricingBox>{" "}
          </Row>{" "}
        </Container>{" "}
      </Pricing>
    );
  }
}
