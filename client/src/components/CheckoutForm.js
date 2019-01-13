import React, { Component } from "react";
import { CardElement, injectStripe } from "react-stripe-elements";
import styled from "styled-components";
import SuccessfulPay from "./SuccessfulPay";
import axios from "axios";

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
  width: 92%;
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
      errors: {},
      tokenErrors: "",
      complete: false,
      name: "",
      email: "",
      phone: "",
      city: "",
      street: "",
      country: "",
      price: this.props.price
    };
  }

  handleChange = input => e => {
    this.setState({
      [input]: e.target.value
    });
  };
  submit = async () => {
    const { email, price, name, phone, city, street, country } = this.state;
    let { token } = await this.props.stripe
      .createToken({
        name,
        address_city: city,
        address_line1: street,
        address_country: country
      })
      .catch(err => {
        console.log(err);
      });
    if (!token) {
      this.setState({
        tokenErrors: "Token missing"
      });
    } else {
      const data = {
        token: token.id,
        email,
        price,
        name,
        phone,
        city,
        street,
        country
      };
      axios
        .post("/charge/pay", data)
        .then(res => {
          if (res.status === 200) {
            this.setState({
              complete: true
            });
          }
        })
        .catch(err => {
          this.setState({
            errors: err.response.data
          });
        });
    }
  };

  render() {
    const { errors } = this.state;
    if (this.state.complete) return <SuccessfulPay />;
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
              {errors.name && (
                <div className="invalid-feedback">{errors.name}</div>
              )}
            </InputRow>

            <InputRow>
              <Label htmlFor=""> Email </Label>
              <Input
                type="email"
                placeholder="jane@doe.com"
                onChange={this.handleChange("email")}
              />
              {errors.email && (
                <div className="invalid-feedback">{errors.email}</div>
              )}
            </InputRow>
            <InputRow>
              <Label htmlFor=""> Phone </Label>
              <Input
                type="phone"
                placeholder="+48 999 000 999"
                onChange={this.handleChange("phone")}
              />
              {errors.phone && (
                <div className="invalid-feedback">{errors.phone}</div>
              )}
            </InputRow>
          </CheckOutFieldSet>
          <CheckOutFieldSet>
            <InputRow>
              <Label htmlFor=""> Street </Label>
              <Input
                type="text"
                placeholder="County 99/0"
                onChange={this.handleChange("street")}
              />
              {errors.street && (
                <div className="invalid-feedback">{errors.street}</div>
              )}
            </InputRow>
            <InputRow>
              <Label htmlFor=""> City </Label>
              <Input
                type="text"
                placeholder="New York"
                onChange={this.handleChange("city")}
              />
              {errors.city && (
                <div className="invalid-feedback">{errors.city}</div>
              )}
            </InputRow>
            <InputRow last>
              <Label htmlFor=""> Country </Label>
              <Input
                type="text"
                placeholder="USA"
                onChange={this.handleChange("country")}
              />
              {errors.country && (
                <div className="invalid-feedback">{errors.country}</div>
              )}
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
