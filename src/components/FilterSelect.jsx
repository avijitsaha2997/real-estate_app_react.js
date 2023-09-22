import React, { useEffect } from "react";
import { useStateValue } from "../states/StateProvider.jsx";

const FilterSelect = (props) => {
  const [{ filterValues }, dispatch] = useStateValue();
  function changed(e) {
    if (props.searchBy === "Developer Type") {
      if (e.target.value === "Developer Type") {
        dispatch({
          type: "setFilterValues",
          item: { ...filterValues, developers: null },
        });
      } else {
        dispatch({
          type: "setFilterValues",
          item: { ...filterValues, developers: e.target.value },
        });
      }
    } else if (props.searchBy === "Property Areas") {
      if (e.target.value === "Property Areas") {
        dispatch({
          type: "setFilterValues",
          item: { ...filterValues, propertyAreas: null },
        });
      } else {
        dispatch({
          type: "setFilterValues",
          item: { ...filterValues, propertyAreas: e.target.value },
        });
      }
    } else if (props.searchBy === "Development Type") {
      if (e.target.value === "Development Type") {
        dispatch({
          type: "setFilterValues",
          item: { ...filterValues, developmentTypes: null },
        });
      } else {
        dispatch({
          type: "setFilterValues",
          item: { ...filterValues, developmentTypes: e.target.value },
        });
      }
    } else if (props.searchBy === "Property Types") {
      if (e.target.value === "Property Types") {
        dispatch({
          type: "setFilterValues",
          item: { ...filterValues, propertyTypes: null },
        });
      } else {
        dispatch({
          type: "setFilterValues",
          item: { ...filterValues, propertyTypes: e.target.value },
        });
      }
    } else if (props.searchBy === "Completions") {
      if (e.target.value === "Completions") {
        dispatch({
          type: "setFilterValues",
          item: { ...filterValues, completions: null },
        });
      } else {
        dispatch({
          type: "setFilterValues",
          item: { ...filterValues, completions: e.target.value },
        });
      }
    }
    localStorage.setItem(props.searchBy, e.target.value);
  }

  useEffect(() => {
    // This effect runs whenever the component renders
    const selectedValue = localStorage.getItem(props.searchBy);

    if (selectedValue !== null) {
      // Dispatch the selected value when the component renders
      dispatch({
        type: "setFilterValues",
        item: {
          ...filterValues,
          [props.searchBy]: selectedValue,
        },
      });
    }
  }, []);

  return (
    <select
      name={props.selectBy}
      id={props.selectBy}
      onChange={changed}
      value={localStorage.getItem(props.searchBy) || null}
      // defaultValue={localStorage.getItem(props.searchBy) || null}
      className="outline-none filterSelect"
      style={{
        width: "210px",
        paddingTop: "6px",
        paddingBottom: "8px",
        fontSize: "14px",
        fontWeight: "100",
      }}>
      <option className="font-roboto text-md" value={null}>
        {props.searchBy}
      </option>
      {props.selectBy?.map((item) => (
        <option
          className="font-roboto text-lg "
          value={item._id ? item._id : item}
          key={item._id}>
          {item.name ? item.name : item.areaName ? item.areaName : item}
        </option>
      ))}
    </select>
  );
};

export default FilterSelect;
