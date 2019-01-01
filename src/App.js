import React, { Component } from "react";
import { StripeProvider } from "react-stripe-elements";
import Pricing from "./components/Pricings";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Stripe from "./components/Stripe";
class App extends Component {
  render() {
    return (
      <StripeProvider apiKey="pk_test_A2SjqfOGQAF42tSHcxIk1Zpw">
        <Router>
          <React.Fragment>
            <Route exact path="/" component={Pricing} />
            <Route exact path="/charge" component={Stripe} />
          </React.Fragment>
        </Router>
      </StripeProvider>
    );
  }
}

export default App;
