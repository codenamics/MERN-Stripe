import React, { Component } from "react";
import { Elements } from "react-stripe-elements";
import CheckoutForm from "./CheckoutForm";
export default class Stripe extends Component {
  render() {
    const { price } = this.props;
    return (
      <Elements>
        <CheckoutForm price={price} />
      </Elements>
    );
  }
}
