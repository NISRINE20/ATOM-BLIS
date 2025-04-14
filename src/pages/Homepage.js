import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import AddModal from '../component/addModal';
import ConfirmationModal from '../component/confirmationModal';
import FilterModal from '../component/FilterModal';
import SidebarComponent from './Sidebar';
import Charts from './Charts';
import EditModal from '../component/editRow';
import { Container, Header, HeaderRight, Title, SearchBox, HelpText, MenuBar, TableContainer, Table, Th, Td, RecommendationItem, RecommendationModal, DownloadIcon, PaginationContainer, PaginationButton, TableWrapper } from "../design/homepagedesign"
import Chatbot from '../component/Chatbot';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'; // Import Font Awesome icons

function UserPage() {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false); // State for EditModal
const [editFormData, setEditFormData] = useState({}); // State for the row being edited
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
  const [isDeletePasswordModalOpen, setIsDeletePasswordModalOpen] = useState(false); // State for delete confirmation modal
  const [deleteRowId, setDeleteRowId] = useState(null); // Track which row is being deleted
  const [deletePassword, setDeletePassword] = useState(''); // Password for delete confirmation
  const rowsPerPage = 10;
  const navigate = useNavigate();
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [filters, setFilters] = useState({
    id: '',
    material_category: '', // Added Material Category
    class: '', // Added Material Category
    call_number: '',
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
  


const handleDeleteClick = (rowId) => {
  setDeleteRowId(rowId);
  setIsDeletePasswordModalOpen(true); // Open delete confirmation modal
};
const handleEditClick = (row) => {
  setFormData(row); // Populate the form data with the selected row
  setIsEditModalOpen(true); // Open the EditModal
};
const handleEditModalClose = () => {
  setIsEditModalOpen(false); // Close the EditModal
  setEditFormData({}); // Clear the edit form data
};
const handleEditFormSubmit = async () => {
  try {
    // Ensure the id is included in the formData
    const payload = { ...formData, id: formData.id };

    // Log the payload to the console for debugging
    console.log('Payload being sent to the API:', payload);

    const response = await fetch('https://vynceianoani.helioho.st/bliss/editbook.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload), // Send the updated form data with id
    });

    const result = await response.json(); // Parse the JSON response
    console.log('API Response:', result); // Log the response for debugging

    if (response.ok && result.success) {
      // Update the table data with the edited row
      const updatedTableData = tableData.map((row) =>
        row.id === formData.id ? formData : row
      );
      setTableData(updatedTableData);
      setFilteredData(updatedTableData);
      setIsEditModalOpen(false); // Close the modal
      alert('Record updated successfully!'); // Notify the user
    } else {
      console.error('Failed to update the record:', result.error || 'Unknown error');
      alert(`Failed to update the record: ${result.error || 'Unknown error'}`); // Notify the user of the error
    }
  } catch (error) {
    console.error('An error occurred:', error);
    alert('An error occurred while updating the record. Please try again.'); // Notify the user of the error
  }
};
const handleDeletePasswordSubmit = async () => {
  if (deletePassword === 'hcdcpassword') { // Replace 'hcdcpassword' with the actual password
    setIsDeletePasswordModalOpen(false);
    setDeletePassword('');

    // Update the status to "Deleted" in the database
    const response = await fetch('https://vynceianoani.helioho.st/bliss/deleteBook.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: deleteRowId, status: 'Deleted' }),
    });

    if (response.ok) {
      // Update the table data to hide the row
      const updatedTableData = tableData.map((row) =>
        row.id === deleteRowId ? { ...row, remarks: 'Deleted' } : row
      );
      setTableData(updatedTableData);
      setFilteredData(updatedTableData.filter((row) => row.remarks !== 'Deleted')); // Filter out deleted rows
    } else {
      console.error('Failed to update status');
    }
  } else {
    alert('Incorrect password');
  }
};
const handleDeletePasswordModalClose = () => {
  setIsDeletePasswordModalOpen(false);
  setDeletePassword('');
};

  const handleAddMaterialsClick = () => {
    setShowModal(true);
  };
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
  
    // Replace "Others" with the custom edition value if applicable
    if (formData.get('edition') === 'Others') {
      formData.set('edition', formData.get('customEdition'));
    }
    if (formData.get('volume') === 'Others') {
      formData.set('volume', formData.get('customVolume'));
    }
  
    const newData = {
      id: formData.get('id'),
      dateReceived: formData.get('dateReceived'),
      class: formData.get('class'), 
      call_number: formData.get('call_number'), // This is the user-facing "class"
// This is the user-facing "class"
      class2: formData.get('class2'), // Map "class" to "class2" for the database
      author: formData.get('author'),
      title: formData.get('title'),
      edition: formData.get('edition'), // Updated to handle custom edition
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
    'NUMBER', 'DATE ACCESSION', 'MATERIAL CATEGORY', 'CLASS','CALL NUMBER', 'AUTHOR', 'TITLE OF BOOK', 
    'EDITION', 'VOLUME', 'PAGES', 'SOURCE OF FUND', 'COST PRICE', 'PUBLISHER', 
    'YEAR', 'BARCODE', 'PROGRAM', 'REMARKS', 'ACTIONS',
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
            <Title>Ascension X</Title>
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
      <Td>{row.class}</Td>
      <Td>{row.class2}</Td>
      <Td>{row.call_number}</Td>
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
      <Td>{row.remarks}</Td> {/* Add the remarks column */}
      <Td>
      <button onClick={() => handleEditClick(row)} style={{ marginRight: '10px' }}>Edit</button>

        <button onClick={() => handleDeleteClick(row.id)}>Delete</button> {/* Delete button */}
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
      <ConfirmationModal
  isOpen={isModalOpen}
  onClose={handleModalClose}
  onConfirm={handleModalConfirm}
  onBack={() => {
    setIsModalOpen(false); // Close the confirmation modal
    setShowModal(true); // Reopen the AddModal
  }}
>
  <p><strong>Date Received:</strong> {formData.dateReceived}</p>
  <p><strong>Material Category:</strong> {formData.class}</p>
  <p><strong>Class:</strong> {formData.class2}</p>
  <p><strong>Call Number:</strong> {formData.call_number}</p>
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
      
<ConfirmationModal
  isOpen={isDeletePasswordModalOpen}
  onClose={handleDeletePasswordModalClose}
  onConfirm={handleDeletePasswordSubmit}
>
  <p><strong>Are you sure you want to delete this record?</strong></p>
  <p>Enter password to confirm:</p>
  <input
    type="password"
    value={deletePassword}
    onChange={(e) => setDeletePassword(e.target.value)}
    style={{ marginBottom: '20px', padding: '15px', border: '1px solid #ced4da', borderRadius: '5px', fontSize: '16px', transition: 'border-color 0.3s' }}
    required
  />
</ConfirmationModal>
<EditModal
  isOpen={isEditModalOpen}
  onClose={handleEditModalClose}
  onSubmit={handleEditFormSubmit} // Use onSubmit instead of onSave
>
  <div
    style={{
      display: 'grid',
      gridTemplateColumns: '1fr 1fr', // Two equal-width columns
      columnGap: '40px', // Space between columns
      rowGap: '20px', // Space between rows
    }}
  >
    {/* Column 1 */}
    <div>
      <label><strong>ID:</strong></label>
      <input
        type="text"
        value={formData.id || ''}
        readOnly // Make the ID field read-only
        style={{ marginBottom: '10px', padding: '10px', width: '100%' }}
      />

      <label><strong>Date Received:</strong></label>
      <input
        type="date"
        value={formData.date_received || ''}
        onChange={(e) => setFormData({ ...formData, date_received: e.target.value })}
        style={{ marginBottom: '10px', padding: '10px', width: '100%' }}
      />

      <label><strong>Material Category:</strong></label>
      <input
        type="text"
        value={formData.class || ''}
        onChange={(e) => setFormData({ ...formData, class: e.target.value })}
        style={{ marginBottom: '10px', padding: '10px', width: '100%' }}
      />

      <label><strong>Class:</strong></label>
      <input
        type="text"
        value={formData.class2 || ''}
        onChange={(e) => setFormData({ ...formData, class2: e.target.value })}
        style={{ marginBottom: '10px', padding: '10px', width: '100%' }}
      />
<label><strong>Call Number:</strong></label>
      <input
        type="text"
        value={formData.call_number || ''}
        onChange={(e) => setFormData({ ...formData, call_number: e.target.value })}
        style={{ marginBottom: '10px', padding: '10px', width: '100%' }}
      />

      <label><strong>Author:</strong></label>
      <input
        type="text"
        value={formData.author || ''}
        onChange={(e) => setFormData({ ...formData, author: e.target.value })}
        style={{ marginBottom: '10px', padding: '10px', width: '100%' }}
      />

      <label><strong>Title:</strong></label>
      <input
        type="text"
        value={formData.title || ''}
        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        style={{ marginBottom: '10px', padding: '10px', width: '100%' }}
      />

      <label><strong>Edition:</strong></label>
      <input
        type="text"
        value={formData.edition || ''}
        onChange={(e) => setFormData({ ...formData, edition: e.target.value })}
        style={{ marginBottom: '10px', padding: '10px', width: '100%' }}
      />

      <label><strong>Volume:</strong></label>
      <input
        type="text"
        value={formData.volume || ''}
        onChange={(e) => setFormData({ ...formData, volume: e.target.value })}
        style={{ marginBottom: '10px', padding: '10px', width: '100%' }}
      />
    </div>

    {/* Column 2 */}
    <div>
      <label><strong>Pages:</strong></label>
      <input
        type="number"
        value={formData.pages || ''}
        onChange={(e) => setFormData({ ...formData, pages: e.target.value })}
        style={{ marginBottom: '10px', padding: '10px', width: '100%' }}
      />

      <label><strong>Record of Source:</strong></label>
      <input
        type="text"
        value={formData.record_of_source || ''}
        onChange={(e) => setFormData({ ...formData, record_of_source: e.target.value })}
        style={{ marginBottom: '10px', padding: '10px', width: '100%' }}
      />

      <label><strong>Cost Price:</strong></label>
      <input
        type="number"
        value={formData.cost_price || ''}
        onChange={(e) => setFormData({ ...formData, cost_price: e.target.value })}
        style={{ marginBottom: '10px', padding: '10px', width: '100%' }}
      />

      <label><strong>Publisher:</strong></label>
      <input
        type="text"
        value={formData.publisher || ''}
        onChange={(e) => setFormData({ ...formData, publisher: e.target.value })}
        style={{ marginBottom: '10px', padding: '10px', width: '100%' }}
      />

      <label><strong>Year:</strong></label>
      <input
        type="number"
        value={formData.year || ''}
        onChange={(e) => setFormData({ ...formData, year: e.target.value })}
        style={{ marginBottom: '10px', padding: '10px', width: '100%' }}
      />

      <label><strong>Barcode:</strong></label>
      <input
        type="text"
        value={formData.barcode || ''}
        onChange={(e) => setFormData({ ...formData, barcode: e.target.value })}
        style={{ marginBottom: '10px', padding: '10px', width: '100%' }}
      />

      <label><strong>Department:</strong></label>
      <input
        type="text"
        value={formData.department || ''}
        onChange={(e) => setFormData({ ...formData, department: e.target.value })}
        style={{ marginBottom: '10px', padding: '10px', width: '100%' }}
      />

      <label><strong>Remarks:</strong></label>
      <input
        type="text"
        value={formData.remarks || ''}
        onChange={(e) => setFormData({ ...formData, remarks: e.target.value })}
        style={{ marginBottom: '10px', padding: '10px', width: '100%' }}
      />
    </div>
  </div>
</EditModal>
      <Chatbot />
      <FilterModal
        isOpen={isFilterModalOpen}
        onClose={() => setIsFilterModalOpen(false)}
        filters={filters}
        onFilterChange={handleFilterChange}
        onApplyFilters={handleApplyFilters}
        setFilteredData={setFilteredData} // Pass setFilteredData to update the table
        tableData={tableData} // Pass tableData for 
      />
    </Container>
    
  );
}

export default UserPage;