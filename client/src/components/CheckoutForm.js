import React, { Component } from "react";
import { CardElement, injectStripe } from "react-stripe-elements";
import styled from "styled-components";

const CheckOut = styled.div`
  background-color: #6772e5;
  width: 100%;
  height: 100vh;
  padding-top: 150px;
`;

const CheckOutForm = styled.form`
  margin: 0 auto;
  width: 100%;
  max-width: 500px;
  transition-property: opacity, transform;
  transition-duration: 0.35s;
  transition-timing-function: cubic-bezier(0.165, 0.84, 0.44, 1);
`;
const CheckOutFieldSet = styled.fieldset`
  margin: 0 15px 20px;
  padding: 0;
  border-style: none;
  background-color: #7795f8;
  box-shadow: 0 6px 9px rgba(50, 50, 93, 0.06), 0 2px 5px rgba(0, 0, 0, 0.08),
    inset 0 1px 0 #829fff;
  border-radius: 4px;
`;
const InputRow = styled.div`
  display: -ms-flexbox;
  display: flex;
  -ms-flex-align: center;
  align-items: center;
  margin-left: 15px;
  ${props =>
    props.last
      ? "border-bottom: none"
      : "border-bottom: 1px solid rgba(255, 255, 255, 0.301);"};
`;
const Label = styled.label`
  width: 15%;
  min-width: 70px;
  padding: 11px 0;
  color: #c4f0ff;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin: 0;
`;
const Input = styled.input`
  border: none;
  width: 100%;
  padding: 16px 15px 16px 0;
  color: #fff;
  background-color: transparent;
  -webkit-animation: 1ms void-animation-out;
  font-size: 16px;
  outline: none;
`;

const ButtonCheckOut = styled.button`
  display: block;
  width: 100%;
  max-width: 469px;
  height: 40px;
  margin: 0 auto;
  border: none;
  background-color: #f6a4eb;
  box-shadow: 0 6px 9px rgba(50, 50, 93, 0.06), 0 2px 5px rgba(0, 0, 0, 0.08),
    inset 0 1px 0 #ffb9f6;
  border-radius: 4px;
  color: #fff;
  font-weight: 600;
  cursor: pointer;
`;

class CheckoutForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      complete: false,
      name: "",
      email: "",
      price: this.props.price
    };
  }

  handleChange = input => e => {
    this.setState({
      [input]: e.target.value
    });
  };
  submit = async () => {
    let { token } = await this.props.stripe.createToken({
      name: this.state.name
    });
    const data = {
      token: token.id,
      email: this.state.email,
      price: this.state.price
    };
    let response = await fetch("/charge", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });
    console.log(response);
    if (response.ok)
      this.setState({
        complete: true
      });
  };

  render() {
    if (this.state.complete) return <h1> Purchase Complete </h1>;
    return (
      <CheckOut>
        <CheckOutForm>
          <CheckOutFieldSet>
            <InputRow>
              <Label htmlFor=""> Name </Label>
              <Input
                type="text"
                placeholder="Jane Doe"
                onChange={this.handleChange("name")}
              />
            </InputRow>
            <InputRow>
              <Label htmlFor=""> Email </Label>
              <Input
                type="email"
                placeholder="jane@doe.com"
                onChange={this.handleChange("email")}
              />
            </InputRow>
            <InputRow last>
              <Label htmlFor=""> Phone </Label>
              <Input type="phone" placeholder="+48 999 000 999" />
            </InputRow>
          </CheckOutFieldSet>
          <CheckOutFieldSet>
            <CardElement />
          </CheckOutFieldSet>
        </CheckOutForm>
        <ButtonCheckOut onClick={this.submit}> Send </ButtonCheckOut>
      </CheckOut>
    );
  }
}

export default injectStripe(CheckoutForm);
