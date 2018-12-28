import React, { Component } from "react";

export default class Pricings extends Component {
  render() {
    return (
      <section className="pricing" id="pricing">
        <div className="container">
          <h2 className="heading__secondary heading__secondary--desc text-center">
            Pricing
          </h2>
          <p className="text__secondary text__secondary--desc text-center">
            Get started for free, or have multiple calendars right from the
            beginning.Explore our monthly and yearly plans and pick the one that
            best suits your needs.
          </p>
          <div className="row mt-100">
            <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12 text-center">
              <div className="pall-35 d-flex flex-column justify-content-between pricing__box t2">
                <h3 className="heading__teritary"> Starter Plan </h3>
                <span className="pricing__price"> Free </span>
                <span className="pricing__period"> MONTH </span>
                <p className="text__teritary">
                  The easiest way to get started with Dollarbird for everyone.
                </p>
                <a href="">
                  <button className="btn btn-main--pricing"> Start Now </button>
                </a>
              </div>
            </div>
            <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12 herizontal-line text-center mt-mb-md">
              <div className="pall-35 d-flex flex-column justify-content-between pricing__box t1">
                <h3 className="heading__teritary"> Enterprise Plan </h3>
                <span className="pricing__price pricing__price--active">
                  $19.00
                </span>
                <span className="pricing__period"> MONTH </span>
                <p className="text__teritary">
                  Unlimited for 15 Users.Advanced collaborative option for
                  partners, families, freelancers.
                </p>
                <a href="">
                  <button className="btn btn-main"> Start Now </button>
                </a>
              </div>
            </div>
            <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12 text-center">
              <div className="pall-35 d-flex flex-column justify-content-between pricing__box t2">
                <h3 className="heading__teritary"> Unlimited Plan </h3>
                <span className="pricing__price"> $39.00 </span>
                <span className="pricing__period"> MONTH </span>
                <p className="text__teritary">
                  Collaborative financial tracking and planning for small
                  businesses and enterprises.
                </p>
                <a href="">
                  <button className="btn btn-main--pricing"> Start Now </button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}
