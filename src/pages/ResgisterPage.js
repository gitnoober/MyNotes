import React, {useContext, Component} from 'react';
import AuthContext from '../context/AuthContext';
import { Redirect, Link } from 'react-router-dom';


// const RegisterPage = () => {
//   let {registerUser, user} =useContext(AuthContext)
//   if (!user){
//     return <div>
//         <form onSubmit={registerUser}>
//             <input type="text" name="username" placeholder='Enter Username' />
//             <input type="password" name="password1" placeholder='Enter Password' />
//             <input type="password" name="password2" placeholder='Confirm Password' />
//             <button type="submit" value="login">Submit</button>
//         </form>
//     </div>;
//   }
//   else{
//       <Redirect to="/" />
//   }
// };

// export default RegisterPage;

const RegisterPage =()=>{
  let {registerUser} =useContext(AuthContext)
  return (
    <div className='formCenter'>
      <form onSubmit={registerUser} className='formFields'>
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

        <div className='formField'>
          <label className='formFieldLabel' htmlFor="password">
            Re-Enter Password
          </label>
          <input
          type="password"
          id="password"
          className='formFieldInput'
          placeholder='Enter Password'
          name="password2"
          />
        </div>

        <div className="formField">
            <button className="formFieldButton">Sign Up</button>{" "}
            <Link to="/login" className="formFieldLink">
              Have an account?
            </Link>

        </div>
      </form>
    </div>
  )
}

export default RegisterPage;
