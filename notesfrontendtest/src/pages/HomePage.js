import React, {useState, useEffect, useContext} from 'react';
import AuthContext from '../context/AuthContext';
import ListItem from '../components/ListItem';
import AddButton from '../components/AddButton';

const HomePage = () => {

  let [notes, setNotes] = useState([])
  let {authTokens, logoutUser} = useContext(AuthContext)

  useEffect(()=>{
    getNotes()
  }, [])

  let getNotes = async() => {
    let response = await fetch('/api/notes/', {
      method:'GET',
      headers:{
        'Content-Type' : 'application/json',
        'Authorization' : 'Bearer ' + String(authTokens.access)
      }
    })
    let data = await response.json()
    if (response.status === 200){
      setNotes(data)  
    }else if (response.statusText === 'Unauthorized'){
      logoutUser()
    }
    else{
      alert('Something went wrong')
    }
  }


  
  return (
    <div className='notes'>
        <div className='notes-header'>
          <h2 className='notes-title' >&#9782; Notes</h2>
          <p className='notes-count'>{notes.length}</p>
        </div>

        <div className='notes-list'>
          {notes.map((note,index) => (
            <ListItem key={index} note={note}/>
          ))}
        </div>
        
        <div>
          <AddButton/>
        </div>
    </div>);
};

export default HomePage;
