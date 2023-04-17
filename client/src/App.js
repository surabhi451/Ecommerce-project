import React from "react"
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from "./pages/Login";
import Homepage from "./pages/Homepage";
import Register from "./pages/RegistrationForm";



function App() {
  return (
    <div className="bg-light">
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/' element={<Homepage/>}></Route>
        <Route path='/register' element={<Register/>}></Route>
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
