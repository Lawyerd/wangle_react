import React from "react";
import autoHypen from "../lib/autoHypen";

function Input_set({
  type,
  input_name,
  values,
  setValues,
  placeholder,
  className,
}) {
  const handleChange = event => {
    const { name } = event.target;
    var { value } = event.target;
    setValues({ ...values, [name]: value });

    if (input_name === "country") {
      value = event.target.options[event.target.selectedIndex].value;

      setValues({ ...values, [name]: value });
    }
    if (input_name === "phone") {
      const hped_phone = autoHypen(value);
      setValues({ ...values, [name]: hped_phone });
    }
  };
  return (
    <div className="input-group flex-nowrap" style={{ marginBottom: "10px" }}>
      <span className="input-group-text" id="addon-wrapping">
        {input_name}
      </span>
      <input
        type={type}
        name={input_name}
        className={className}
        onChange={handleChange}
        value={values[input_name] || ""}
        placeholder={placeholder}
      ></input>
    </div>
  );
}
export default Input_set;
