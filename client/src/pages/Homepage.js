import React from "react";
import '../pages/Homepage.css'
import { useState, useEffect } from "react";
import axios from "axios";
import { ButtonGroup, FormControl, InputLabel, MenuItem, Rating, Select } from "@mui/material";
import { Link } from "react-router-dom";
import DrawerAppBar from "../components/Navbar";
import { getToken } from "../utils/TokenHelper";
import SearchBox from "../components/SearchBox";
import { Container } from "@mui/system";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTshirt, faFemale, faLaptop, faGem, faMagnifyingGlass, faStore } from '@fortawesome/free-solid-svg-icons';
import { toast, ToastContainer } from "react-toastify";
import { useDispatch, useSelector } from "react-redux"
import { updateCart, cartProduct } from "../components/Redux/cartslice";
import Button from '@mui/material/Button';
import { number } from "yup";

function Homepage() {
    const [products, setProducts] = useState([]);
    const token = getToken();
    const [category, setCategory] = useState([]);
    const [searchInput, setSearchInput] = useState('');
    const [filteredResults, setFilteredResults] = useState([]);
    const [originalData, setOriginalData] = useState([]);
    const dispatch = useDispatch();
    const [count, setCount] = useState(0);
    const state = useSelector(state => state.carts);

    useEffect(() => {

        axios.get("https://localhost:7062/all")
            .then((res) => {
                console.log(res.data);
                setCategory(res.data);
            })
            .catch((err) => {
                console.log("category fetching failed");
                console.log(err);
            });
        getAllProducts();
    }, []);

    const getAllProducts = () => {
        axios.get("https://localhost:7062/AllProduct")
            .then((res) => {
                console.log(res.data);
                setProducts(res.data);
            })
            .catch((err) => {
                console.log("product fetching failed");
                console.log(err);
            });
    }

    async function categorySelector(item) {
        try {
            await axios.get(`https://fakestoreapi.com/products/category/${item}`)
                .then((res) => {
                    console.log("result of category", res.data);
                    setProducts(res.data);
                })

        }
        catch (err) {
            console.log("error is ", err);
        }

    }
    async function AllProductsSelector() {
        try {
            await axios.get(``)
                .then((res) => {
                    console.log("result of category", res.data);
                    setProducts(res.data);
                })

        }
        catch (err) {
            console.log("error is ", err);
        }
    }
    const searchOutput = (searchKey) => {
        console.log("searchkey is ", searchKey)
        setSearchInput(searchKey);

        if (searchInput !== '') {
            const filteredData = products.filter((item) => {
                return Object.values(item).join('').toLowerCase().includes(searchInput.toLowerCase())
            })
            setFilteredResults(filteredData);
            console.log("filtered items are ", filteredData);

        }
        else {
            console.log("in else case ")
            setFilteredResults(products);

        }
    }

    const incrementCount = (item) => {
        setCount(count + 1);
        dispatch(updateCart(count));
        dispatch(cartProduct(item))
    };
    return (
        <>
            <div class="active bg-light" href="#login" >

                <DrawerAppBar />
                {token && <>
                    <Container fluid className="mt-5 pt-4 pb-2 bg-light text-center">
                        <div class="input-group">

                            <div class="form-outline">
                                <input type="search" id="form1" class="form-control" placeholder="Search" onChange={(e) => { searchOutput(e.target.value) }} />
                                <label class="form-label" for="form1"></label>
                            </div>
                        </div>
                        <div className="row justify-content-center">
                            <div className="col-sm-2">
                                <div className="card">
                                    <button className="btn btn-outline-success category-button" onClick={() => { getAllProducts() }}>
                                        <div className="card-body">
                                            <h5 className="card-title text-dark"> All</h5>
                                        </div>
                                    </button>
                                </div>
                            </div>
                            {category && category.map((category, index) =>
                                <div className="col-sm-3" key={index}>
                                    <div className="card">
                                        <button className="btn btn-outline-warning category-button" onClick={() => { categorySelector(category.Id) }}>
                                            <div className="card-body">
                                                <h5 className="card-title text-dark"> {category.name}</h5>
                                            </div>
                                        </button>
                                    </div>
                                </div>)}
                        </div>
                    </Container>
                </>}
            </div>
            <div>
                <ToastContainer />
                <section className="" style={{ backgroundColor: "#eee", }}>    {/*  'margin-top': '85px'  */}
                    <div class="container py-5">
                        <div class="row">
                            {searchInput.length > 1 ? (
                                filteredResults.map((product, index) => {
                                    return (
                                        <div class="col-md-6 col-lg-4 mb-4" key={product.id}>
                                            <div class="card">
                                                <div class="d-flex justify-content-between p-3">
                                                    <p class="lead mb-0">Today's Offer</p>
                                                </div>
                                                <div className="ratio ratio-4x3">
                                                    <img
                                                        src={product.image}
                                                        class="card-img-top"
                                                        alt="Laptop"
                                                    />
                                                </div>
                                                <div class="card-body">
                                                    <div class="d-flex justify-content-between">
                                                        <p class="small">
                                                            <a href="#!" class="text-muted">
                                                                {product.category}
                                                            </a>
                                                        </p>
                                                    </div>
                                                    <div class="d-flex justify-content-between mb-3">
                                                        <h5 class="text-truncate mb-4 mb-md-0">{product.title}</h5>
                                                    </div>
                                                    <div class="d-flex justify-content-between mb-2">
                                                        <div class="ms-auto text-warning">
                                                        </div>
                                                    </div>
                                                    <div className="text-center">
                                                        <ButtonGroup variant="contained" aria-label="outlined primary button group">
                                                            <Button variant="outlined" color="primary"><Link to={`/viewinfo/${product.id}`}>View Info</Link></Button>
                                                            {token && <>
                                                                <Button variant="contained" color="primary" onClick={() => { }}>Add to Cart</Button>
                                                            </>}
                                                        </ButtonGroup>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })) : (products.map((product, index) => {
                                    return (
                                        <div class="col-md-6 col-lg-4 mb-4" key={index}>
                                            <div class="card">
                                                <div class="d-flex justify-content-between p-3">
                                                    <p class="lead mb-0">Today's Offer</p>
                                                </div>
                                                <div className="ratio ratio-4x3">
                                                    <img
                                                        src={""}
                                                        class="card-img-top"
                                                        alt="Laptop"
                                                    />
                                                </div>
                                                <div class="card-body">
                                                    <div class="d-flex justify-content-between">
                                                        <p class="small">
                                                            <a href="#!" class="text-muted">
                                                                {product.category.name}
                                                            </a>
                                                        </p>
                                                    </div>
                                                    <div class="d-flex justify-content-between mb-3">
                                                        <h5 class="text-truncate mb-4 mb-md-0">{product.name}</h5>
                                                    </div>
                                                    <div class="d-flex justify-content-between mb-2">
                                                        <p class="text-muted mb-0">Available: <span class="fw-bold">{product.available}</span></p>  
                                                    </div>
                                                    <div className="text-center">
                                                            <h4>Price: <span class="bold">${product.price}</span></h4>
                                                        </div>
                                                    <div className="text-center">
                                                        <ButtonGroup variant="contained" aria-label="outlined primary button group">
                                                            <Button variant="outlined" color="primary"><Link to={`/viewinfo/${product.id}`}>View Info</Link></Button>
                                                            {token && <>
                                                                <Button variant="contained" color="primary" onClick={() => { incrementCount(product) }}>Add to Cart</Button>
                                                            </>}
                                                        </ButtonGroup>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                }))}
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
}
export default Homepage;