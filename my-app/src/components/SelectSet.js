import React from "react";
import country_list from "../lib/country.js";

function SelectSet({ input_name, values, setValues, className }) {
  const handleChange = event => {
    const { name } = event.target;
    var { value } = event.target;
    setValues({ ...values, [name]: value });

    if (input_name === "country") {
      value = event.target.options[event.target.selectedIndex].value;

      setValues({ ...values, [name]: value });
    }
  };
  return (
    <div className="input-group mb-3">
      <div className="input-group-prepend">
        <label className="input-group-text" htmlFor="inputGroupSelect01">
          {input_name}
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
  );
}
export default SelectSet;
