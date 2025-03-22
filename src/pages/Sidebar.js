import React from 'react';
import { Sidebar, Navbar, Title1, NavbarIcon, UserInfo, MenuItem } from '../design/homepagedesign';
import Logout from './logout';
import styled from 'styled-components';
import { FaHome, FaFilter, FaPlus, FaChartBar } from 'react-icons/fa';

const ReadOnlyInput = styled.input`
  background-color: #f0f0f0; /* Light grey background */
  color: #888; /* Grey text color */
  pointer-events: none; /* Disable interactions */
  border: none; /* Remove border */
  font-size: 16px; /* Adjust font size */
  margin: 10px 0; /* Add margin */
`;

const SidebarComponent = ({ isDashboardVisible, toggleDashboard, userName, userPosition, handleFilterModalOpen, handleAddMaterialsClick, handleChartsClick, handleHomeClick, showCharts }) => {
  return (
    <Sidebar visible={isDashboardVisible}>
      <div>
        <Navbar>
          <Title1 visible={isDashboardVisible}>DASHBOARD</Title1>
          <NavbarIcon onClick={toggleDashboard} />
        </Navbar>
        {isDashboardVisible ? (
          <>
            <UserInfo>🔵 {userName} - {userPosition}</UserInfo>
            <MenuItem onClick={handleHomeClick}>
              <FaHome /> HOME
            </MenuItem>
            <MenuItem onClick={handleFilterModalOpen}>
              <FaFilter /> FILTER BY:
            </MenuItem>
            {showCharts ? (
              <ReadOnlyInput type="text" value="ADD MATERIALS" readOnly />
            ) : (
              <MenuItem onClick={handleAddMaterialsClick}>
                <FaPlus /> ADD MATERIALS
              </MenuItem>
            )}
            <MenuItem onClick={handleChartsClick}>
              <FaChartBar /> GRAPHS
            </MenuItem>
          </>
        ) : (
          <>
            <MenuItem onClick={handleHomeClick}>
              <FaHome />
            </MenuItem>
            <MenuItem onClick={handleFilterModalOpen}>
              <FaFilter />
            </MenuItem>
            {showCharts ? (
              <ReadOnlyInput type="text" value="+" readOnly />
            ) : (
              <MenuItem onClick={handleAddMaterialsClick}>
                <FaPlus />
              </MenuItem>
            )}
            <MenuItem onClick={handleChartsClick}>
              <FaChartBar />
            </MenuItem>
          </>
        )}
      </div>
      <Logout />
    </Sidebar>
  );
};

export default SidebarComponent;