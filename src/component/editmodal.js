import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  width: 600px;
  max-width: 90%;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const ModalHeader = styled.h2`
  margin: 0 0 20px;
  font-size: 1.5rem;
  text-align: center;
`;

const ModalBody = styled.div`
  margin-bottom: 20px;
`;

const Section = styled.div`
  margin-bottom: 20px;
`;

const SectionTitle = styled.h3`
  font-size: 1.2rem;
  margin-bottom: 10px;
  color: #333;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ced4da;
  border-radius: 5px;
  font-size: 1rem;
`;

const ModalFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
`;

const Button = styled.button`
  padding: 10px 15px;
  font-size: 1rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  background: ${(props) => (props.primary ? '#007bff' : '#6c757d')};
  color: #fff;

  &:hover {
    background: ${(props) => (props.primary ? '#0056b3' : '#5a6268')};
  }
`;

const EditModal = ({ isOpen, onClose, onSave, formData, setFormData }) => {
  if (!isOpen) return null;

  return (
    <ModalOverlay>
      <ModalContent>
        <ModalHeader>Edit Book Details</ModalHeader>
        <ModalBody>
          {/* Basic Information Section */}
          <Section>
            <SectionTitle>Basic Information</SectionTitle>
            <label>Date Received:</label>
            <Input
              type="date"
              value={formData.date_received || ''}
              onChange={(e) => setFormData({ ...formData, date_received: e.target.value })}
            />
            <label>Class:</label>
            <Input
              type="text"
              value={formData.class || ''}
              onChange={(e) => setFormData({ ...formData, class: e.target.value })}
            />
            <label>Material Category:</label>
            <Input
              type="text"
              value={formData.class2 || ''}
              onChange={(e) => setFormData({ ...formData, class2: e.target.value })}
            />
          </Section>

          {/* Details Section */}
          <Section>
            <SectionTitle>Details</SectionTitle>
            <label>Author:</label>
            <Input
              type="text"
              value={formData.author || ''}
              onChange={(e) => setFormData({ ...formData, author: e.target.value })}
            />
            <label>Title:</label>
            <Input
              type="text"
              value={formData.title || ''}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            />
            <label>Edition:</label>
            <Input
              type="text"
              value={formData.edition || ''}
              onChange={(e) => setFormData({ ...formData, edition: e.target.value })}
            />
            <label>Volume:</label>
            <Input
              type="text"
              value={formData.volume || ''}
              onChange={(e) => setFormData({ ...formData, volume: e.target.value })}
            />
            <label>Pages:</label>
            <Input
              type="number"
              value={formData.pages || ''}
              onChange={(e) => setFormData({ ...formData, pages: e.target.value })}
            />
          </Section>

          {/* Additional Information Section */}
          <Section>
            <SectionTitle>Additional Information</SectionTitle>
            <label>Record of Source:</label>
            <Input
              type="text"
              value={formData.record_of_source || ''}
              onChange={(e) => setFormData({ ...formData, record_of_source: e.target.value })}
            />
            <label>Cost Price:</label>
            <Input
              type="number"
              value={formData.cost_price || ''}
              onChange={(e) => setFormData({ ...formData, cost_price: e.target.value })}
            />
            <label>Publisher:</label>
            <Input
              type="text"
              value={formData.publisher || ''}
              onChange={(e) => setFormData({ ...formData, publisher: e.target.value })}
            />
            <label>Year:</label>
            <Input
              type="number"
              value={formData.year || ''}
              onChange={(e) => setFormData({ ...formData, year: e.target.value })}
            />
            <label>Barcode:</label>
            <Input
              type="text"
              value={formData.barcode || ''}
              onChange={(e) => setFormData({ ...formData, barcode: e.target.value })}
            />
            <label>Department:</label>
            <Input
              type="text"
              value={formData.department || ''}
              onChange={(e) => setFormData({ ...formData, department: e.target.value })}
            />
            <label>Remarks:</label>
            <Input
              type="text"
              value={formData.remarks || ''}
              onChange={(e) => setFormData({ ...formData, remarks: e.target.value })}
            />
            <label>Quantity:</label>
            <Input
              type="number"
              value={formData.quantity || ''}
              onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
            />
          </Section>
        </ModalBody>
        <ModalFooter>
          <Button onClick={onClose}>Cancel</Button>
          <Button primary onClick={onSave}>Save</Button>
        </ModalFooter>
      </ModalContent>
    </ModalOverlay>
  );
};

EditModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  formData: PropTypes.object.isRequired,
  setFormData: PropTypes.func.isRequired,
};

export default EditModal;