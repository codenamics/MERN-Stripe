import React, { Component } from "react";
import axios from "axios";
import { CardElement, injectStripe } from "react-stripe-elements";

class CheckoutForm extends Component {
  constructor(props) {
    super(props);
    this.state = { complete: false };
  }

  submit = async () => {
    let { token } = await this.props.stripe.createToken({ name: "Name" });
    let response = await fetch("/charge", {
      method: "POST",
      headers: { "Content-Type": "text/plain" },
      body: token.id
    });
    console.log(response);
    if (response.ok) this.setState({ complete: true });
  };

  render() {
    if (this.state.complete) return <h1>Purchase Complete</h1>;
    return (
      <div className="checkout">
        <form>
          <fieldset>
            <div className="input-row">
              <label htmlFor="">Name</label>
              <input
                className="person_card_info"
                type="text"
                placeholder="Jane Doe"
              />
            </div>
            <div className="input-row">
              <label htmlFor="">Email</label>
              <input
                className="person_card_info"
                type="email"
                placeholder="jane@doe.com"
              />
            </div>
            <div className="input-row row-last">
              <label htmlFor="">Phone</label>
              <input
                className="person_card_info"
                type="phone"
                placeholder="+48 999 000 999"
              />
            </div>
          </fieldset>
          <fieldset>
            <CardElement />
          </fieldset>
        </form>
        <button className="btn__checkout" onClick={this.submit}>
          {" "}
          Send{" "}
        </button>
      </div>
    );
  }
}

export default injectStripe(CheckoutForm);
