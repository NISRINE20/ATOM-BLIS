import React, { useEffect, useState } from 'react';
import { Bar, Line, Pie } from 'react-chartjs-2'; // Import Bar, Line, and Pie charts
import axios from 'axios';
import jsPDF from 'jspdf';
import { useNavigate, useLocation } from 'react-router-dom';
import html2canvas from 'html2canvas';
import { Container, Header, Title, DownloadIcon, ChartContainer } from '../design/chartdesign';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement, // Add this
  ArcElement,
  Title as ChartTitle,
  Tooltip,
  Legend,
} from 'chart.js';

import { MenuBar } from '../design/homepagedesign';
import SidebarComponent from './Sidebar';
import Modal from '../component/modal';
import { ModalContent, Form, Input, ButtonContainer, Button } from '../design/modaldesign';


ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement, // Register PointElement
  ArcElement,
  ChartTitle,
  Tooltip,
  Legend
);

const Charts = ({ handleDownloadClick }) => {
  const [chartData, setChartData] = useState({});
  const [isDashboardVisible, setIsDashboardVisible] = useState(true);
  const [selectedClassification, setSelectedClassification] = useState('');
  const [filterType, setFilterType] = useState('Material Category'); // Default filter type
  const [timeFrame, setTimeFrame] = useState('Monthly'); // Default time frame
  const [chartType, setChartType] = useState('Bar'); // Default chart type
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const { userName, userPosition } = location.state || { userName: 'User', userPosition: 'Position' };

  const toggleDashboard = () => {
    setIsDashboardVisible(prevState => !prevState);
  };

  useEffect(() => {
    const fetchData = async () => {
      let endpoint;
      if (filterType === 'Material Category') {
        endpoint = timeFrame === 'Monthly' ? 'graph.php' : timeFrame === 'Semestral' ? 'graphSemestral.php' : 'graphYearly.php';
      } else {
        endpoint = timeFrame === 'Monthly' ? 'graphProgram.php' : timeFrame === 'Semestral' ? 'graphProgramSemestral.php' : 'graphProgramYearly.php';
      }
      try {
        const response = await axios.get(`https://vynceianoani.helioho.st/bliss/${endpoint}`);
        const data = response.data;
        const chartData = {};

        data.forEach(item => {
          const { classification, department, month, semester, year, count } = item;
          const key = filterType === 'Material Category' ? classification : department;
          const label = timeFrame === 'Monthly' ? month : timeFrame === 'Semestral' ? semester : year;
          if (!chartData[key]) {
            chartData[key] = { labels: [], data: [] };
          }
          chartData[key].labels.push(label);
          chartData[key].data.push(Math.round(count)); // Round the count to the nearest integer
        });

        setChartData(chartData);
        setSelectedClassification(Object.keys(chartData)[0]); // Set the first classification as default
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [filterType, timeFrame]);

  const handlePasswordModalClose = () => {
    setIsPasswordModalOpen(false);
    setPassword('');
  };

  const handlePasswordSubmit = () => {
    if (password === 'your_password') { // Replace 'your_password' with the actual password
      generatePDF();
      handlePasswordModalClose();
    } else {
      alert('Incorrect password');
    }
  };

  const generatePDF = () => {
    const input = document.getElementById('chart-container');
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
      pdf.save('Digital_Accession_Records_Graph.pdf');
    });
  };

  if (Object.keys(chartData).length === 0) return <p>Loading...</p>;

  return (
    <Container style={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
      <SidebarComponent
        isDashboardVisible={isDashboardVisible}
        toggleDashboard={toggleDashboard}
        userName={userName}
        userPosition={userPosition}
        handleFilterModalOpen={null}
        handleAddMaterialsClick={null}
        handleChartsClick={() => navigate('/chart')}
        handleHomeClick={() => navigate('/user')}
      />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <Header>
          <Title>DIGITAL ACCESSION RECORDS GRAPH</Title>
        </Header>
        <MenuBar>
          <DownloadIcon onClick={() => setIsPasswordModalOpen(true)} />
          <select
            value={chartType}
            onChange={(e) => setChartType(e.target.value)}
            style={{ marginLeft: '20px' }}
          >
            <option value="Bar">Bar Graph</option>
            <option value="Line">Line Graph</option>
            <option value="Pie">Pie Chart</option>
          </select>
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            style={{ marginLeft: '20px' }}
          >
            <option value="Material Category">Material Category</option>
            <option value="Program">Program</option>
          </select>
          <select
            value={timeFrame}
            onChange={(e) => setTimeFrame(e.target.value)}
            style={{ marginLeft: '20px' }}
          >
            <option value="Monthly">Monthly</option>
            <option value="Semestral">Semestral</option>
            <option value="Yearly">Yearly</option>
          </select>
          <select
            value={selectedClassification}
            onChange={(e) => setSelectedClassification(e.target.value)}
            style={{ marginLeft: '20px' }}
          >
            {Object.keys(chartData).map(classification => (
              <option key={classification} value={classification}>
                {classification}
              </option>
            ))}
          </select>
        </MenuBar>
        <ChartContainer id="chart-container" style={{ flex: 1, overflowY: 'auto' }}>
          {selectedClassification && (
            <div style={{ marginBottom: '20px' }}>
              <h2>{selectedClassification}</h2>
              <div style={{ width: '600px', height: '400px', margin: '0 auto' }}> {/* Consistent container size */}
                {chartType === 'Bar' && (
                  <Bar
                    key={`Bar-${selectedClassification}`}
                    data={{
                      labels: chartData[selectedClassification].labels,
                      datasets: [{
                        label: `Count per ${timeFrame} for ${selectedClassification}`,
                        backgroundColor: "#1E90FF",
                        data: chartData[selectedClassification].data,
                      }],
                    }}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false, // Ensure it fits the container
                      scales: {
                        y: {
                          ticks: {
                            callback: function(value) {
                              return Number(value).toFixed(0); // Ensure whole numbers
                            }
                          }
                        }
                      }
                    }}
                  />
                )}
                {chartType === 'Line' && (
                  <Line
                    key={`Line-${selectedClassification}`}
                    data={{
                      labels: chartData[selectedClassification].labels,
                      datasets: [{
                        label: `Count per ${timeFrame} for ${selectedClassification}`,
                        borderColor: "#1E90FF",
                        backgroundColor: "rgba(30, 144, 255, 0.2)",
                        data: chartData[selectedClassification].data,
                        fill: true,
                      }],
                    }}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false, // Ensure it fits the container
                      scales: {
                        y: {
                          ticks: {
                            callback: function(value) {
                              return Number(value).toFixed(0); // Ensure whole numbers
                            }
                          }
                        }
                      }
                    }}
                  />
                )}
                {chartType === 'Pie' && (
                  <Pie
                    key={`Pie-${selectedClassification}`}
                    data={{
                      labels: chartData[selectedClassification].labels,
                      datasets: [{
                        label: `Count per ${timeFrame} for ${selectedClassification}`,
                        backgroundColor: chartData[selectedClassification].labels.map(() => `#${Math.floor(Math.random()*16777215).toString(16)}`),
                        data: chartData[selectedClassification].data,
                      }],
                    }}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false, // Ensure it fits the container
                    }}
                  />
                )}
              </div>
            </div>
          )}
        </ChartContainer>
      </div>
      <Modal isOpen={isPasswordModalOpen} onClose={handlePasswordModalClose}>
        <ModalContent>
          <Form onSubmit={(e) => { e.preventDefault(); handlePasswordSubmit(); }}>
            <Input
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <ButtonContainer>
              <Button type="button" onClick={handlePasswordModalClose}>Cancel</Button>
              <Button type="submit" primary>Submit</Button>
            </ButtonContainer>
          </Form>
        </ModalContent>
      </Modal>
    </Container>
  );
};

export default Charts;