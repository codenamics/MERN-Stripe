import React, { Component } from "react";
import { StripeProvider } from "react-stripe-elements";
import Pricing from "./components/Pricings";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Stripe from "./components/Stripe";
import LandPage from "./components/LandPage";
class App extends Component {
  render() {
    return (
      <StripeProvider apiKey="pk_test_A2SjqfOGQAF42tSHcxIk1Zpw">
        <Router>
          <React.Fragment>
            <Route exact path="/" component={LandPage} />
            <Route
              exact
              path="/charge/1"
              render={props => <Stripe price="3000" {...props} />}
            />
            <Route
              exact
              path="/charge/2"
              render={props => <Stripe price="4000" {...props} />}
            />
            <Route
              exact
              path="/charge/3"
              render={props => <Stripe price="5000" {...props} />}
            />
          </React.Fragment>
        </Router>
      </StripeProvider>
    );
  }
}

export default App;
