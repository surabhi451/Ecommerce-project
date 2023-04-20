import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate, Link } from "react-router-dom";
import "../pages/ViewProduct.css"
import DrawerAppBar from "../components/SearchBox";
import { updateCart, cartProduct } from "../components/Redux/cartslice";
import { Button, ButtonGroup } from "@mui/material";
import { getToken } from "../utils/TokenHelper";
import { useDispatch, useSelector } from "react-redux"



function ViewProduct() {
  const [viewItem, setviewItem] = useState([]);
  const token = getToken();
  const { id } = useParams();
  const dispatch = useDispatch();
  const [count, setCount] = useState(0);
  const state = useSelector(state => state.carts);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`https://localhost:7062/GetProductById/${id}`)
      .then((res) => {
        const initialViewItem = [];
        initialViewItem.push(res.data);
        setviewItem(initialViewItem);
        console.log("type os viewitem", initialViewItem);
        console.log("inside viewitem", viewItem);
      })
      .catch((err) => {
        console.log("product fetching failed");
        console.log(err);
        navigate("/")
      });
  }, []);
  const incrementValue = (item) => {
    axios.get('https://localhost:7062/GetProductById/${item}')
    .then((res)=>{
      console.log(res.data)
    })
    setCount(count + 1);
    dispatch(updateCart(count));
    dispatch(cartProduct(item))
  };

  return (
    <>
      <div className="dashboard-topnav">
        <DrawerAppBar />
      </div>
      {viewItem && viewItem.map((item, index) => {
        return (
          <section style={{ backgroundcolor: ' #eee' }}>
            <div style={{ height: '20px' }}></div>
            <div className="container py-5" key={index}>
              <div className="row justify-content-center">
                <div className="col-md-8 col-lg-6 col-xl-4">
                  <div className="card" style={{ borderRadius: '15px' }}>
                    <div className="bg-image hover-overlay ripple ripple-surface ripple-surface-light"
                      data-mdb-ripple-color="light">
                      <center><img src={item.image}
                        width="200px"
                        height="550px"
                        className="img-fluid"
                        alt="Laptop" /></center>
                      <a href="#!">
                        <div className="mask"></div>
                      </a>
                    </div>
                    <div className="card-body pb-0">
                      <div className="d-flex justify-content-between">
                        <div>
                          <p className="small text-muted">{item.category.name}</p>
                          <h4 className="text-dark"> {item.name}</h4>
                        </div>
                      </div>
                    </div>
                    <hr className="my-0" />
                    <div className="card-body pb-0">
                      <div> <p className="text-muted">{item.description}</p></div>
                    </div>
                    <hr className="my-0" />
                    <div className="card-body pb-0">
                      <div className="d-flex justify-content-between">
                        <h6 className="text-dark"  >Price: ${item.price}</h6>
                        <h6 className="text-dark" >Available: {item.available}</h6>
                      </div>
                    </div> 
                    <hr className="my-0" /><br></br>
                    <div className="text-center">
                      <ButtonGroup variant="contained" aria-label="outlined primary button group">
                        <Button variant="outlined" color="primary"><Link to={`/`}>Back TO Home</Link></Button>
                        {token && <>
                          <Button variant="contained" color="primary" onClick={() => { incrementValue(item.id) }}>Add to Cart</Button>
                        </>}
                      </ButtonGroup>
                    </div><br></br>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )
      })}
    </>
  );
}

export default ViewProduct;

