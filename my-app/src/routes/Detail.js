import React, { useState, useEffect, useCallback } from "react";
import { Redirect } from "react-router-dom";

import "../css/Detail.css";
import { Link } from "react-router-dom";
import axios from "axios";

function Detail(params) {
  const [page, setPage] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [values, setValues] = useState({
    id: "",
    name: "",
    phone: "",
    email: "",
    country: "",
    birth: "",
  });
  const [deleted, setDeleted] = useState(false);
  const get_data = useCallback(async () => {
    const user_data = await axios.get(`http://localhost:2400/${page}`);
    const user = user_data.data[0];
    setValues(user);
  }, [page]);
  const handleClick = () => {
    if (window.confirm(`Delete ${values.name}?`)) {
      axios({
        method: "post",
        url: "http://localhost:2400/delete",
        data: { id: values.id },
      });
      setDeleted(true);
    }
  };
  useEffect(() => {
    if (params.match.params.id !== undefined) {
      setPage(params.match.params.id);
    }
  }, [params.match.params.id]);
  useEffect(() => {
    if (page !== 0) {
      get_data(page);
      setIsLoading(false);
    }
  }, [page, isLoading, get_data]);

  if (deleted) {
    return <Redirect to={"/"} />;
  }

  return (
    <div className="detail">
      <div className="row">
        <div className="col-2" />

        <div className="col-8">
          {isLoading ? (
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          ) : (
            <div className="card bg-light mb-3">
              <div className="card-body">
                <h5 className="card-title">{values.name}</h5>
                <p className="card-text">{values.phone}</p>
                <p className="card-text">{values.email}</p>
                <p className="card-text">{values.country}</p>
                <p className="card-text">{values.birth}</p>

                <button
                  type="button"
                  onClick={handleClick}
                  className="btn btn-dark"
                  style={{ margin: "10px" }}
                >
                  delete
                </button>

                <Link
                  to={{ pathname: `/update/${values.id}`, state: { page } }}
                >
                  <button
                    type="button"
                    className="btn btn-dark"
                    style={{ margin: "10px" }}
                  >
                    update
                  </button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
export default Detail;
