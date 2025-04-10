import React from 'react';
import { ModalOverlay, ModalContent1, ModalHeader, ButtonContainer, Button } from '../design/modaldesign';

const EditModal = ({ isOpen, onClose, onSubmit, children }) => {
  if (!isOpen) return null;

  return (
    <ModalOverlay>
      <ModalContent1>
        <ModalHeader>Edit Book Details</ModalHeader>
        {children} {/* Render the passed children dynamically */}
        <ButtonContainer>
          <Button onClick={onClose}>Cancel</Button>
          <Button primary onClick={onSubmit}>
            Submit
          </Button>
        </ButtonContainer>
      </ModalContent1>
    </ModalOverlay>
  );
};

export default EditModal;