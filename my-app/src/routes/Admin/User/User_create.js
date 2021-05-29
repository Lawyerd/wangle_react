import React, { useState, useEffect, useCallback } from "react";
import { Redirect } from "react-router-dom";
import { Card, Button } from "react-bootstrap";

import "../../../css/Create.css";
import axios from "axios";
import validate from "../../../lib/validate.js";
import autoHypen from "../../../lib/autoHypen";

import isEmpty from "../../../lib/empty.js";
import country_list from "../../../lib/country.js";

function User_create() {
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
    const { name } = event.target;
    var { value } = event.target;
    setValues({ ...values, [name]: value });

    if (name === "country") {
      value = event.target.options[event.target.selectedIndex].value;

      setValues({ ...values, [name]: value });
    }
    if (name === "phone") {
      const hped_phone = autoHypen(value);
      setValues({ ...values, [name]: hped_phone });
    }
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
    return <Redirect to="../user" />;
  }

  return (
    <>
      <Card>
        <Card.Body>
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
                maxLength="13"
                style={{ borderRadius: "5px" }}
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
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <label
                  className="input-group-text"
                  htmlFor="inputGroupSelect01"
                >
                  country
                </label>
              </div>
              <select
                className="custom-select"
                id="inputGroupSelect01"
                name="country"
                onChange={handleChange}
              >
                {country_list.map(country => {
                  return (
                    <option value={country} key={country}>
                      {country}
                    </option>
                  );
                })}
              </select>
            </div>

            <div
              className="input-group flex-nowrap"
              style={{ marginBottom: "10px" }}
            >
              <span className="input-group-text" id="addon-wrapping">
                birth
              </span>
              <input
                type="date"
                name="birth"
                className="form-control"
                onChange={handleChange}
                value={values.birth}
              ></input>
            </div>

            <Button
              type="submit"
              className="btn btn-dark"
              disabled={submitting}
            >
              Create
            </Button>
          </form>
        </Card.Body>
      </Card>
    </>
  );
}

export default User_create;
