import React, { useState, useEffect, useCallback } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";
import "../css/Create.css";
import validate from "../lib/validate.js";
import isEmpty from "../lib/empty.js";

function Update(props) {
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
  const get_data = useCallback(async page => {
    const res_data = await axios.get(`http://localhost:2400/${page}`);
    const data = res_data.data[0];
    console.log(res_data);

    console.log(data);

    setValues(data);
    console.log(data);

    console.log(values);
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
    // console.log(errors);
    // console.log(`제출? ${submitting}`);
    // console.log(`에러가 비었나? ${isEmpty(errors)}`);
    if (submitting) {
      if (isEmpty(errors)) {
        setSubmitting(false);
        update_data();
        // setValues({ name: "", phone: "", email: "", country: "", birth: "" });
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

  const handleChange = event => {
    const { name, value } = event.target;
    console.log({ ...values });
    console.log({ [name]: value });
    setValues({ ...values, [name]: value });
  };

  if (success) {
    return <Redirect to={"../user/" + values.id} />;
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
              Update
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
export default Update;
