import { createContext, useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
import { useHistory, Redirect } from "react-router-dom";
import { toast } from "react-toastify";
const AuthContext = createContext()

export default AuthContext;


export const AuthProvider =({children}) => {

    let [authTokens, setauthTokens] = useState(()=>localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null)
    let [user, setUser] = useState(()=>localStorage.getItem('authTokens') ? jwt_decode(localStorage.getItem('authTokens')) : null)
    let [loading, setloading] = useState(true)

    const history = useHistory()

    let loginUser = async (e) => {
        e.preventDefault()
        // console.log('Form submitted')
        let response = await fetch('http://127.0.0.1:8000/api/token/', {
            method : 'POST',
            headers : {
                'Content-Type':'application/json'
            },
            body : JSON.stringify({'username':e.target.username.value, 'password':e.target.password.value})

        })
        console.log(response , "response of login user")
        if (response.ok){
            let data = await response.json()
            setauthTokens(data)
            setUser(jwt_decode(data.access))
            localStorage.setItem('authTokens',JSON.stringify(data))
            history.push('/')
            // console.log('data:', data)
            // console.log("response:" , response);
            // console.log("userrr", user)
        } else {
            alert('Something went wrong!')

        }
        // console.log('data:', response)
    }

    let logoutUser = () => {
        setauthTokens(null)
        setUser(null)
        localStorage.removeItem('authTokens')
        history.push('/login')
    }

    let updateToken = async () => {
        console.log('Update Token Called')
        let response = await fetch('http://127.0.0.1:8000/api/token/refresh/', {
            method : 'POST',
            headers : {
                'Content-Type':'application/json'
            },
            body : JSON.stringify({'refresh': authTokens?.refresh})
        })
        if (response.status === 200) {
            let data = await response.json()
            setauthTokens(data)
            setUser(jwt_decode(data.access))
            localStorage.setItem('authTokens', JSON.stringify(data))
        }else{
            logoutUser()
        }

        if(loading){
            setloading(false)
        }
    }

    let registerUser = async (e) => {
        e.preventDefault();
        let response = await fetch('http://127.0.0.1:8000/api/register/', {
            method: 'POST',
            headers : {
                'Content-Type' : 'application/json',
            },
            body : JSON.stringify({'username': e.target.username.value, 'password': e.target.password1.value, 'password2': e.target.password2.value})
        })
        let data = await response.json()
        if (response.status === 201){
            toast.success('User Registered')
            history.push('/')
        }else{
            try {
                for (let i = 0; i < data.password.length;i++){
                    toast.error(data.password[i])
                }
            } catch (e){

            }
            try {
                if (data.username.length > 0){
                    toast.error('Username must be unique!')
                }
            } catch (e){

            }


        }


    }


    let contextData = {
        user:user,
        authTokens:authTokens,
        loginUser:loginUser,
        logoutUser:logoutUser,
        registerUser:registerUser,
    }


    useEffect(()=>{

        if (loading){
            updateToken()

        }

        let fourmin = 1000 * 60 * 4
        let interval = setInterval(()=> {
            if (authTokens){
                updateToken()
            }
        },fourmin)
        // console.log("called")
        return ()=> clearInterval(interval)
    }, [authTokens, loading])


    return (
        <AuthContext.Provider value={contextData} >
            {children}
        </AuthContext.Provider>
    )
}
