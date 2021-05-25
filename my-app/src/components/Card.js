import React from "react";
import { Link } from "react-router-dom";

function card({ id, title, description }) {
  const page = id;
  return (
    <div className="card bg-light mb-3">
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <p className="card-text">{description}</p>
        <Link to={{ pathname: `/user/${id}`, state: { page } }}>
          <button type="button" className="btn btn-dark">
            Click!
          </button>
        </Link>
      </div>
    </div>
  );
}

export default card;
