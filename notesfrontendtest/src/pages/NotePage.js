import React, { useState, useEffect, useContext } from 'react';
import AuthContext from '../context/AuthContext';
import { ReactComponent as ArrowLeft } from '../assets/arrow-left.svg'
import { Link } from 'react-router-dom';


const NotePage = ({ match, history }) => {
    
    let {authTokens} = useContext(AuthContext)
    let noteIdd = match.params.id
    let [noteId, setNoteId] = useState(noteIdd)
    let [note, setNote] = useState(null)

    let getNote = async ()=> {
        if (noteId === 'new'){
            var response = await fetch('/api/notes/new/', {
                method : 'POST',
                headers : {
                    'Content-Type' : 'application/json',
                    'Authorization' : 'Bearer ' + String(authTokens.access)
                }
            })
        }
        else {
            var response = await fetch(`/api/notes/${noteId}/`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization' : 'Bearer ' + String(authTokens.access)

                }
            })
        }
        let data = await response.json()
        setNote(data)
        if (noteId === 'new'){
            setNoteId(data.id)
        }
        console.log("get note function invoked", note)
    }
    

    let updateNote = async ()=> {
        fetch(`/api/notes/${noteId}/update/`,{
            method : 'PUT',
            headers: {
                'Content-Type' : 'application/json',
                'Authorization' : 'Bearer ' + String(authTokens.access)
            },
            body:JSON.stringify(note)
        })
    }

    useEffect(()=>{
        getNote()
    }, [noteId])

    let deleteNote = async ()=>{
        fetch(`/api/notes/${noteId}/delete/`,{
            method:'DELETE',
            headers:{
                'Content-Type' : 'application/json',
                'Authorization' : 'Bearer ' + String(authTokens.access)
            }
        })
        history.push('/')
    }


    let handleSubmit = ()=>{
        if (!note.body){
            deleteNote()
        } else {
            updateNote()    
        }
        history.push('/')
    }

    let handleChange = (value) => {
        setNote(note => ({ ...note, 'body': value}))
        console.log('Handle change:', note)
    }


    if(!note){
        return <div>
        </div>
    }
    else{
        return(
            <div className='note'>
                <div className='note-header'>
                    <h3>
                        <ArrowLeft onClick={handleSubmit} />
                    </h3>
                    
                    <button onClick={deleteNote}>Delete</button>
                </div>
                <textarea onChange={(e) => { handleChange(e.target.value) }} value={note?.body}></textarea>
            </div>
        )
    }
    
};

export default NotePage;
