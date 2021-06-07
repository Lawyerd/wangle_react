import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { Card, Button } from "react-bootstrap";
import "../../../css/Create.css";
import axios from "axios";
import validate from "../../../lib/validate.js";
import isEmpty from "../../../lib/empty.js";
import InputSet from "../../../components/InputSet.js";
import SelectSet from "../../../components/SelectSet.js";
import base_url from "../../../data/base_url.js";

function User_create() {
  const [values, setValues] = useState({
    name: "",
    password: "",
    authority: "user",
    phone: "",
    email: "",
    country: "",
    birth: "",
  });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async event => {
    event.preventDefault();
    setSubmitting(true);
    setErrors(validate(values));
    await new Promise(r => setTimeout(r, 1000));
  };

  useEffect(() => {
    const post_data = () => {
      axios({
        method: "post",
        url: base_url + "/user/create",
        data: values,
      });
    };
    if (submitting) {
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
  }, [submitting, errors, values]);

  if (success) {
    return <Redirect to="../user" />;
  }

  return (
    <>
      <Card>
        <Card.Body>
          <form onSubmit={handleSubmit}>
            <InputSet
              input_name="name"
              values={values}
              setValues={setValues}
              placeholder="Jane Doe"
              className="form-control"
              type="text"
            ></InputSet>

            <InputSet
              className="form-control"
              input_name="email"
              values={values}
              setValues={setValues}
              placeholder="jane_lane@example.com"
              type="text"
            ></InputSet>

            <InputSet
              className="form-control"
              input_name="phone"
              values={values}
              setValues={setValues}
              placeholder="010-0000-0000"
              type="text"
            ></InputSet>

            <InputSet
              className="form-control"
              input_name="password"
              values={values}
              setValues={setValues}
              placeholder=" "
              type="text"
            ></InputSet>

            <SelectSet
              className="form-control"
              input_name="country"
              values={values}
              setValues={setValues}
            ></SelectSet>

            <InputSet
              className="form-control"
              input_name="birth"
              values={values}
              setValues={setValues}
              type="date"
            ></InputSet>

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
