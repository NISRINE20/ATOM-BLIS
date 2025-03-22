import styled from 'styled-components';
import { FaBars, FaDownload } from 'react-icons/fa';

export const Container = styled.div`
  display: flex;
  height: 100vh;
  overflow: hidden;
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
  padding: 15px;
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
`;

export const Navbar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  width: 100%;
`;


export const NavbarIcon = styled(FaBars)`
  font-size: 24px;
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

export const MenuBar = styled.div`
  background-color: #b22222;
  padding: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const TableContainer = styled.div`
  flex-grow: 1;
  padding: 20px;
  overflow: auto;
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

export const Th = styled.th`
  border: 1px solid black;
  padding: 8px;
  text-align: left;
`;

export const Td = styled.td`
  border: 1px solid black;
  padding: 8px;
`;

export const Sidebar = styled.div`
  width: ${props => (props.visible ? '250px' : '60px')};
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
  padding: 1rem;
  display: flex;
  align-items: center;
  cursor: pointer;
  border-radius: 5px;
  justify-content: flex-start;
  transition: background 0.3s ease, box-shadow 0.3s ease;
  color: #ffffff;
  font-weight: bold;
  width: 100%;
  text-transform: uppercase;

  &:hover {
    background-color: rgb(255, 255, 255);
    box-shadow: 0px 0px 10px rgb(255, 255, 255);
    color: black;
  }

    svg {
    font-size: 24px;
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
  margin-top: 20px;
`;

// Define PaginationButton styled component
export const PaginationButton = styled.button`
  background-color: #1E90FF;
  color: white;
  border: none;
  padding: 10px 20px;
  margin: 0 5px;
  cursor: pointer;
  border-radius: 5px;
  font-size: 16px;

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;