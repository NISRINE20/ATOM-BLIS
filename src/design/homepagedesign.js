import styled from 'styled-components';
import { FaBars, FaDownload, FaChevronLeft, FaChevronRight } from 'react-icons/fa'; // Import Font Awesome icons

export const Container = styled.div`
  display: flex; /* Keep the sidebar and content side by side */
  height: 100vh; /* Ensure it covers the full viewport height */
  overflow: hidden; /* Prevent scrolling outside the container */
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`;

export const ChartContainer = styled.div`
  width: 80%;
  margin: auto;
  padding: 20px;
`;

export const DownloadIcon = styled(FaDownload)`
  font-size: 20px;
  color: white;
  cursor: pointer;
  transition: color 0.3s ease;
  margin-left: auto;

  &:hover {
    color: black; /* Change color on hover */
  }
`;

export const Header = styled.div`
  display: flex;
  flex-direction: column; /* Change to column to stack items vertically */
  align-items: center;
  padding: 5px 10px; /* Reduced top and bottom padding */
  background-color: white;
  border-bottom: 2px solid black;
  position: relative; /* Ensures absolute positioning works */
`;

export const HeaderRight = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
  margin-top: 10px;
`;

export const Title = styled.h1`
  font-weight: bold;
  margin: 0; /* Remove default margin */
`;

export const SearchBox = styled.input`
  padding: 5px;
  border: 1px solid black;
  border-radius: 4px;
  width: 200px; /* Set a fixed width for the search box */
  transition: width 0.3s ease; /* Add transition for smooth expansion */

  &:focus {
    width: 300px; /* Expand width when focused */
  }
`;

export const ProfileImage = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  border: 2px solid black;
  object-fit: cover;
  cursor: pointer;
`;

export const FileInput = styled.input`
  display: none;
`;

export const SidebarText = styled.p`
  font-weight: bold;
  text-align: center;
  margin-top: 10px;
  font-size: 9px; /* Make text slightly smaller */
`;

export const Navbar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  width: 100%;
`;

export const NavbarIcon = styled(FaBars)`
  font-size: 18px; /* Make icon slightly smaller */
  cursor: pointer;
  color: #ffffff;
  position: absolute;
  left: 18px;
  top: 42px;
  z-index: 1000;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.1);
  }
`;

export const HelpText = styled.span`
  margin-left: 10px;
  font-weight: bold;
  cursor: pointer;
`;

export const TableWrapper = styled.div`
  overflow-x: auto; /* Enable horizontal scrolling for the table content */
  overflow-y: auto; /* Enable vertical scrolling for the table content */
  width: 100%; /* Ensure the wrapper spans the full width */
  height: 550px; /* Set a fixed height for the table */
  box-sizing: border-box; /* Include padding and border in the width */
  scrollbar-width: thin; /* Show a thin scrollbar for Firefox */
  -ms-overflow-style: auto; /* Default scrollbar for IE and Edge */

  &::-webkit-scrollbar {
    width: 8px; /* Set scrollbar width for WebKit browsers */
  }

  &::-webkit-scrollbar-thumb {
    background-color: #ccc; /* Set scrollbar thumb color */
    border-radius: 4px; /* Add rounded corners to the scrollbar thumb */
  }

  &::-webkit-scrollbar-thumb:hover {
    background-color: #aaa; /* Change color on hover */
  }
`;
export const MenuBar = styled.div`
  background-color: #72bcd4;
  padding: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%; /* Ensure it spans the full width of the container */
  min-width: 1000px; /* Default minimum width */
  box-sizing: border-box; /* Include padding and border in the element's width */
  position: sticky; /* Make the MenuBar sticky */
  top: 0; /* Stick to the top of the container */
  z-index: 10; /* Ensure it stays above the table content */
  overflow-x: auto; /* Allow horizontal scrolling if content exceeds width */

  @media (min-width: 1600px) {
    min-width: 1600px; /* Adjust to 1600px if the table expands */
  }
`;
export const TableContainer = styled.div`
  flex-grow: 1; /* Allow the table container to take up remaining space */
  display: flex;
  flex-direction: column; /* Stack elements vertically */
  overflow: auto; /* Enable scrolling for the content */
  height: 100vh; /* Match the height of the container */
  box-sizing: border-box; /* Include padding and border in the width/height */
  padding: 20px;
  margin-top: 10px; /* Add spacing below the MenuBar */
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  min-width: 1000px; /* Default minimum width to trigger horizontal scrolling */

  @media (min-width: 1600px) {
    min-width: 1600px; /* Adjust to 1600px if the table expands */
  }
`;

export const Th = styled.th`
  border: 1px solid black;
  padding: 8px;
  font-size: 12px; /* Reduce text size for better fit */
  text-align: left;
`;

export const Td = styled.td`
  border: 1px solid black;
  padding: 8px;
  font-size: 12px; /* Reduce text size for better fit */
`;

export const Sidebar = styled.div`
  width: ${props => (props.visible ? '220px' : '60px')}; /* Fixed width for expanded and collapsed states */
  min-width: ${props => (props.visible ? '220px' : '60px')}; /* Prevent shrinking below the fixed width */
  max-width: ${props => (props.visible ? '220px' : '60px')}; /* Prevent expanding beyond the fixed width */
  height: 100vh;
  background: linear-gradient(135deg, #222d32, #222d32);
  border-right: ${props => (props.visible ? '2px solid #ffffff' : 'none')};
  padding: ${props => (props.visible ? '20px' : '0')};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow: hidden;
  transition: width 0.3s ease, padding 0.3s ease, border-right 0.3s ease;
  box-shadow: 4px 0px 10px rgba(76, 175, 80, 0.3);
  background-color: #333;
  align-items: flex-start;
`;

export const Title1 = styled.div`
  font-weight: bold;
  font-size: 1.5em;
  color: #ffffff;
  cursor: pointer;
  margin-left: 15px;
  visibility: ${props => (props.visible ? 'visible' : 'hidden')};
`;

export const UserInfo = styled.div`
  font-weight: bold;
  padding-bottom: 10px;
  border-bottom: 1px solid #ffffff;
  color: #ffffff;
  font-size: 1rem;
`;

export const MenuItem = styled.div`
  margin: 10px 0;
  padding: 0.7rem; /* Adjust padding for a more compact design */
  display: flex;
  align-items: center;
  cursor: pointer;
  border-radius: 5px;
  justify-content: flex-start;
  transition: background 0.3s ease, box-shadow 0.3s ease;
  color: #ffffff;
  font-weight: bold;
  font-size: 11px; /* Make text slightly smaller */
  width: 90%;
  text-transform: uppercase;

  &:hover {
    background-color: rgb(255, 255, 255);
    box-shadow: 0px 0px 10px rgb(255, 255, 255);
    color: black;
  }

  svg {
    font-size: 14px; /* Make icon slightly smaller */
    margin-right: 0.5rem;
  }
`;

export const RecommendationModal = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  width: 24%;
  background-color: white;
  border: 1px solid black;
  border-radius: 4px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  max-height: 200px;
  overflow-y: auto;
`;

export const RecommendationItem = styled.div`
  padding: 10px;
  cursor: pointer;
  border-bottom: 1px solid #e0e0e0;

  &:hover {
    background-color: #f0f0f0;
  }
`;

export const Tabs = styled.div`
  display: flex;
  justify-content: flex-start; /* Align tabs to the left */
  margin-right: auto; /* Push tabs to the left */
`;

export const TabButton = styled.button`
  background-color: ${props => (props.active ? 'white' : 'white')};
  color: ${props => (props.active ? 'black' : 'black')};
  border: 1px solid black;
  padding: 10px 20px;
  cursor: pointer;
  transition: background-color 0.3s ease, color 0.3s ease;

  &:not(:last-child) {
    border-right: none;
  }

  &:hover {
    background-color: black;
    color: white;
  }
`;

export const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 10px; /* Reduce margin */
  font-size: 12px; /* Make text smaller */
`;

export const PaginationButton = styled.button`
  background-color: #1E90FF;
  color: white;
  border: none;
  padding: 5px 10px; /* Reduce padding */
  margin: 0 5px;
  cursor: pointer;
  border-radius: 3px; /* Smaller border radius */
  font-size: 14px; /* Smaller font size */
  display: flex;
  align-items: center;
  justify-content: center;

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }

  svg {
    font-size: 14px; /* Icon size */
  }
`;