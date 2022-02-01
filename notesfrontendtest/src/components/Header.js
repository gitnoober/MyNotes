import React, {useContext} from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../context/AuthContext';


const Header = () => {
  let {user, logoutUser} = useContext(AuthContext)

  return (
    <div className='app-header'>
        <Link className='notes-title' to="/"> Home</Link>
        <span > | </span>
        {user ? (<button className='notes-title' type="submit" value="Logout" onClick={logoutUser}>Logout</button>):(<Link className='notes-title' to="/login"> Login </Link>)}

        {/* {user && <p>Hello {user.username} </p>} */}
    </div>
  );
};

export default Header;
