import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";
import "../../../css/Create.css";
import validate from "../../../lib/validate.js";
import isEmpty from "../../../lib/empty.js";
import { Card, Button } from "react-bootstrap";
import InputSet from "../../../components/InputSet.js";
import SelectSet from "../../../components/SelectSet.js";
import base_url from "../../../data/base_url.js";

function User_update(props) {
  const [values, setValues] = useState({
    id: "",
    name: "",
    phone: "",
    authority: "user",
    salt: "salt_key",
    email: "",
    country: "",
    birth: "",
  });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const state = props.location.state;
    const get_data = async page => {
      const res_data = await axios.get(base_url + `/user/${page}`);
      const data = res_data.data[0];
      data.password = "";
      setValues(data);
    };
    if (state === undefined) {
      props.history.push("/");
    } else {
      get_data(state.page);
    }
  }, [props.history, props.location.state]);

  useEffect(() => {
    const update_data = async () => {
      await axios({
        method: "post",
        url: base_url + `/user/update/${values.id}`,
        data: values,
      });
    };
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
  }, [submitting, errors, values]);

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
              Update
            </Button>
          </form>
        </Card.Body>
      </Card>
    </>
  );
}
export default User_update;
