import React, { Component } from "react";
import { Link } from "react-router-dom";
import PageHeader from "./common/pageHeader";

class About extends Component {
  state = {};
  render() {
    const { user } = this.props;
    return (
      <div className="container">
        <PageHeader titleText="About"></PageHeader>
        <div className="row">
          <div className="col-12">
            <p
              style={{
                textShadow: "2px 2px 5px rgba(0,0,0,0.3)",
                fontSize: "1.3rem",
              }}
            >
              Recipe Share is where you keep all those recipes you love, and all
              those you'd love to try. it's your recipes, your way. <br />
              Feel free to post your favourite recipes – healthy or not – for
              cooking, baking, and grilling!
              <br />
              Recipe Share is an online space where people all over the world
              can share their tried and tested recipes easily and conveniently.
              <br />
              Recipe Share strives to help you achieve work-life balance, and
              part of that is making time to cook meals for yourself and your
              family. This recipe sharing group is a place to find quick weekday
              meals and other delicious recipes.
              <br />
            </p>
            {!user && (
              <div
                style={{
                  textShadow: "2px 2px 5px rgba(0,0,0,0.3)",
                  fontSize: "1.3rem",
                }}
              >
                To start: You need to join – it’s FREE!
                <Link className="text-decoration-none" to="/signup">
                  {" "}
                  Join today!
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default About;
