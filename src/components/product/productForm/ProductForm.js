import React from 'react'
import { Button, Form } from 'react-bootstrap';
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css';
import "./ProductForm.scss";
import Card  from "../../card/Card";



const ProductForm = ({product, productImage,imagePreview, description, setDescription, handleInputChange,handleImageChange,saveProduct}) => {
 return (
   <div className='add-product'>
     <Card cardClass={'card'}>
       <Form onSubmit={saveProduct} >
         <Card cardClass={'group'}> 
           <Form.Label>Product Image</Form.Label>
           <code className='--color-dark'>Supported Formats:jpg, jpeg, png</code>
           <Form.Control type='file' name='image'onChange={(e)=>handleImageChange(e)}/>
           {imagePreview!== null ? (
                <div className='image-preview'>
                   <img src={imagePreview} alt='product'/>
                </div>
           ) : (<p>No Image Found</p>)}
            </Card>
                 <Form.Label>Product Name</Form.Label>
                   <Form.Control type='text' placeholder='Product-name'name='name' value={product?.name} onChange={handleInputChange}/>
                 <Form.Label>Product Category</Form.Label>
                   <Form.Control type='text' placeholder='Product-category'name='category' value={product?.category} onChange={handleInputChange}/>
                 <Form.Label>Product Price</Form.Label>
                   <Form.Control type='text' placeholder='Product-price'name='price' value={product?.price} onChange={handleInputChange}/>
                 <Form.Label>Product Quantity</Form.Label>
                   <Form.Control type='text' placeholder='Product-quantity'name='quantity' value={product?.quantity} onChange={handleInputChange}/> 

                   <Form.Label>Product Description</Form.Label>
                   <ReactQuill theme='snow' value={description} onChange={setDescription} modules={ProductForm.modules}formats={ProductForm.formats}/>
                   <div className='--my'>
                     <Button type='submit' className='--btn --btn-primary' size='lg'>Save Product</Button>
                   </div>
             </Form>
      
     </Card>
   </div>
 )
}
ProductForm.modules = {
 toolbar: [
   [{ header: "1" }, { header: "2" }, { font: [] }],
   [{ size: [] }],
   ["bold", "italic", "underline", "strike", "blockquote"],
   [{ align: [] }],
   [{ color: [] }, { background: [] }],
   [
     { list: "ordered" },
     { list: "bullet" },
     { indent: "-1" },
     { indent: "+1" },
   ],
   ["clean"],
 ],
};
ProductForm.formats = [
 "header",
 "font",
 "size",
 "bold",
 "italic",
 "underline",
 "strike",
 "blockquote",
 "color",
 "background",
 "list",
 "bullet",
 "indent",
 "link",
 "video",
 "image",
 "code-block",
 "align",
];

export default ProductForm