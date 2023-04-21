import React from "react"
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from "./pages/Login";
import Homepage from "./pages/Homepage";
import Register from "./pages/RegistrationForm";
import AddToCart from "./pages/AddToCart";
import ViewProduct from "./pages/ViewProduct";

function App() {
  return (
    <div className="bg-light">
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/' element={<Homepage/>}></Route>
        <Route path='/register' element={<Register/>}></Route>
        <Route path='/cart' element={<AddToCart/>}></Route>
        <Route path='/viewinfo/:id' element={<ViewProduct/>}></Route>
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
