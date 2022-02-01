import React, {useContext} from 'react';
import AuthContext from '../context/AuthContext';
import { Link } from 'react-router-dom';

const LoginPage = () => {
  let {loginUser} =useContext(AuthContext)
  return(
        <div className='formCenter'>
          <form onSubmit={loginUser} className='formFields'>
            <div className='formField'>
              <label className='formFieldLabel' htmlFor="name">
                Username
              </label>
              <input
              type="text"
              id="name"
              className='formFieldInput'
              placeholder='Enter Username'
              name="username"
              />
            </div>

            <div className='formField'>
              <label className='formFieldLabel' htmlFor="password">
                Password
              </label>
              <input
              type="password"
              id="password"
              className='formFieldInput'
              placeholder='Enter Password'
              name="password1"
              />
            </div>

            <div className="formField">
              <button className="formFieldButton">Sign In</button>{" "}
              <Link to="/register" className="formFieldLink">
                Don't have an account?
              </Link>
          </div>
        </form>
    </div>
    );
};

export default LoginPage;
