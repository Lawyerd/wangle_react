import React, { useState, useEffect, useCallback } from "react";
import { Redirect } from "react-router-dom";

import "../css/Create.css";
import axios from "axios";
import validate from "../lib/validate.js";
import isEmpty from "../lib/empty.js";

function Create() {
  const [values, setValues] = useState({
    name: "",
    phone: "",
    email: "",
    country: "",
    birth: "",
  });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

  const [submitting, setSubmitting] = useState(false);

  const handleChange = event => {
    const { name, value } = event.target;
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = async event => {
    event.preventDefault();
    setSubmitting(true);
    setErrors(validate(values));
    await new Promise(r => setTimeout(r, 1000));
  };

  const post_data = useCallback(() => {
    axios({
      method: "post",
      url: "http://localhost:2400/create",
      data: values,
    });
  }, [values]);

  useEffect(() => {
    if (submitting) {
      console.log(errors);
      console.log(isEmpty(errors));
      if (isEmpty(errors)) {
        setSubmitting(false);
        alert("Submited!");
        setValues({ name: "", phone: "", email: "", country: "", birth: "" });
        post_data();
        setSuccess(true);
      } else {
        alert(JSON.stringify(errors, null, 2));
        setSubmitting(false);
      }
    }
  }, [submitting, post_data, errors]);

  if (success) {
    return <Redirect to="../" />;
  }

  return (
    <div className="detail">
      <div className="card bg-light mb-3">
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div
              className="input-group flex-nowrap"
              style={{ marginBottom: "10px" }}
            >
              <span className="input-group-text" id="addon-wrapping">
                name
              </span>
              <input
                type="text"
                name="name"
                className="form-control"
                onChange={handleChange}
                value={values.name}
                placeholder="Username"
              ></input>
            </div>
            <div
              className="input-group flex-nowrap"
              style={{ marginBottom: "10px" }}
            >
              <span className="input-group-text" id="addon-wrapping">
                phone
              </span>
              <input
                type="text"
                name="phone"
                className="form-control"
                onChange={handleChange}
                value={values.phone}
                placeholder="010-1234-1234"
              ></input>
            </div>
            <div
              className="input-group flex-nowrap"
              style={{ marginBottom: "10px" }}
            >
              <span className="input-group-text" id="addon-wrapping">
                email
              </span>
              <input
                type="text"
                name="email"
                className="form-control"
                onChange={handleChange}
                value={values.email}
                placeholder="jun126@example.com"
              ></input>
            </div>
            <div
              className="input-group flex-nowrap"
              style={{ marginBottom: "10px" }}
            >
              <span className="input-group-text" id="addon-wrapping">
                country
              </span>
              <input
                type="text"
                name="country"
                className="form-control"
                onChange={handleChange}
                value={values.country}
                placeholder="Korea"
              ></input>
            </div>
            <div
              className="input-group flex-nowrap"
              style={{ marginBottom: "10px" }}
            >
              <span className="input-group-text" id="addon-wrapping">
                birth
              </span>
              <input
                type="text"
                name="birth"
                className="form-control"
                onChange={handleChange}
                value={values.birth}
                placeholder="2000-11-03"
              ></input>
            </div>
            <button
              type="submit"
              className="btn btn-dark"
              disabled={submitting}
            >
              Create
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Create;
