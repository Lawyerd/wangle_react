import React, { useState, useEffect, useCallback } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";
import "../../../css/Create.css";

import validate from "../../../lib/validate.js";
import autoHypen from "../../../lib/autoHypen";

import isEmpty from "../../../lib/empty.js";
import { Card, Button } from "react-bootstrap";
import country_list from "../../../lib/country.js";

function User_update(props) {
  const [values, setValues] = useState({
    id: "",
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
  const get_data = useCallback(async page => {
    const res_data = await axios.get(`http://localhost:2400/${page}`);
    const data = res_data.data[0];
    console.log(res_data);

    console.log(data);

    setValues(data);
    console.log(data);
  });
  const update_data = useCallback(async () => {
    await axios({
      method: "post",
      url: `http://localhost:2400/update/${values.id}`,
      data: values,
    });
  });

  useEffect(() => {
    const state = props.location.state;
    if (state === undefined) {
      props.history.push("/");
    } else {
      get_data(state.page);
    }
  }, []);

  useEffect(() => {
    if (submitting) {
      if (isEmpty(errors)) {
        setSubmitting(false);
        update_data();
        setSuccess(true);
        alert("Updated!");
      } else {
        alert(JSON.stringify(errors, null, 2));
        setSubmitting(false);
      }
    }
  }, [submitting, errors, update_data]);

  const handleSubmit = async event => {
    event.preventDefault();
    setSubmitting(true);
    console.log(values);
    setErrors(validate(values));
    await new Promise(r => setTimeout(r, 1000));
  };

  if (success) {
    return <Redirect to={"../" + values.id} />;
  }

  return (
    <div className="detail">
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
                value={values.country}
                onChange={handleChange}
              >
                {country_list.map(country => {
                  return (
                    <option key={country} value={country}>
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
              Update
            </Button>
          </form>
        </Card.Body>
      </Card>
    </div>
  );
}
export default User_update;
