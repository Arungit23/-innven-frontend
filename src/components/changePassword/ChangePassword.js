import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { changePassword } from '../../services/authService'
import Card from '../card/Card';
import './ChangePassword.scss'


const initalState={
    oldPassword :'',
    password:'',
    password2:''
}

const ChangePassword = () => {
    const navigate = useNavigate()
    const [formData, setFormData] = useState(initalState)
    const {oldPassword, password,password2} = formData

    const handleInputChange =(e)=>{
        const {name , value} = e.target;
        setFormData({...formData,[name]:value})
    }

    const changePass = async(e) =>{
        e.preventDefault()
        if(password !== password2){
            return toast.error('New Passwords do not match')
        }

        const formData={
            oldPassword,
            password
        }

       const data= await changePassword(formData)
        toast.success(data)
        navigate('/profile')
        
    }
  return (
    <div className='change-password'>
        <Card cardClass={'password-card'}>
            <h2 className='h2'>Change Password</h2>
            <Form onSubmit={changePass} className='--form-control'>
                <Form.Control type='password' placeholder='Old Password' required name='oldPassword' value={oldPassword} onChange={handleInputChange}/>
                <Form.Control type='password' placeholder='New Password' required name='password' value={password} onChange={handleInputChange}/>
                <Form.Control type='password' placeholder='Confirm New Password' required name='password2' value={password2} onChange={handleInputChange}/>

                <Button type='submit' className='--btn --btn-primary' size='lg'>Change Password</Button>

            </Form>
        </Card>
      
    </div>
  )
}

export default ChangePassword