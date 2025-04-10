import React, { useState } from 'react';
import Modal from './modal';
import { ModalContent, Form, Input, ButtonContainer, Button } from '../design/modaldesign';
import styled from 'styled-components';

const ReadOnlyInput = styled(Input)`
  background-color: #f0f0f0; /* Light grey background */
  color: #888; /* Grey text color */
  pointer-events: none; /* Disable interactions */
`;

const InputWithPrefix = styled.div`
  position: relative;
  width: 100%;
  margin: 10px 0;
`;

const PesoSign = styled.span`
  position: absolute;
  top: 50%;
  left: 10px;
  transform: translateY(-50%);
  font-size: 16px;
  color: #888;
`;

const StyledInput = styled(Input)`
  padding-left: 30px; /* Add space for the peso sign */
`;

const Select = styled.select`
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
`;

const AddModal = ({ isOpen, onClose, onSubmit }) => {
  const [edition, setEdition] = useState('');
  const [customEdition, setCustomEdition] = useState('');
  const [volume, setVolume] = useState('');
  const [customVolume, setCustomVolume] = useState('');

  const handleEditionChange = (e) => {
    const value = e.target.value;
    setEdition(value);
    if (value !== 'Others') {
      setCustomEdition(''); // Clear custom input if not "Others"
    }
  };

  const handleVolumeChange = (e) => {
    const value = e.target.value;
    setVolume(value);
    if (value !== 'Others') {
      setCustomVolume(''); // Clear custom input if not "Others"
    }
  };


  return (
    <Modal isOpen={isOpen}>
      <ModalContent>
        <Form onSubmit={onSubmit}>
          <Input type="date" name="dateReceived" placeholder="Date Accession" required />
          <Select name="class" required>
            <option value="">Material Category</option>
            <option value="Gen. Ref">Gen. Ref</option>
            <option value="Filipiniana">Filipiniana</option>
            <option value="Circulation">Circulation</option>
            <option value="Fiction">Fiction</option>
          </Select>
          <Select name="class2" required>
            <option value="">Class</option>
            <option value="000-099">000 - 099</option>
            <option value="100-199">100 - 199</option>
            <option value="200-299">200 - 299</option>
            <option value="300-399">300 - 399</option>
            <option value="400-499">400 - 499</option>
            <option value="500-599">500 - 599</option>
            <option value="600-699">600 - 699</option>
            <option value="700-799">700 - 799</option>
            <option value="800-899">800 - 899</option>
            <option value="900-999">900 - 999</option>
          </Select>
          <Input type="text" name="author" placeholder="Author" required />
          <Input type="text" name="title" placeholder="Title of Book" required />
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Select name="edition" value={edition} onChange={handleEditionChange} required style={{ flex: '1' }}>
            <option value="">Select Edition</option>
            <option value="N/A">N/A</option>
            <option value="1st ed.">1st ed.</option>
            <option value="2nd ed.">2nd ed.</option>
            <option value="3rd ed.">3rd ed.</option>
            <option value="4th ed.">4th ed.</option>
            <option value="5th ed.">5th ed.</option>
            <option value="6th ed.">6th ed.</option>
            <option value="7th ed.">7th ed.</option>
            <option value="8th ed.">8th ed.</option>
            <option value="9th ed.">9th ed.</option>
            <option value="10th ed.">10th ed.</option>
            <option value="Others">Others</option>
          </Select>
          {edition === 'Others' && (
            <Input
              type="text"
              name="customEdition"
              placeholder="Enter custom edition"
              value={customEdition}
              onChange={(e) => setCustomEdition(e.target.value)}
              required
              style={{ flex: '2' }} // Adjust width for the input
            />
          )}
        </div>
           <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Select name="volume" value={volume} onChange={handleVolumeChange} required style={{ flex: '1' }}>
              <option value="">Select Volume</option>
              <option value="N/A">N/A</option>
              <option value="Vol. 1">Vol. 1</option>
              <option value="Vol. 2">Vol. 2</option>
              <option value="Vol. 3">Vol. 3</option>
              <option value="Vol. 4">Vol. 4</option>
              <option value="Vol. 5">Vol. 5</option>
              <option value="Vol. 6">Vol. 6</option>
              <option value="Vol. 7">Vol. 7</option>
              <option value="Vol. 8">Vol. 8</option>
              <option value="Vol. 9">Vol. 9</option>
              <option value="Vol. 10">Vol. 10</option>
              <option value="Others">Others</option>
            </Select>
            {volume === 'Others' && (
              <Input
                type="text"
                name="customVolume"
                placeholder="Enter custom volume"
                value={customVolume}
                onChange={(e) => setCustomVolume(e.target.value)}
                required
                style={{ flex: '2' }}
              />
            )}
          </div>
          <Input type="number" name="pages" placeholder="Pages" required />
          <Select name="recordOfSource" required>
            <option value="">Source of Fund</option>
            <option value="Purchased">Purchased</option>
            <option value="Donated">Donated</option>
          </Select>
          <InputWithPrefix>
            <PesoSign>₱</PesoSign>
            <StyledInput type="text" name="costPrice" placeholder="Cost Price" required />
          </InputWithPrefix>
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
            <option value="BA COMM - SPECIALIZING IN JOURNALISM AND BROADCASTING">BA COMM - SPECIALIZING IN JOURNALISM AND BROADCASTING</option>
            <option value="BA COMM - SPECIALIZING IN NEW MEDIA STUDIES">BA COMM - SPECIALIZING IN NEW MEDIA STUDIES</option>
            <option value="BA COMM - SPECIALIZING IN SOCIAL COMMUNICATIONS">BA COMM - SPECIALIZING IN SOCIAL COMMUNICATIONS</option>
            <option value="BA in ECONOMICS">BA in ECONOMICS</option>
            <option value="BA in ENGLISH LANGUAGE STUDIES">BA in ENGLISH LANGUAGE STUDIES</option>
            <option value="BA HISTORY">BA HISTORY</option>
            <option value="BA PHILOSOPHY">BA PHILOSOPHY</option>
            <option value="BS PSYCHOLOGY">BSPSYCH</option>
            <option value="BS SOCIAL WORK">BSSW</option>
            <option value="BSMT">BSMT</option>
            <option value="BS ACCOUNTANCY">BSA</option>
            <option value="BSBA FIN-MANAGEMENT">BSBA FIN-MANAGEMENT</option>
            <option value="BSBA - HUMAN RESOURCES MANAGEMENT">BSBA - HRM</option>
            <option value="BSBA - MARKETING MANAGEMENT">BSBA - MM</option>
            <option value="BS CUSTOMS ADMINISTRATION">BSCA</option>
            <option value="BS MANAGEMENT ACCOUNTING">BSMA</option>
            <option value="BS REAL ESTATE MANAGEMENT">BSREM</option>
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
          <ReadOnlyInput type="text" name="remarks" value="Available" readOnly />
          <ButtonContainer>
            <Button type="button" onClick={onClose}>Cancel</Button>
            <Button type="submit" primary>Add</Button>
          </ButtonContainer>
        </Form>
      </ModalContent>
    </Modal>
  );
};

export default AddModal;