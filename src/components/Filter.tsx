import React from "react";
import { useState } from "react";
import "./Filter.scss";

export const Filter = (props) => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [searchName, setSearchName] = useState("");

  return (
    <div className="filter-container">
      <div>
        <label>
          Start Date:
          <input
            type="date"
            value={startDate}
            onChange={(e) => {
              setStartDate(e.target.value);
              props.handleFilterByStartDate(e, endDate);
            }}
          />
        </label>
      </div>
      <div>
        <label>
          End Date:
          <input
            type="date"
            value={endDate}
            onChange={(e) => {
              setEndDate(e.target.value);
              props.handleFilterByEndDate(e, startDate);
            }}
          />
        </label>
      </div>
      <div className="search-input">
        <label>
          Search by Name:
          <input
            type="text"
            value={searchName}
            onChange={(e) => {
              props.handleSearchByName(e);
              setSearchName(e.target.value);
            }}
          />
        </label>
      </div>
    </div>
  );
};
