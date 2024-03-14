import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL

const API_URL = `${BACKEND_URL}/api/products/`



//create new product

const createProduct = async (formData) =>{
    const res = await axios.post(API_URL,formData)
     console.log(res)
    return res.data

}
//get all products
const getProducts = async () =>{
    const res = await axios.get(API_URL)
    // console.log(res)
    return res.data

}
// delete product
const deleteProduct = async (id)=>{
    const res = await axios.delete(API_URL + id)
    return res.data
}
// get single product

const getProduct = async (id)=>{
    const res = await axios.get(API_URL + id)
    return res.data
}

// update product
const updateProduct = async (id,formData)=>{
    const res = await axios.patch(`${API_URL}${id}`,formData)
    console.log(res.data)
    return res.data
}

const productService = {
    createProduct,
    getProducts,
    deleteProduct,
    getProduct,
    updateProduct
}

export default productService;