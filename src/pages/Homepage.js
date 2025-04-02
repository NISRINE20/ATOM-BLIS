import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import AddModal from '../component/addModal';
import ConfirmationModal from '../component/confirmationModal';
import FilterModal from '../component/FilterModal';
import SidebarComponent from './Sidebar';
import Charts from './Charts';
import { Container, Header, HeaderRight, Title, SearchBox, HelpText, MenuBar, TableContainer, Table, Th, Td, RecommendationItem, RecommendationModal, DownloadIcon, PaginationContainer, PaginationButton, TableWrapper } from "../design/homepagedesign"
import Chatbot from '../component/Chatbot';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'; // Import Font Awesome icons

function UserPage() {
  const [showModal, setShowModal] = useState(false);
  const [tableData, setTableData] = useState([]); // Ensure tableData is initialized as an empty array
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [showRecommendations, setShowRecommendations] = useState(false);
  const [isDashboardVisible, setIsDashboardVisible] = useState(true);
  const [userName, setUserName] = useState('');
  const [userPosition, setUserPosition] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({});
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState('Available');
  const [showCharts, setShowCharts] = useState(false); // New state for showing charts
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;
  const navigate = useNavigate();
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [filters, setFilters] = useState({
    id: '',
    material_category: '', // Added Material Category
    class: '', // Added Material Category
    date_received: '',
    title: '',
    author: '',
    edition: '',
    volume: '',
    pages: '',
    record_of_source: '',
    cost_price: '',
    publisher: '',
    year: '',
    barcode: '',
    department: '',
    remarks: ''
  });

  const menuBarRef = useRef(null);
  const tableRef = useRef(null);

  useEffect(() => {
    const syncMenuBarWidth = () => {
      if (menuBarRef.current && tableRef.current) {
        menuBarRef.current.style.width = `${tableRef.current.offsetWidth}px`;
      }
    };

    // Sync width on mount, whenever the window resizes, or the current page changes
    syncMenuBarWidth();
    window.addEventListener('resize', syncMenuBarWidth);

    return () => {
      window.removeEventListener('resize', syncMenuBarWidth);
    };
  }, [currentPage]); // Add currentPage as a dependency

  useEffect(() => {
    // Fetch data from PHP API
    const fetchData = async () => {
      const response = await fetch('https://vynceianoani.helioho.st/bliss/getbook.php');
      const data = await response.json();
      const sortedData = data.sort((a, b) => b.id - a.id); // Sort in descending order by id
      setTableData(sortedData);
      setFilteredData(sortedData);
    };

    fetchData();
  }, []);

  useEffect(() => {
    // Lock the back button
    const handlePopState = (event) => {
      event.preventDefault();
      navigate('/user');
    };

    window.history.pushState(null, null, window.location.pathname);
    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [navigate]);

  useEffect(() => {
    if (activeTab === 'Available') {
      const filtered = tableData.filter((row) => row.remarks === 'Available');
      setFilteredData(filtered);
    }
  }, [tableData, activeTab]);

  useEffect(() => {
    // Fetch user details from PHP API
    const fetchUserDetails = async () => {
      const email = localStorage.getItem('email');
      if (email) {
        const response = await fetch('https://vynceianoani.helioho.st/bliss/getInfo.php', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email }),
        });

        const data = await response.json();

        if (response.ok && data.success) {
          setUserName(data.name);
          setUserPosition(data.position);
        } else {
          console.error(data.error || 'Failed to fetch user details');
        }
      }
    };

    fetchUserDetails();
  }, []);

  const handleFilterChange = (field, value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [field]: value,
    }));
  };
  
  const handleApplyFilters = () => {
    if (!tableData || tableData.length === 0) {
      console.error('Table data is not available or empty.');
      setFilteredData([]); // Ensure filteredData is cleared if no data is available
      return;
    }
  
    console.log('Filters:', filters); // Debugging log
    console.log('Table Data:', tableData); // Debugging log
  
    const filtered = tableData.filter((row) => {
      return Object.keys(filters).every((key) => {
        if (!filters[key]) return true; // Skip empty filters
        const rowValue = row[key]?.toString().toLowerCase();
        const filterValue = filters[key].toLowerCase();
        const match = rowValue?.includes(filterValue);
        console.log(`Filtering by ${key}: Row Value = ${rowValue}, Filter Value = ${filterValue}, Match = ${match}`); // Debugging log
        return match;
      });
    });
  
    console.log('Filtered Data:', filtered); // Debugging log
    setFilteredData(filtered);
    setIsFilterModalOpen(false);
  };

  const handleAddMaterialsClick = () => {
    setShowModal(true);
  };
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const newData = {
      id: formData.get('id'),
      dateReceived: formData.get('dateReceived'),
      class: formData.get('class'), // This is the user-facing "class"
      class2: formData.get('class2'), // Map "class" to "class2" for the database
      author: formData.get('author'),
      title: formData.get('title'),
      edition: formData.get('edition'),
      volume: formData.get('volume'),
      pages: formData.get('pages'),
      recordOfSource: formData.get('recordOfSource'),
      costPrice: formData.get('costPrice'),
      publisher: formData.get('publisher'),
      year: formData.get('year'),
      barcode: formData.get('barcode'),
      department: formData.get('department'),
      remarks: formData.get('remarks'),
    };
  
    setFormData(newData);
    setIsModalOpen(true);
    setShowModal(false);
  };

  const handleSearchChange = (event) => {
    const value = event.target.value.toLowerCase();
    setSearchTerm(value);
    const filtered = tableData.filter((row) =>
      Object.values(row).some(val =>
        val !== null && val !== undefined && val.toString().toLowerCase().includes(value)
      )
    );
    setFilteredData(filtered);
    setShowRecommendations(value.length > 0);
  };

  const handleRecommendationClick = (recommendation) => {
    setSearchTerm(recommendation.title);
    setShowRecommendations(false);
  };

  const toggleDashboard = () => {
    setIsDashboardVisible(prevState => !prevState);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleModalConfirm = async () => {
    setIsModalOpen(false);
    // Send data to PHP API
    const formDataToSend = new FormData();
    Object.keys(formData).forEach((key) => formDataToSend.append(key, formData[key]));
  
    const response = await fetch('https://vynceianoani.helioho.st/bliss/addbook.php', {
      method: 'POST',
      body: formDataToSend,
    });
  
    if (response.ok) {
      const updatedTableData = [...tableData, formData];
      const sortedData = updatedTableData.sort((a, b) => a.id - b.id);
      setTableData(sortedData);
      setFilteredData(sortedData);
      window.location.reload(); // Refresh the screen
    } else {
      console.error('Failed to add data');
    }
  };
  const handleDownloadClick = () => {
    setIsPasswordModalOpen(true);
  };

  const handlePasswordModalClose = () => {
    setIsPasswordModalOpen(false);
    setPassword('');
  };

  const handlePasswordSubmit = () => {
    if (password === 'sample') { // Replace 'your_password' with the actual password
      generatePDF();
      handlePasswordModalClose();
    } else {
      alert('Incorrect password');
    }
  };

  const generatePDF = () => {
    const input = document.getElementById('table');
    html2canvas(input, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'landscape',
        unit: 'in',
        format: 'legal'
      });
  
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
  
      // Calculate the aspect ratio of the image
      const aspectRatio = imgProps.width / imgProps.height;
  
      // Calculate the width and height of the image to fit within the PDF dimensions
      let width = pdfWidth - 2 * 0.5; // Subtract padding
      let height = width / aspectRatio;
  
      // If the height is too tall, adjust the width and height
      if (height > pdfHeight - 2 * 0.5) {
        height = pdfHeight - 2 * 0.5;
        width = height * aspectRatio;
      }
  
      // Center the image within the PDF
      const x = (pdfWidth - width) / 2;
      const y = (pdfHeight - height) / 2;
  
      pdf.addImage(imgData, 'PNG', x, y, width, height);
      pdf.save('Digital_Accession_Records.pdf');
    });
  };
  

  const handleTabClick = (event) => {
    const tab = event.target.value;
    setActiveTab(tab);
    if (tab === 'Remarks') {
      setFilteredData(tableData);
    } else {
      const filtered = tableData.filter((row) => row.remarks === tab);
      setFilteredData(filtered);
    }
  };

  const handleChartsClick = () => {
    navigate('/chart', { state: { userName, userPosition } });
  };

  const handleHomeClick = () => {
    setShowCharts(false);
  };

  const handleRemarksChange = async (event, row) => {
    const newRemarks = event.target.value;
    const updatedRow = { ...row, remarks: newRemarks };

    // Update the database
    const response = await fetch('https://vynceianoani.helioho.st/bliss/updateRemarks.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: row.id, remarks: newRemarks, date: new Date().toISOString().split('T')[0] }),
    });

    if (response.ok) {
      // Update the state
      const updatedTableData = tableData.map((item) =>
        item.id === row.id ? updatedRow : item
      );
      setTableData(updatedTableData);
      setFilteredData(updatedTableData);
    } else {
      console.error('Failed to update remarks');
    }
  };

  const columns = [
    'NUMBER', 'DATE ACCESSION', 'MATERIAL CATEGORY', 'CLASS', 'AUTHOR', 'TITLE OF BOOK', 'EDITION', 'VOLUME', 'PAGES', 'SOURCE OF FUND', 'COST PRICE', 'PUBLISHER', 'YEAR', 'BARCODE', 'PROGRAM', 'REMARKS',
  ];
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = filteredData.slice(indexOfFirstRow, indexOfLastRow);

  const totalPages = Math.ceil(filteredData.length / rowsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleFilterModalOpen = () => {
    setIsFilterModalOpen(true);
  };

  return (
    <Container>
      <SidebarComponent
        isDashboardVisible={isDashboardVisible}
        toggleDashboard={toggleDashboard}
        userName={userName}
        userPosition={userPosition}
        handleAddMaterialsClick={showCharts ? null : handleAddMaterialsClick} // Disable when showing charts
        handleChartsClick={handleChartsClick}
        handleHomeClick={handleHomeClick}
        showCharts={showCharts}
        handleFilterModalOpen={handleFilterModalOpen} // Pass the function to open the filter modal
      />
      {showCharts ? (
        <Charts
          handleDownloadClick={handleDownloadClick}
        />
      ) : (
        <TableContainer id="table-container">
          <Header>
            <Title>DIGITAL ACCESSION RECORDS</Title>
            <HeaderRight>
              <SearchBox
                type="text"
                placeholder="Search"
                value={searchTerm}
                onChange={handleSearchChange}
                style={{ marginRight: '10px' }}
              />
              {showRecommendations && (
                <RecommendationModal>
                  {filteredData.map((item, index) => (
                    <RecommendationItem key={index} onClick={() => handleRecommendationClick(item)}>
                      {item.title} by {item.author}
                    </RecommendationItem>
                  ))}
                </RecommendationModal>
              )}
              <HelpText>Help</HelpText>
            </HeaderRight>
          </Header>
          <TableWrapper>
            <MenuBar ref={menuBarRef}>
              <select value={activeTab} onChange={handleTabClick} style={{ marginRight: '10px' }}>
                <option value="Remarks">All</option>
                <option value="Lost">Lost</option>
                <option value="Donate">Donate</option>
                <option value="Damage">Damage</option>
                <option value="Available">Available</option>
              </select>
              <DownloadIcon onClick={handleDownloadClick} />
            </MenuBar>
            <Table id="table" ref={tableRef}>
              <thead>
                <tr>
                  {columns.map((column) => (
                    <Th key={column}>{column}</Th>
                  ))}
                </tr>
              </thead>
              <tbody>
  {filteredData.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage).map((row, index) => (
    <tr key={index}>
      <Td>{row.id}</Td>
      <Td>{row.date_received}</Td>
      <Td>{row.class}</Td> {/* Material Category */}
      <Td>{row.class2}</Td> {/* Class column mapped to class2 */}
      <Td>{row.author}</Td>
      <Td>{row.title}</Td>
      <Td>{row.edition}</Td>
      <Td>{row.volume}</Td>
      <Td>{row.pages}</Td>
      <Td>{row.record_of_source}</Td>
      <Td>₱{row.cost_price}</Td>
      <Td>{row.publisher}</Td>
      <Td>{row.year}</Td>
      <Td>{row.barcode}</Td>
      <Td>{row.department}</Td>
      <Td>
        <select value={row.remarks} onChange={(e) => handleRemarksChange(e, row)}>
          <option value="Available">Available</option>
          <option value="Damage">Damage</option>
          <option value="Lost">Lost</option>
          <option value="Donate">Donate</option>
        </select>
      </Td>
    </tr>
  ))}
</tbody>
            </Table>
          </TableWrapper>
          <PaginationContainer>
            <PaginationButton onClick={handlePreviousPage} disabled={currentPage === 1}>
              <FaChevronLeft /> {/* Previous icon */}
            </PaginationButton>
            <span>Page {currentPage} of {totalPages}</span>
            <PaginationButton onClick={handleNextPage} disabled={currentPage === totalPages}>
              <FaChevronRight /> {/* Next icon */}
            </PaginationButton>
          </PaginationContainer>
        </TableContainer>
      )}
      <AddModal isOpen={showModal} onClose={() => setShowModal(false)} onSubmit={handleFormSubmit} />
      <ConfirmationModal isOpen={isModalOpen} onClose={handleModalClose} onConfirm={handleModalConfirm}>
        <p><strong>Date Received:</strong> {formData.dateReceived}</p>
        <p><strong>Class:</strong> {formData.class}</p>
        <p><strong>Author:</strong> {formData.author}</p>
        <p><strong>Title:</strong> {formData.title}</p>
        <p><strong>Edition:</strong> {formData.edition}</p>
        <p><strong>Volume:</strong> {formData.volume}</p>
        <p><strong>Pages:</strong> {formData.pages}</p>
        <p><strong>Record of Source:</strong> {formData.recordOfSource}</p>
        <p><strong>Cost Price:</strong> {formData.costPrice}</p>
        <p><strong>Publisher:</strong> {formData.publisher}</p>
        <p><strong>Year:</strong> {formData.year}</p>
        <p><strong>Barcode:</strong> {formData.barcode}</p>
        <p><strong>Department:</strong> {formData.department}</p>
        <p><strong>Remarks:</strong> {formData.remarks}</p>
      </ConfirmationModal>
      <ConfirmationModal isOpen={isPasswordModalOpen} onClose={handlePasswordModalClose} onConfirm={handlePasswordSubmit}>
        <p><strong>Enter Password to Download PDF:</strong></p>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ marginBottom: '20px', padding: '15px', border: '1px solid #ced4da', borderRadius: '5px', fontSize: '16px', transition: 'border-color 0.3s' }}
          required
        />
      </ConfirmationModal>
      <Chatbot />
      <FilterModal
        isOpen={isFilterModalOpen}
        onClose={() => setIsFilterModalOpen(false)}
        filters={filters}
        onFilterChange={handleFilterChange}
        onApplyFilters={handleApplyFilters}
        setFilteredData={setFilteredData} // Pass setFilteredData to update the table
        tableData={tableData} // Pass tableData for filtering
      />
    </Container>
  );
}

export default UserPage;