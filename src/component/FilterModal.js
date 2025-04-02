import React from 'react';
import { modalStyles } from '../design/filtermodal2';
import { FaTimes } from 'react-icons/fa'; // Import the Font Awesome close icon

const FilterModal = ({ isOpen, onClose, filters, onFilterChange, setFilteredData, tableData }) => {
  const handleInputChange = (field, value) => {
    onFilterChange(field, value);
  };

  const handleApplyFilters = () => {
    if (!tableData || tableData.length === 0) {
      console.error('Table data is not available or empty.');
      setFilteredData([]); // Ensure filteredData is cleared if no data is available
      onClose();
      return;
    }

    const filtered = tableData.filter((row) => {
      return Object.keys(filters).every((key) => {
        if (!filters[key]) return true; // Skip empty filters
        const rowValue = row[key]?.toString().toLowerCase();
        const filterValue = filters[key].toLowerCase();
        return rowValue?.includes(filterValue);
      });
    });

    setFilteredData(filtered);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal" style={modalStyles.modal}>
      <div className="modal-content" style={modalStyles.modalContent}>
        {/* Close button with Font Awesome icon */}
        <button style={modalStyles.closeButton} onClick={onClose}>
          <FaTimes />
        </button>
        <h2 style={{ textAlign: 'center', color: '#333' }}>Filter Records</h2>
        <div style={modalStyles.formGrid}>
          <label style={modalStyles.label}>
            ID:
            <input
              type="text"
              value={filters.id}
              onChange={(e) => handleInputChange('id', e.target.value)}
              style={modalStyles.input}
            />
          </label>
          <label style={modalStyles.label}>
            Material Category:
            <input
              type="text"
              value={filters.class}
              onChange={(e) => handleInputChange('class', e.target.value)}
              style={modalStyles.input}
            />
          </label>
          <label style={modalStyles.label}>
            Class:
            <input
              type="text"
              value={filters.class2}
              onChange={(e) => handleInputChange('class2', e.target.value)}
              style={modalStyles.input}
            />
          </label>
          <label style={modalStyles.label}>
            Date Received:
            <input
              type="date"
              value={filters.date_received}
              onChange={(e) => handleInputChange('date_received', e.target.value)}
              style={modalStyles.input}
            />
          </label>
          <label style={modalStyles.label}>
            Title:
            <input
              type="text"
              value={filters.title}
              onChange={(e) => handleInputChange('title', e.target.value)}
              style={modalStyles.input}
            />
          </label>
          <label style={modalStyles.label}>
            Author:
            <input
              type="text"
              value={filters.author}
              onChange={(e) => handleInputChange('author', e.target.value)}
              style={modalStyles.input}
            />
          </label>
          <label style={modalStyles.label}>
            Edition:
            <input
              type="text"
              value={filters.edition}
              onChange={(e) => handleInputChange('edition', e.target.value)}
              style={modalStyles.input}
            />
          </label>
          <label style={modalStyles.label}>
            Volume:
            <input
              type="text"
              value={filters.volume}
              onChange={(e) => handleInputChange('volume', e.target.value)}
              style={modalStyles.input}
            />
          </label>
          <label style={modalStyles.label}>
            Pages:
            <input
              type="number"
              value={filters.pages}
              onChange={(e) => handleInputChange('pages', e.target.value)}
              style={modalStyles.input}
            />
          </label>
          <label style={modalStyles.label}>
            Record of Source:
            <input
              type="text"
              value={filters.record_of_source}
              onChange={(e) => handleInputChange('record_of_source', e.target.value)}
              style={modalStyles.input}
            />
          </label>
          <label style={modalStyles.label}>
            Cost Price:
            <input
              type="number"
              value={filters.cost_price}
              onChange={(e) => handleInputChange('cost_price', e.target.value)}
              style={modalStyles.input}
            />
          </label>
          <label style={modalStyles.label}>
            Publisher:
            <input
              type="text"
              value={filters.publisher}
              onChange={(e) => handleInputChange('publisher', e.target.value)}
              style={modalStyles.input}
            />
          </label>
          <label style={modalStyles.label}>
            Year:
            <input
              type="number"
              value={filters.year}
              onChange={(e) => handleInputChange('year', e.target.value)}
              style={modalStyles.input}
            />
          </label>
          <label style={modalStyles.label}>
            Barcode:
            <input
              type="text"
              value={filters.barcode}
              onChange={(e) => handleInputChange('barcode', e.target.value)}
              style={modalStyles.input}
            />
          </label>
          <label style={modalStyles.label}>
            Department:
            <input
              type="text"
              value={filters.department}
              onChange={(e) => handleInputChange('department', e.target.value)}
              style={modalStyles.input}
            />
          </label>
          <label style={modalStyles.label}>
            Remarks:
            <input
              type="text"
              value={filters.remarks}
              onChange={(e) => handleInputChange('remarks', e.target.value)}
              style={modalStyles.input}
            />
          </label>
        </div>
        <button
          onClick={handleApplyFilters}
          style={{ ...modalStyles.button, ...modalStyles.applyButton }}
        >
          Apply Filters
        </button>
      </div>
    </div>
  );
};

export default FilterModal;