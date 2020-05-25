import React from 'react'
import {Fragment, useState} from 'react';
import  {Link} from 'react-router-dom';
import axios from 'axios';

export const Login = () => {
    const [formData, setformData] = useState({
      email: '',
      password: ''
    });
    const {email, password} = formData;
    const onChange = e => setformData({...formData, [e.target.name]: e.target.value});
    const onSubmit = async(e) => {
      e.preventDefault();
      
      try {
        const loginData = {
          email: email,
          password: password
        }
        const body = JSON.stringify(loginData);
        const config = {
          headers: {
            'Content-Type': 'application/json'
          }
        }
  
        const res = await axios.post('/api/auth', body, config);
        console.log(res);
      } catch (err) {
        console.log(err.messgae);
      }
    }
    return <Fragment>
      <h1 className="large text-primary">Sign In</h1>
      <p className="lead"><i className="fas fa-user"></i> Sign into Your Account</p>
      <form className="form" onSubmit={e => onSubmit(e)}>
        <div className="form-group">
          <input
            type="email"
            placeholder="Email Address"
            name="email"
            value={email}
            onChange={e => onChange(e)}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={e => onChange(e)}
          />
        </div>
        <input type="submit" className="btn btn-primary" value="Login" />
      </form>
      <p className="my-1">
        Don't have an account? <Link to="register.html">Sign Up</Link>
      </p>
    </Fragment>
    
}
export default Login;
