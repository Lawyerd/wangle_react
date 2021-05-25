import React, { useState, useEffect, useCallback } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";
import "../css/Create.css";
import validate from "../lib/validate.js";
import isEmpty from "../lib/empty.js";

function Update(props) {
  const [values, setValues] = useState({
    name: "",
    phone: "",
    email: "",
    country: "",
    birth: "",
  });
  const [id, setID] = useState(1);
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const get_data = useCallback(async () => {
    const res_data = await axios.get(`http://localhost:2400/${id}`);
    const data = res_data.data[0];
    setValues(data);
  }, [id]);
  const update_data = useCallback(() => {
    axios({
      method: "post",
      url: `http://localhost:2400/update/${id}`,
      data: values,
    });
  }, [id, values]);

  useEffect(() => {
    const state = props.location.state;
    if (state === undefined) {
      props.history.push("/");
    } else {
      setID(state.page);
      get_data();
    }
  }, [id, get_data, props.location.state, props.history]);

  useEffect(() => {
    // console.log(errors);
    // console.log(submitting);
    // console.log(isEmpty(errors));
    if (submitting) {
      if (isEmpty(errors)) {
        setSubmitting(false);
        alert("Updated!");
        setValues({ name: "", phone: "", email: "", country: "", birth: "" });
        update_data();
        setSuccess(true);
      } else {
        alert(JSON.stringify(errors, null, 2));
        setSubmitting(false);
      }
    }
  }, [submitting, errors, update_data]);

  const handleSubmit = async event => {
    event.preventDefault();
    setSubmitting(true);
    setErrors(validate(values));
    await new Promise(r => setTimeout(r, 1000));
  };

  const handleChange = event => {
    const { name, value } = event.target;
    setValues({ ...values, [name]: value });
  };

  if (success) {
    return <Redirect to={"../user/" + id} />;
  }

  return (
    <div className="detail">
      <div className="row">
        <div className="col-2" />

        <div className="col-8">
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
      </div>
    </div>
  );
}
export default Update;
