import React from 'react';
import axios from 'axios';
import { useForm } from "react-hook-form";
import { Link, useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { ToastContainer } from 'react-toastify';
import notify from '../components/toastService';

function Register() {
  const navigate = useNavigate();
  const schema = yup.object().shape(
    {
      name: yup.string().required("Name is required"),
      email: yup.string().email('Email is not valid').required("Email is required"),
      phonenumber: yup.string("Phone number is not valid").required("Phone no is required"),
      dob: yup.date().required("Date of Birth is required"),
      password: yup.string().matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{5,}$/, "Minimum five characters, at least one uppercase letter, one lowercase letter, one number and one special character").required("Password is required"),
      confirmpassword: yup.string().oneOf([yup.ref("password"), "Confirm password doesnt match"]).required("Confirm password is required")
    })
  const registerUser = async (data) => {
    console.log(data)
    const regdata = {
      "Name": data.name,
      "Email": data.email,
      "Password": data.password,
      "Dob": data.dob,
      "PhoneNumber": data.phonenumber
    }
    console.log(regdata)
    try {
      const res = await axios.post('https://localhost:7062/user/registration', regdata);
      if (res) {
        console.log("Succesfully registered", res)
        navigate('/Login');
      }
    }
    catch (err) {
      console.log(err)
      notify("Failed to register ");
    }
  };
  const formInvalid = (data) => {
    console.log("Invalid form", data);
  }
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  });
  return (
    <div className='container-fluid'>
      <ToastContainer />
      <section className="h-100 h-custom" style={{ backgroundcolor: ' #8fc4b7' }}>
        <div classNames="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-lg-8 col-xl-6">
              <div className="card rounded-3">
                <img src="https://images.pexels.com/photos/135620/pexels-photo-135620.jpeg?cs=srgb&dl=pexels-shattha-pilabut-135620.jpg&fm=jpg"
                  className="w-100"
                  alt="Sample photo"/>
                <div className="card-body p-4 p-md-5">
                  <h3 className="mb-4 pb-2 pb-md-0 mb-md-5 px-md-2">Registration Info</h3>
                  <form className="px-md-2" onSubmit={handleSubmit(registerUser, formInvalid)}>
                    <div className='details'>
                      <label htmlFor="name" className='labels'>Name</label>
                      <input type="text" name="name" className='form-control'
                        placeholder="Enter your name"
                        {...register("name", { required: true, maxLength: 50 })} />
                      <p className="text-danger">{errors.name ? errors.name.message : <></>}</p>
                    </div>
                    <div className='details'>
                      <label htmlFor="email" className='labels'>Email Id</label>
                      <input type="email" name="name" className='form-control'
                        placeholder="Enter your email"
                        {...register("email", { required: true, maxLength: 50 })} />
                      <p className="text-danger">{errors.email ? errors.email.message : <></>}</p>
                    </div>
                    <div className='details'>
                      <label htmlFor="phonenumber" className='labels'>PhoneNumber</label>
                      <input type="text" name="phonenumber" className='form-control'
                        placeholder="Enter your phonenumber"
                        {...register("phonenumber", { required: true, maxLength: 10 })} />
                      <p className="text-danger">{errors.phonenumber ? errors.phonenumber.message : <></>}</p>
                    </div>
                    <div className='details'>
                      <label htmlFor="dob" className='labels'>Date of Birth</label>
                      <input type="date" name="dob" className='form-control'
                        placeholder="Enter your date of birth "
                        {...register("dob", { required: true })} />
                    </div>
                    <div className='details'>
                      <label htmlFor="password" className='labels'>Password</label>
                      <input type="password" name="password" className='form-control'
                        placeholder="Enter your password "
                        {...register("password", { required: true, validate: true })} />
                      <p className="text-danger">{errors.password ? errors.password.message : <></>}</p>
                    </div>
                    <div className='details'>
                      <label htmlFor="confirmpassword" className='labels'>Confirm Password</label>
                      <input type="password" name="confirmpassword" className='form-control'
                        placeholder="Enter your confirmpassword "
                        {...register("confirmpassword", { required: true, validate: true })} />
                      <p className="text-danger">{errors.confirmpassword ? errors.confirmpassword.message : <></>}</p>
                    </div>
                    <button type="submit" className="btn btn-success btn-lg mb-1">Submit</button>
                    <p className="text-center text-muted mt-5 mb-0">Have already an account? <Link to={'/Login'}
                      className="fw-bold text-body"><u>Login here</u></Link></p>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Register;


