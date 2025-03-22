import React from 'react';
import Modal from './modal';
import { ModalContent, Form, Input, ButtonContainer, Button } from '../design/modaldesign';
import styled from 'styled-components';

const ReadOnlyInput = styled(Input)`
  background-color: #f0f0f0; /* Light grey background */
  color: #888; /* Grey text color */
  pointer-events: none; /* Disable interactions */
`;

const AddModal = ({ isOpen, onClose, onSubmit }) => {
  return (
    <Modal isOpen={isOpen}>
      <ModalContent>
        <Form onSubmit={onSubmit}>
          <Input type="date" name="dateReceived" placeholder="Date Accession" required />
          <Input type="text" name="class" placeholder="Material Category" required />
          <Input type="text" name="author" placeholder="Author" required />
          <Input type="text" name="title" placeholder="Title of Book" required />
          <Input type="text" name="edition" placeholder="Edition" required />
          <Input type="text" name="volume" placeholder="Volume" required />
          <Input type="number" name="pages" placeholder="Pages" required />
          <Input type="text" name="recordOfSource" placeholder="Record of Source" required />
          <Input type="text" name="costPrice" placeholder="Cost Price" required />
          <Input type="text" name="publisher" placeholder="Publisher" required />
          <Input type="number" name="year" placeholder="Year" required />
          <Input type="text" name="barcode" placeholder="Barcode" required />
          <Select name="department" required>
            <option value="">Select Program</option>
            <option value="BSCRIM">BSCRIM</option>
            <option value="BSCE">BSCE</option>
            <option value="BSEE">BSEE</option>
            <option value="BSIT">BSIT</option>
            <option value="BLIS">BLIS</option>
            <option value="BSHM">BSHM</option>
            <option value="BSTM">BSTM</option>
            <option value="BA POL-SCI">BA POL-SCI</option>
            <option value="BACOMM - SPECIALIZING IN JOURNALISM AND BROADCASTING">BACOMM - SPECIALIZING IN JOURNALISM AND BROADCASTING</option>
            <option value="BA COMM - SPECIALIZING IN NEW MEDIA STUDIES">BA COMM - SPECIALIZING IN NEW MEDIA STUDIES</option>
            <option value="BA COMM - SPECIALIZING IN SOCIAL COMMUNICATIONS">BA COMM - SPECIALIZING IN SOCIAL COMMUNICATIONS</option>
            <option value="BA in ECONOMICS">BA in ECONOMICS</option>
            <option value="BA in ENGLISH LANGUAGE STUDIES">BA in ENGLISH LANGUAGE STUDIES</option>
            <option value="BA HISTORY">BA HISTORY</option>
            <option value="BA PHILOSOPHY">BA PHILOSOPHY</option>
            <option value="BS PSYCHOLOGY">BS PSYCHOLOGY</option>
            <option value="BS SOCIAL WORK">BS SOCIAL WORK</option>
            <option value="BSMT">BSMT</option>
            <option value="BS ACCOUNTANCY">BS ACCOUNTANCY</option>
            <option value="BSBA FIN-MANAGEMENT">BSBA FIN-MANAGEMENT</option>
            <option value="BSBA - HUMAN RESOURCES MANAGEMENT">BSBA - HUMAN RESOURCES MANAGEMENT</option>
            <option value="BSBA - MARKETING MANAGEMENT">BSBA - MARKETING MANAGEMENT</option>
            <option value="BS CUSTOMS ADMINISTRATION">BS CUSTOMS ADMINISTRATION</option>
            <option value="BS MANAGEMENT ACCOUNTING">BS MANAGEMENT ACCOUNTING</option>
            <option value="BS REAL ESTATE MANAGEMENT">BS REAL ESTATE MANAGEMENT</option>
            <option value="BS EARLY CHILDHOOD EDUCATION">BS EARLY CHILDHOOD EDUCATION</option>
            <option value="BS ELEMENTARY EDUCATION">BS ELEMENTARY EDUCATION</option>
            <option value="BS PHYSICAL EDUCATION">BS PHYSICAL EDUCATION</option>
            <option value="BS SECONDARY EDUCATION major in ENGLISH">BS SECONDARY EDUCATION major in ENGLISH</option>
            <option value="BS SECONDARY EDUCATION major in FILIPINO">BS SECONDARY EDUCATION major in FILIPINO</option>
            <option value="BS SECONDARY EDUCATION major in MATHEMATICS">BS SECONDARY EDUCATION major in MATHEMATICS</option>
            <option value="BS SECONDARY EDUCATION major in SCIENCE">BS SECONDARY EDUCATION major in SCIENCE</option>
            <option value="BS SECONDARY EDUCATION major in SOCIAL STUDIES">BS SECONDARY EDUCATION major in SOCIAL STUDIES</option>
            <option value="BS SECONDARY EDUCATION major in VALUES EDUCATION WITH CATECHETICS">BS SECONDARY EDUCATION major in VALUES EDUCATION WITH CATECHETICS</option>
            <option value="BACHELOR OF SPECIAL NEEDS EDUCATION GENERALIST">BACHELOR OF SPECIAL NEEDS EDUCATION GENERALIST</option>
          </Select>
          <ReadOnlyInput type="text" name="remarks" value="Available" readOnly /> {/* Read-only input for remarks */}
          <ButtonContainer>
            <Button type="button" onClick={onClose}>Cancel</Button>
            <Button type="submit" primary>Add</Button>
          </ButtonContainer>
        </Form>
      </ModalContent>
    </Modal>
  );
};

const Select = styled.select`
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
`;

export default AddModal;