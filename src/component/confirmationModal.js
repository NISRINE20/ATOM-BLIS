import React from 'react';
import { ModalContent1, Button, ModalBody, ModalFooter, ModalHeader, ModalOverlay } from '../design/modaldesign';

const ConfirmationModal = ({ isOpen, onClose, onConfirm, children }) => {
  if (!isOpen) return null;

  return (
    <ModalOverlay>
      <ModalContent1>
        <ModalHeader>Confirm Submission</ModalHeader>
        <ModalBody>{children}</ModalBody>
        <ModalFooter>
          <Button onClick={onClose}>Cancel</Button>
          <Button primary onClick={onConfirm}>Okay</Button>
        </ModalFooter>
      </ModalContent1>
    </ModalOverlay>
  );
};

export default ConfirmationModal;