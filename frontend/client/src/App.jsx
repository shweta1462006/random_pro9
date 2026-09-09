import React from 'react'
import Navbar from "./Pages/Navbar.jsx";
import LoginPages from "./Pages/loginPage.jsx"
import RegisterPage from "./Pages/registerPage.jsx"
import Form from './form.jsx';
import { BrowserRouter,Routes,Route,  } from 'react-router-dom'

export default function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Navbar/>} />
      <Route path="/form" element={<Form/>} />
      <Route path="/login" element={<LoginPages/>} />
      <Route path="/register" element={<RegisterPage/>} />
  
    </Routes>
    </BrowserRouter>
   
  )
}
