import React, { useEffect, useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import Card from '../../components/card/Card'
import ChangePassword from '../../components/changePassword/ChangePassword'
import Loader from '../../components/loader/Loader';
import { selectUser } from '../../redux/features/auth/authSlice';
import { updateUser } from '../../services/authService';
import './Profile.scss'
import Dropzone from 'react-dropzone';



const EditProfile = () => {
 const navigate = useNavigate()
 const [isLoading, setIsLoading] = useState(false)
 const user = useSelector(selectUser)

 const {email} = user

 useEffect(()=>{
     if(!email){
         navigate('/profile')
     }
 },[email,navigate])

 const initalState ={
     name : user?.name,
     email : user?.email,
     phone : user?.phone,
    //  image : user?.image
 }
 const [profile , setProfile] = useState(initalState)
 const [profileImage, setProfileImage] = useState('')
 const handleInputChange =(e)=>{
     const {name, value} = e.target;
     setProfile({...profile, [name]:value})
 }
 const handleImageChange = (e)=>{
     setProfileImage(e.target.files[0])
 }

 const saveProfile =async(e)=>{
     e.preventDefault()
     setIsLoading(true)
     try{
         // handle imageUpload

         let imageURL;
         if(
             profileImage && 
             (
                 profileImage.type === 'image/jpeg' ||
                 profileImage.type === 'image/jpg' ||
                 profileImage.type === 'image/png'
                 
             )
             
         ){
             const image = new FormData()
             image.append('file', profileImage)
             image.append('cloud_name','dsi3wgofc')
             image.append('upload_preset', 'u4yc3u4j')

             const res = await fetch('https://api.cloudinary.com/v1_1/dsi3wgofc/image/upload',{method:'post', body: image})
             const imageData = await res.json()
             imageURL = imageData.url.toString
         }
             const formData = {
                 name:profile.name,
                 phone:profile.phone,
                 image:profileImage? imageURL : profile.image
                 
             }
             console.log(profileImage)
            const data= await updateUser(formData)
            console.log(data)
            toast.success('User Updated')
            navigate('/profile')
            setIsLoading(false)
         
     }   
     catch(error){
         console.log(error)
         setIsLoading(false)
         toast.error(error.message)
     }
 }


return (
 <div className='profile --my2'>
   {isLoading && <Loader/>}
   <Card cardClass={'card --flex-dir-column'}>
                 {/* <span className='profile-photo'>
                     <img src={user?.image} alt='profilePic'/>

                 </span> */}
                 <Form className='--form-control --mx2' onSubmit={saveProfile}>
                 <span className='profile-data'> 
                 <p>
                     <label className='p'>Name:</label>
                     <input type='text' name = 'name' value={profile?.name} onChange={handleInputChange}/>
                     
                 </p>
                     <p>
                     <label>Email:</label>
                     <input type='text' name = 'email' value={profile?.email} disabled/>
                     </p>
                     <p>
                     <label>phone:</label>
                     <input type='text' name = 'phone' value={profile?.phone} onChange={handleInputChange}/>
                     </p>
                     {/* <p>
                     <label>Image:</label>
                     <input type='file' name = 'image' value={profile?.image} onChange={handleImageChange}/>
                     </p> */}
                   
             <div>
                         
         <Button type='submit' className='--btn --btn-primary' size=''>Save Changes</Button>
                     
                     </div>
                 </span>
                 </Form>

             </Card>
             <br/>
             <ChangePassword/> 
 </div>
)
}

export default EditProfile