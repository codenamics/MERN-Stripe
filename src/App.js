import React, { Component } from "react";
import { Elements, StripeProvider } from "react-stripe-elements";
import CheckoutForm from "./components/CheckoutForm";
import Pricing from "./components/Pricings";
class App extends Component {
  render() {
    return (
      <div>
        <Pricing />
      </div>
      // <StripeProvider apiKey="pk_test_A2SjqfOGQAF42tSHcxIk1Zpw">
      //   <div className="flex-xy">
      //     <Elements>
      //       <CheckoutForm />
      //     </Elements>
      //   </div>
      // </StripeProvider>
    );
  }
}

export default App;
