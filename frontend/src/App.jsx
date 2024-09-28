import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import FileConverter from './components/File';
import Navbar from './components/Navbar';
import Home from './components/Home.jsx';
import ContactPage from './components/ContactPage.jsx'
import Edit from './components/Edit.jsx'
import Merge from './components/subComponents/mergePdf.jsx'
import Sign from './components/Sign.jsx'
import Imgtopdf from './components/subComponents/img_to_pdf.jsx'
import PdftoImg from './components/subComponents/PdfToImages.jsx'
import Pdftodocx from './components/subComponents/Pdftodocx.jsx'
import DocxToPdf from './components/subComponents/DocxToPdf.jsx'
import Exceltopdf from './components/subComponents/Xltopdf.jsx'
import Ppttopdf from './components/subComponents/ppt_to_pdf.jsx'
import PdfToPptx from './components/subComponents/pdfToPptx.jsx'
import Imgtodocx from './components/subComponents/Imgtodocx.jsx'
import Login from './components/Login.jsx'
import Register from './components/Register.jsx';



const App = () => {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
        <Route path="/" element={<Home/>}/>
          <Route path="/home" element={<Home/>}/>
          <Route path="/File" element={<FileConverter />} />
          <Route path='/ContactPage' element={<ContactPage/>}/>
          <Route path='/Edit' element={<Edit/>}/>
          <Route path='/Sign' element={<Sign/>}/>
          <Route path='/mergePdf' element={<Merge/>}/>
          <Route path='/img_to_pdf' element={<Imgtopdf/>}/>
          <Route path='/ppt_to_pdf' element={<Ppttopdf/>}/>
          <Route path='/PdfToImages' element={<PdftoImg/>}/>
          <Route path='/Pdftodocx' element={<Pdftodocx/>}/>
          <Route path='/DocxToPdf' element={<DocxToPdf/>}/>
          <Route path='/Xltopdf' element={<Exceltopdf/>}/>
          <Route path='/pdftopptx' element={<PdfToPptx/>}/>
          <Route path='/Imgtodocx' element={<Imgtodocx/>}/>

          <Route path='/login' element={<Login/>}/>
          <Route path='/signup' element={<Register/>}/>
        </Routes>
        
      </div>
    </Router>
  );
};

export default App;
