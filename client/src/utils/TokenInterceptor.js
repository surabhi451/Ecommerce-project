import React from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function TokenInterceptor() {
    const navigate = useNavigate();    
    axios.interceptors.request.use(
        function (request) {
            const token = localStorage.getItem('token');
            if(!token){
                return request;
            }
            request.headers.Authorization = `Bearer ${token}`; 
            return request;
        },
        function (error) {
            return Promise.reject(error);
        }
    );
    axios.interceptors.response.use(
        function (response) {
            console.log(response);
           return response;
        },
        function (error) {
            console.log(error)
            if (error.response.status === 401) {
                return navigate('/');
            }
            if(error.response.status === 400 || error.response.status === 429){
                var title = error.response.data.title;
                console.log("Error : ",title);             
                return Promise.reject(error);
            }
        }
    );
    return (
        <></>
    )
}

export default TokenInterceptor;