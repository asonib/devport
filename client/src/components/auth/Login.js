import React from 'react'
import {Fragment, useState} from 'react';
import  {Link} from 'react-router-dom';

export const Login = () => {
    const [formData, setformData] = useState({
      email: '',
      password: ''
    });
    const {email, password} = formData;
    const onChange = e => setformData({...formData, [e.target.name]: e.target.value});
    const onSubmit = e => {
      e.preventDefault();
      console.log('success');
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
