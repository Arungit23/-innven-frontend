import axios from 'axios'
import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { toast } from 'react-toastify'
import Card from '../../components/card/Card'
import { BACKEND_URL } from '../../services/authService'
import './Contact.scss'

const Contact = () => {
    const [subject, setSubject] = useState('')
    const [message,setMessage] = useState('')

    const data ={
        subject,
        message
    }
    const sendEmail = async(e)=>{
        e.preventDefault();
        try {
            const res = await axios.post(`${BACKEND_URL}/api/contactus`,data)
            setSubject('')
            setMessage('')
           
         toast.success(res.data)
         window.alert('Email sent successfully');
        } catch (error) {
            toast.error(error)
            window.alert('Error sending email');
            console.error('Error sending email:', error);
        }
    }



  return (
    <div className='contact'>

        <h2 className='--mi'>Contact Us</h2>
        <div className='section'>
            <Form onSubmit={sendEmail}> 
                <Card cardClass='card'>
                    <Form.Label>Subject</Form.Label>
                    <Form.Control type='text' name ='subject' placeholder='Subject' required value={subject} onChange={(e)=>setSubject(e.target.value)}/>
                    <Form.Control as="textarea" className=' --mj' placeholder='Message' required cols={30} rows={10} value={message} onChange={(e)=>setMessage(e.target.value)} />
                    <Button type='submit' className=' --btn-primary w-25' size='lg'>Send Message</Button>
                </Card>

            </Form>
        </div>
      
    </div>
  )
}

export default Contact