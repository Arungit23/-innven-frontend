import React, { useState } from 'react'
import styles from './auth.module.scss';
import {MdPassword} from 'react-icons/md';
import Card from '../../components/card/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import {Link, useParams} from 'react-router-dom';
import { toast } from 'react-toastify';
import { resetPassword } from "../../services/authService";


const initialState ={
 
  password:'',
  password2 :'',
  
}


const Reset = () => {
  const [formData,setformData] = useState(initialState)
  const {password, password2} = formData

  const {resetToken} = useParams()

  const handleInputChange =(e)=>{
    const {name, value} = e.target;
    setformData({...formData, [name]:value})
  }
  const reset = async(e)=>{
    e.preventDefault()
    // console.log(formData)
    // console.log(resetToken)

    if(password.length<6){
      return toast.error('Password must be more than 6 characters')
    }
    if(password !== password2){
      return toast.error('New password and confrim password does not match')
    }
    const userData ={
      password,
      password2
    }
    try {
      const data = await resetPassword(userData, resetToken)
      toast.success(data)
    } catch (error) {
        toast.error(error)
    }
  }

 return <div className={`container ${styles.auth}`}>
    <Card>
      <div className={styles.form}>
        <div className='--flex-center'>
          <MdPassword size= {30} color = '#999'/>
        </div>
        <h2>Reset Password</h2>

        <Form onSubmit={reset}>
      <Form.Group className="mb-3" controlId="formGroupPassword">
        <Form.Control type="password" placeholder="New Password" name='password' value={password} onChange={handleInputChange} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formGroupPassword">
        <Form.Control type="password" placeholder="Confirm Password" name='password2' value={password2} onChange={handleInputChange}  />
      </Form.Group>
      
      <Button type='submit' style={{padding:'1rem'}} className='--btn --btn-block' variant="primary" size='lg'>Reset Password</Button>
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


export default Reset
