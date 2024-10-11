import React, { useEffect } from "react";
import { useState } from "react";

import "./userDetails.scss";
import { Filter } from "./Filter.tsx";

export const UserDetails = (props) => {
  const [campaignData, setCampaignData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((json) => {
        const campaigns = props.campaigns.map((campaign) => {
          const User = json.find((user) => user.id === campaign.userId);
          return { ...campaign, userName: User ? User.name : "Unknown User" };
        });
        setFilteredData(campaigns);
        setCampaignData(campaigns);
      });
  }, [props.campaigns]);

  const handleSearchByName = (e) => {
    e.preventDefault();
    console.log(e);
    const updatedData = campaignData.filter((campaign) =>
      campaign.userName.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilteredData(updatedData);
  };

  const handleFilterByEndDate = (e, date) => {
    e.preventDefault();
    const updatedData = campaignData.filter((campaign) => {
      const campaignStartDate = new Date(campaign.startDate);
      const campaignEndDate = new Date(campaign.endDate);
      const startDate = date ? new Date(date) : new Date();
      return (
        campaignStartDate >= startDate && // Include campaigns that start on the startDate
        campaignEndDate <= new Date(e.target.value) // Include campaigns that end on the endDate
      );
    });
    setFilteredData(updatedData);
  };

  const handleFilterByStartDate = (e, date) => {
    e.preventDefault();
    const updatedData = campaignData.filter((campaign) => {
      const campaignStartDate = new Date(campaign.startDate);
      const campaignEndDate = new Date(campaign.endDate);
      const endDate = date ? new Date(date) : new Date();
      return (
        campaignStartDate >= new Date(e.target.value) && // Include campaigns that start on the startDate
        campaignEndDate <= endDate // Include campaigns that end on the endDate
      );
    });
    setFilteredData(updatedData);
  };

  return (
    <>
      <Filter
        handleSearchByName={handleSearchByName}
        handleFilterByEndDate={handleFilterByEndDate}
        handleFilterByStartDate={handleFilterByStartDate}
      />
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>User Name</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Status</th>
            <th>Budget</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((campaign) => {
            const status =
              new Date() > new Date(campaign.startDate) &&
              new Date() < new Date(campaign.endDate)
                ? true
                : false;
            return (
              <tr key={campaign.id}>
                <td>Campaign {campaign.id}</td>
                <td>{campaign.userName}</td>
                <td>{campaign.startDate}</td>
                <td>{campaign.endDate}</td>
                <td>
                  <span
                    className={status === true ? "active" : "inactive"}
                  ></span>
                  {status === true ? "Active" : "Inactive"}
                </td>
                <td>${campaign.Budget}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};
