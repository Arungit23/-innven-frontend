import axios from "axios";
import {toast} from 'react-toastify';



export const BACKEND_URL = process.env.REACT_APP_BACKEND_URL

export const validateEmail =(email)=>{
 return email.match( /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
}
// Register User
export const registerUser = async(userData)=>{
 try{
     const res = await axios.post(`${BACKEND_URL}/api/users/register`,userData,{withCredentials:true})
     if(res.statusText==='OK'){
         toast.success('User Registered Successfully')
     }
     return res.data;
 } catch (err) {
    const message = (err.res && err.res.data && err.res.data.message) || err.message || err.toString();
     toast.error(message)
 }
};

//Login user

export const loginUser = async(userData)=>{
 try{
     const res = await axios.post(`${BACKEND_URL}/api/users/login`,userData,{withCredentials:true})
     console.log(res)
     if(res.statusText==='Created'){
         toast.success('Login Successful')
     }
     return res.data;
 }
 catch(err){
     const message = (err.res && err.res.data && err.res.data.message) || err.message || err.toString();
     toast.error(message)
 }
}

// logout user

export const logoutUser = async()=>{
 try{
     await axios.get(`${BACKEND_URL}/api/users/logout`);
     toast.success('logged out')
    
 }
 catch(err){
     const message = (err.res && err.res.data && err.res.data.message) || err.message || err.toString();
     toast.error(message)
     console.log(err)
 }
}

// forgot password

export const forgotPassword = async(userData)=>{
 try{
     const res = await axios.post(`${BACKEND_URL}/api/users/forgotpassword`, userData)
     toast.success(res.data)
    
 }
 catch(err){
     const message = (err.res && err.res.data && err.res.data.message) || err.message || err.toString();
     toast.error(message)
     console.log(err)
 }
}

// reset password

export const resetPassword = async(userData, resetToken)=>{
 try{
     const res = await axios.put(`${BACKEND_URL}/api/users/resetpassword/${resetToken}`, userData)
     return res.data
 }
 catch(err){
     const message = (err.res && err.res.data && err.res.data.message) || err.message || err.toString();
     toast.error(message)
     console.log(err)
 }
}

// login status

export const getLoginStatus = async(userData, resetToken)=>{
 try{
     const res = await axios.get(`${BACKEND_URL}/api/users/loggedin`)

     // console.log(res.data)
     return res.data
 }
 catch(err){
     const message = (err.res && err.res.data && err.res.data.message) || err.message || err.toString();
     toast.error(message)
     console.log(err)
 }
}

export const getUser = async()=>{
 try{
     const res = await axios.get(`${BACKEND_URL}/api/users/getuser`)

     // console.log(res.data)
     return res.data
 }
 catch(err){
     const message = (err.res && err.res.data && err.res.data.message) || err.message || err.toString();
     toast.error(message)
     console.log(err)
 }
}

//update user profile

export const updateUser = async(formData)=>{
    try{
        const res = await axios.patch(`${BACKEND_URL}/api/users/updateuser`, formData)

        // console.log(res.data)
        return res.data
    }
    catch(err){
        const message = (err.res && err.res.data && err.res.data.message) || err.message || err.toString();
        toast.error(message)
        console.log(err)
    }
}


export const changePassword = async(formData)=>{
    try{
        const res = await axios.patch(`${BACKEND_URL}/api/users/changepassword`, formData)

        // console.log(res.data)
        return res.data
    }
    catch(err){
        const message = (err.res && err.res.data && err.res.data.message) || err.message || err.toString();
        toast.error(message)
        console.log(err)
    }
}