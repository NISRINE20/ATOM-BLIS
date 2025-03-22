import logo from './logo.svg';
import './App.css';
import Login from "./pages/Login";
import UserPage from "./pages/Homepage";
import Registration from './pages/Registration';
import Forget from './pages/Forget';
import ResetPassword from './pages/Reset';
import VerifyCode from './pages/Verify';
import Chart from './pages/Charts';

import { BrowserRouter as Router, Route, Routes, Navigate, useNavigate } from 'react-router-dom';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/user" element={<UserPage />} />
        <Route path="/forget" element={<Forget />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/verify-code" element={<VerifyCode />} />
        <Route path="*" element={<Navigate to="/" />} />
        <Route path="/register" element={<Registration />} />
        <Route path="/chart" element={<Chart />} />
      </Routes>
    </Router>
  );
}

export default App;

