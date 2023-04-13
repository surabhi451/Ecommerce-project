import React from 'react'
import { useForm } from "react-hook-form";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import axios from "axios"
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getToken, setToken } from '../utils/TokenHelper';
import { useNavigate } from 'react-router-dom';

const schema = yup.object().shape({
    email: yup
      .string()
      .min(5, '* email not valid')
      .required('* Username is required'),
    password: yup
      .string()
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/,
        '* invalid password *')
      .required('* Password is required')
  });





function Login() {
    const navigate = useNavigate();
  const [email, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  });
  const onSubmit = async (event) => {
    try {

    await axios.post('https://localhost:7062/login/user',{
        email,
       password
      })
        .then((res) => {
          console.log("token",res.data);
          setToken(res.data);
          const token = getToken();
          console.log("token stored is ", token);
          toast.success('login success', {
            position: toast.POSITION.TOP_CENTER
          });
          if (token) {
            navigate('/');
          }
        })
  } catch (error) {
      console.log('Login Failed!')
      toast.error('Invalid username and password', {
        position: toast.POSITION.TOP_CENTER
      });
      console.log(error);
    }
  };
    return (
<section class="vh-100 gradient-form" style={{ backgroundcolor: '#eee' }}>
  <div class="container py-5 h-100">
    <div class="row d-flex justify-content-center align-items-center h-100">
      <div class="col-xl-10">
        <div class="card rounded-3 text-black">
          <div class="row g-0">
            <div class="col-lg-6">
              <div class="card-body p-md-5 mx-md-7 ">

                <div class="text-center">
                  <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/lotus.webp"
                    style={{width: '90px'}} alt="logo"/>
                </div>

                <form onSubmit={handleSubmit(onSubmit)}>
                <h4 class="fw-normal mb-3 pb-3" style={{ letterspacing: '1px' }}>Sign into your account</h4>

                  
                      <div class="form-outline mb-3">
                        <TextField id="outlined-basic-user" label="Email ID" variant="outlined" fullWidth="10vw"{...register("email", { required: true, maxLength: 50 })} onChange={(event) => setUsername(event.target.value)} />
                        <div id='username' className='form-text text-danger'>{errors.email?.message}</div>
                      </div>

                      <div class="form-outline mb-3">
                        <TextField type="password" id="outlined-basic-pssd" label="password " variant="outlined" fullWidth="10vw" {...register("password", { required: true, maxLength: 50 })} onChange={(event) => setPassword(event.target.value)} />
                        <div id='emailHelp' className='form-text text-danger'>{errors.password?.message}</div>
                      </div>

                      <div class="pt-1 mb-3">
                        <Button type='submit' variant="contained" >Login</Button>
                      </div><ToastContainer />

                  <div class="d-flex align-items-center justify-content-center pb-4">
                    <p class="mb-0 me-2">Don't have an account?</p>
                    <button type="button" class="btn btn-outline-success">Create new</button>
                  </div>

                </form>

              </div>
            </div>
            <div class="col-lg-6 d-flex align-items-center gradient-custom-2">
              <div class="text-white px-3 py-4 p-md-5 mx-md-4">
              <img src="https://images.unsplash.com/photo-1501127122-f385ca6ddd9d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=435&q=80"
                    alt="login form" class="img-fluid" style={{ borderradius: '1rem 0 0 1rem' }} />
                
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
)
}
export default Login

