import React from "react";
import "../css/About.css";

class About extends React.Component {
  render() {
    return (
      <div className="detail">
        <div className="row">
          <div className="col-2" />

          <div className="col-8">
            <div className="card bg-light mb-3">
              <div className="card-body">
                <h5 className="card-title">Slowly But Steady</h5>
                <p className="card-text">made by Lawyerd</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default About;
