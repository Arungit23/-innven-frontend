import React, { useState } from 'react'
import styles from './auth.module.scss';
import {BiLogIn} from 'react-icons/bi';
import Card from "../../components/card/Card";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import {toast} from 'react-toastify';
import {Link, useNavigate} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginUser, validateEmail } from '../../services/authService';
import { SET_LOGIN, SET_NAME } from '../../redux/features/auth/authSlice';
import Loader from '../../components/loader/Loader';
import { Popover, OverlayTrigger } from 'react-bootstrap'



const initialState = {
 email :'',
 password :'',
}

const Login = () => {
 const dispatch = useDispatch()
 const navigate = useNavigate()
 const [isLoading,setIsLoading]= useState(false)
 const [formData,setformData] = useState(initialState)
 const {email,password} = formData

 const handleInputChange =(e)=>{
   const {name, value} = e.target;
   setformData({...formData, [name]:value})
 }
 const  login = async (e)=>{
   e.preventDefault();
   if( !email || !password){
     return toast.error('All fields are required')
   }
   if(!validateEmail(email)){
     return toast.error('Please enter a valid  Email')
   }
 
 const userData ={
   email,
   password
 };
 setIsLoading(true)
 try {
   const data = await loginUser(userData)
   // console.log(data)

   await dispatch(SET_LOGIN(true))
   await dispatch(SET_NAME(data.name))
   navigate('/dashboard')
   
 } catch (error) {
   setIsLoading(false)
 }
}


// const popover = (
//   <Popover id="popover-basic">
//       <Popover.Header as="h3">Test Credentials</Popover.Header>
//       <Popover.Body>
//           <p><strong>Email:</strong>arun@gmail.com</p>
//           <p><strong>Password:</strong>arun123</p>
//       </Popover.Body>
//   </Popover>
//  )

  return <div className={`container ${styles.auth}`}>
 {isLoading && <Loader/>}
    <Card>
      <div className={styles.form}>
        <div className='--flex-center'>
          <BiLogIn size= {30} color = '#999'/>
        </div>
        <h2>Login</h2>

        <Form onSubmit={login}>
      <Form.Group className="mb-3" controlId="formGroupEmail">
        <Form.Control type="email" placeholder="Enter Email" required name ='email' value={email} onChange={handleInputChange} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formGroupPassword">
        <Form.Control type="password" placeholder="Password" required name = 'password'value={password} onChange={handleInputChange} />
      </Form.Group>
      <Button type='submit' style={{padding:'1rem'}} className='--btn --btn-block' variant="primary" size='lg'>Login</Button>
      
      </Form>

      

      <Link  style={{textDecoration:'none'}} to='/forgot'>Forgot Password</Link>
     

      <span className={styles.register}>
        {/* <Link style={{textDecoration:'none'}} to='/'>Home</Link> */}
        <p style={{margin:'1rem'}}>&nbsp;&nbsp; Dont have an account?&nbsp;&nbsp;</p>
        <Link style={{textDecoration:'none'}} to ='/register'>Register</Link>

        
      </span>
      {/* <OverlayTrigger trigger="click" placement="bottom" overlay={popover}>
     <Button variant="danger"  className="view" >View Test Credentials</Button>

      </OverlayTrigger> */}
      </div>
      
   
    </Card>
  </div>
}


export default Login;
