import React, { useState } from 'react'
import styles from './auth.module.scss';
import {AiOutlineMail} from 'react-icons/ai';
import Card from '../../components/card/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import {Link} from 'react-router-dom';
import { forgotPassword, validateEmail } from "../../services/authService";
import { toast } from "react-toastify";


const Forgot = () => {
 const [email,setEmail] = useState('')
 const forgot = async(e)=>{
   e.preventDefault()
   if( !email){
     return toast.error('Please enter an Email')
     
   }
   if(!validateEmail(email)){
     return toast.error('Please enter a valid Email')
   }

   const userData ={
     email,
     
   };
   await forgotPassword(userData)
   setEmail('')
 }


 return <div className={`container ${styles.auth}`}>
 <Card>
   <div className={styles.form}>
     <div className='--flex-center'>
       <AiOutlineMail size= {30} color = '#999'/>
     </div>
     <h2>Forgot Password</h2>

     <Form onSubmit={forgot}>
   <Form.Group className="mb-3" controlId="formGroupEmail">
     <Form.Control type="email" placeholder="Enter Email" value={email} onChange={(e)=>setEmail(e.target.value)} />
   </Form.Group>
   
   <Button type='submit' style={{padding:'1rem'}} className='--btn --btn-block' variant="primary" size='lg'>Get Reset Email</Button>
   <div className={styles.links}>
     <p>
     {/* <Link style={{textDecoration:'none'}} to='/'>-Home</Link> */}
     </p>
     <p>
     <Link style={{textDecoration:'none'}} to ='/login'>-Login</Link>
     </p>
   </div>
   
   </Form>

   

   </div>
 </Card>
</div>
}
export default Forgot;

