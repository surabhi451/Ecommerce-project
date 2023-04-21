import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeItem, incQuantity, decQuantity } from "../components/Redux/cartslice";
import 'react-toastify/dist/ReactToastify.css';
import Button from '@mui/material/Button';
import { Link } from "react-router-dom";
import DrawerAppBar from "../components/Navbar";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState } from "react";
import axios from "axios";

function AddToCart() {
  const [counter, setCounter] = useState(1)
  const dispatch = useDispatch();
  const products = useSelector(state => state.carts.products);
  const itemQuantities = useSelector(state => state.carts.itemQuantity);
  console.log("itemquantity", itemQuantities)
  const [subTotal, setSubTotal] = useState(0);
  useEffect(() => {
    calculateSubtotal();
  }, [products, itemQuantities]);
  const calculateSubtotal = () => {
    let sum = 0;
    products.map((item, index) => {
      sum += item.price * itemQuantities[index];
    });
    setSubTotal(sum);
  };
  console.log("the result from cart is subtotal ", subTotal);
  if (products.length === 0) {
    return (
      <>
        <div className="dashboard-topnav">
          <DrawerAppBar />
        </div>
        <div style={{ height: '180px' }}></div>
        <div className="h-100 h-custom" >
          <div className="row">
            <div className="col-md-12">
              <div className="card" >
                <div className="cards-body cart" >
                  <div className="col-sm-12 empty-cart-cls text-center" >
                    <img src="https://i.imgur.com/dCdflKN.png" width="130" height="130" className="img-fluid mb-4 mr-3" />
                    <h3><strong>Your Cart is Empty </strong></h3>
                    <h4>Add something to make your day happy :)</h4><br></br>
                    <Button variant="outlined"><Link to={'/'}>continue shopping</Link></Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    )
  } else {
    const shippingFee = Math.floor(subTotal * 0.15);
    const totalPrice = subTotal + shippingFee;

    const remove = (index) => {
      dispatch(removeItem(index));
    };
    const Increment = (index) => {
      dispatch(incQuantity(index));
      setCounter((prevCounter) => prevCounter + 1);
      console.log("index vale is", index)
    };
    const Decrement = (index) => {
      dispatch(decQuantity(index));
      setCounter((prevCounter) => prevCounter - 1);
      console.log("index vale is", index)
    };
    const success = () => {
      toast('Order successfully submitted!',
        { position: toast.POSITION.TOP_CENTER });
    }
    return (
      <>
        <div className="dashboard-topnav">
          <DrawerAppBar />
        </div>
        <section className="h-100 h-custom" style={{ backgroundcolor: '#d2c9ff' }}>
          <div className="container py-5 h-100">
            <div className="row d-flex justify-content-center align-items-center h-100">
              <div className="col-12">
                <div className="card card-registration card-registration-2" style={{ borderradius: '15px' }}>
                  <div className="card-body p-0">
                    <div className="row g-0">
                      <div className="col-lg-8">
                        <div className="p-5">
                          <div className="d-flex justify-content-between align-items-center mb-5">
                            <h1 className="fw-bold mb-0 text-black">Shopping Cart</h1>
                            <h6 className="mb-0 text-muted">Selected Items </h6>
                          </div>
                          <hr className="my-4" />
                          {products && products.map((cartItem, index) =>
                            <div className="row mb-4 d-flex justify-content-between align-items-center" key={index}>
                              <div className="col-md-2 col-lg-2 col-xl-2">
                                <img
                                  src={cartItem.image} className="img-fluid rounded-3" alt="Cotton T-shirt" />
                              </div>
                              <div className="col-md-3 col-lg-3 col-xl-3">
                                <h6 className="text-muted">{cartItem.category.name}</h6>
                                <h5 className="text-black mb-0">{cartItem.title}</h5>
                              </div>
                              <div className="col-md-3 col-lg-3 col-xl-2 d-flex">
                                <button className="btn btn-link px-2"
                                  onclick="this.parentNode.querySelector('input[type=number]').stepDown()">
                                  <i className="fas fa-minus"></i>
                                </button>
                              </div>
                              <div className="col-md-3 col-lg-3 col-xl-2 d-flex">
                                <Button onClick={() => { Decrement(index) }}> -</Button>
                                {itemQuantities[index]}
                                <Button onClick={() => { Increment(index) }} >+</Button>
                              </div>
                              <div className="col-md-3 col-lg-2 col-xl-2 offset-lg-1">
                                <h6 className="mb-0">€ {cartItem.price} </h6>
                              </div>
                              <div className="col-md-3 col-lg-3 col-xl-2">
                                <Button variant="contained" sx={{ bgcolor: 'red' }} onClick={() => { remove(index) }} > DELETE </Button>
                              </div>
                              <hr className="my-4" />
                            </div>
                          )}
                          <div className="pt-5">
                            <h6 className="mb-0"><Link to={'/'}>Back to shop</Link></h6>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-4 bg-grey">
                        <div className="p-5">
                          <h3 className="fw-bold mb-5 mt-2 pt-1">Summary</h3>
                          <hr className="my-4" />
                          <div className="d-flex justify-content-between mb-4">
                            <h5 className="text-uppercase">Total Amount :</h5>
                            <h5>€ {subTotal}</h5>
                          </div>
                          <div className="d-flex justify-content-between mb-4">
                            <h5 className="text-uppercase ">Shipping Fee :</h5>
                            <h5>€ {shippingFee}</h5>
                          </div>
                          <hr className="my-4" />
                          <div className="d-flex justify-content-between mb-4">
                            <h5 className="text-uppercase">Total price :</h5>
                            <h5>€ {totalPrice}</h5>
                          </div>
                          <div className="d-flex justify-content-center mb-5" >
                            <Button variant="contained" sx={{ bgcolor: 'green' }} onClick={success}> BUY NOW </Button><ToastContainer />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </>
    )
  }
}
export default AddToCart;