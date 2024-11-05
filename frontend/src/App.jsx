import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import FileConverter from './components/File';
import Navbar from './components/Navbar';
import Home from './components/Home.jsx';
import ContactPage from './components/ContactPage.jsx';
import Edit from './components/Edit.jsx';
import Merge from './components/subComponents/mergePdf.jsx';
import Sign from './components/Sign.jsx';
import Imgtopdf from './components/subComponents/img_to_pdf.jsx';
import PdftoImg from './components/subComponents/PdfToImages.jsx';
import Pdftodocx from './components/subComponents/Pdftodocx.jsx';
import DocxToPdf from './components/subComponents/DocxToPdf.jsx';
import Exceltopdf from './components/subComponents/Xltopdf.jsx';
import Ppttopdf from './components/subComponents/ppt_to_pdf.jsx';
import PdfToPptx from './components/subComponents/pdfToPptx.jsx';
import Imgtodocx from './components/subComponents/Imgtodocx.jsx';
import Login from './components/Login.jsx';
import Register from './components/Register.jsx';
import ProtectedRoute from './ProtectedRoute.jsx';
import { AuthProvider } from './AuthContext';

const App = () => {
  const [refresh, setRefresh] = useState(0); // State to trigger refresh
  
  const refreshHome = () => {
    setRefresh(prev => prev + 1); // Update state to force Home refresh
  };
  return (
    <Router> {/* Place Router outside of AuthProvider */}
      <AuthProvider> {/* AuthProvider can now safely use useNavigate */}
        <div className="App">
        <Navbar refreshHome={refreshHome} />
          {/* <Navbar /> */}
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home refresh={refresh} />} />
            {/* <Route path="/home" element={<Home />} /> */}
            <Route path="/File" element={<FileConverter />} />
            <Route path="/ContactPage" element={<ContactPage />} />
            <Route path="/Edit" element={<Edit />} />
            <Route path="/Sign" element={<Sign />} />

            {/* Protected Routes */}
            <Route
              path="/mergePdf"
              element={
                <ProtectedRoute>
                  <Merge />
                </ProtectedRoute>
              }
            />
            <Route
              path="/img_to_pdf"
              element={
                <ProtectedRoute>
                  <Imgtopdf />
                </ProtectedRoute>
              }
            />
            <Route
              path="/PdfToImages"
              element={
                <ProtectedRoute>
                  <PdftoImg />
                </ProtectedRoute>
              }
            />
            <Route
              path="/Pdftodocx"
              element={
                <ProtectedRoute>
                  <Pdftodocx />
                </ProtectedRoute>
              }
            />
            <Route
              path="/DocxToPdf"
              element={
                <ProtectedRoute>
                  <DocxToPdf />
                </ProtectedRoute>
              }
            />
            <Route
              path="/Xltopdf"
              element={
                <ProtectedRoute>
                  <Exceltopdf />
                </ProtectedRoute>
              }
            />
            <Route
              path="/ppt_to_pdf"
              element={
                <ProtectedRoute>
                  <Ppttopdf />
                </ProtectedRoute>
              }
            />
            <Route
              path="/pdftopptx"
              element={
                <ProtectedRoute>
                  <PdfToPptx />
                </ProtectedRoute>
              }
            />
            <Route
              path="/Imgtodocx"
              element={
                <ProtectedRoute>
                  <Imgtodocx />
                </ProtectedRoute>
              }
            />

            {/* Authentication Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Register />} />
          </Routes>
        </div>
      </AuthProvider>
    </Router>
  );
};

export default App;
