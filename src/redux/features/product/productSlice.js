import { createSlice , createAsyncThunk } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'
import productService from './productService'


const initialState = {
 product : null,
 products : [],
 isError : false,
 isSuccess : false,
 isLoading :false,
 message:'',
 totalStoreValue : '0',
 outOfStock : '0',
 category : []
}

// create new product

export const createProduct = createAsyncThunk('products/create',
 async (formData,thunkAPI)=>{
     try {
         return await productService.createProduct(formData)
         
     } catch (err) {
         const message = (err.res && err.res.data && err.res.data.message) || err.message || err.toString();
         // toast.error(message)
         console.log(err)
         return thunkAPI.rejectWithValue(message)
     }
 }
)

// get all products

export const getProducts = createAsyncThunk(
 'products/getAll',
 async (_, thunkAPI)=>{
     try {
         return await productService.getProducts()
         
     } catch (err) {
         const message = (err.res && err.res.data && err.res.data.message) || err.message || err.toString();
         // toast.error(message)
         console.log(err)
         return thunkAPI.rejectWithValue(message)
     }
 }
)

// delete product

export const deleteProduct = createAsyncThunk(
 'products/delete',
 async (id,thunkAPI)=>{
     try{
         return await productService.deleteProduct(id)
     } 
     catch (err) {
         const message = (err.res && err.res.data && err.res.data.message) || err.message || err.toString();
         // toast.error(message)
         console.log(err)
         return thunkAPI.rejectWithValue(message)
     }
 }
)
// get Product
export const getProduct = createAsyncThunk(
 'products/getProduct',
 async (id,thunkAPI)=>{
     try{
         return await productService.getProduct(id)
     }
     catch (err) {
         const message = (err.res && err.res.data && err.res.data.message) || err.message || err.toString();
         // toast.error(message)
         console.log(err)
         return thunkAPI.rejectWithValue(message)
     }
 }
)


export const updateProduct = createAsyncThunk(
 'products/updateProduct',
 async ({id,formData},thunkAPI)=>{
     try{
         return await productService.updateProduct(id, formData)
     }
     catch (err) {
         const message = (err.res && err.res.data && err.res.data.message) || err.message || err.toString();
         // toast.error(message)
         console.log(err)
         return thunkAPI.rejectWithValue(message)
     }
 }
)

const productSlice = createSlice({
 name : 'product',
 initialState,
 reducers :{
     CALC_STORE_VALUE(state,action){
         const products = action.payload
         const array = []
         products.map((item)=>{
             const {price , quantity} = item
             const productValue = price*quantity
             return array.push(productValue)
         })

         const totalValue = array.reduce((a,b)=>{
             return a+b
         },0)    
         state.totalStoreValue= totalValue
     },
     CALC_OUTOFSTOCK(state,action){
         const products = action.payload
         const array = []
         products.map((item)=>{
             const {quantity} = item
             return array.push(quantity)
         })
         let count = 0
         array.forEach((number)=>{
             if(number === 0 || number==='0'){
                 count +=1
             }
         })
         state.outOfStock=count

     },
     CALC_CATEGORY(state,action){
         const products = action.payload
         const array = []
         products.map((item)=>{
             const {category} = item
             return array.push(category)
         })

         const uniqueCategory =[...new Set(array)]
         state.category = uniqueCategory
        
     }

 },
 extraReducers : (builder)=>{
     builder
     .addCase(createProduct.pending,(state)=>{
         state.isLoading = true
     })
     .addCase(createProduct.fulfilled,(state,action)=>{
         state.isLoading = false;
         state.isSuccess = true;
         state.isError=false;
         console.log(action.payload)
         state.products.push(action.payload);
         toast.success('Product added')
     })
     .addCase(createProduct.rejected,(state,action)=>{
         state.isLoading = false;
         state.isError = true;
         state.message=action.payload
         toast.error(action.payload)
     })

     // get all products state
     .addCase(getProducts.pending,(state)=>{
         state.isLoading = true
     })
     .addCase(getProducts.fulfilled,(state,action)=>{
         state.isLoading = false;
         state.isSuccess = true;
         state.isError=false
         console.log(action.payload)
         state.products = action.payload;
     })
     .addCase(getProducts.rejected,(state,action)=>{
         state.isLoading = false;
         state.isError = true;
         state.message=action.payload
         toast.error(action.payload)
     })

     // delete product state
     .addCase(deleteProduct.pending,(state)=>{
         state.isLoading = true
     })

     
     .addCase(deleteProduct.fulfilled,(state,action)=>{
         state.isLoading = false;
         state.isSuccess = true;
         state.isError=false
         // console.log(action.payload)
         toast.success('Product Deleted Successfully')
         
     })
     .addCase(deleteProduct.rejected,(state,action)=>{
         state.isLoading = false;
         state.isError = true;
         state.message=action.payload
         toast.error(action.payload)
     })
     //get product state
     .addCase(getProduct.pending,(state)=>{
         state.isLoading = true
     })
     .addCase(getProduct.fulfilled,(state,action)=>{
         state.isLoading = false;
         state.isSuccess = true;
         state.isError=false
         state.product = action.payload
     })
     .addCase(getProduct.rejected,(state,action)=>{
         state.isLoading = false;
         state.isError = true;
         state.message=action.payload
         toast.error(action.payload)
     })

     //update product state
     .addCase(updateProduct.pending,(state)=>{
         state.isLoading = true
     })
     .addCase(updateProduct.fulfilled,(state,action)=>{
         state.isLoading = false;
         state.isSuccess = true;
         state.isError=false
         // console.log(action.payload)
         toast.success('Product Updated Successfully')
         
     })
     .addCase(updateProduct.rejected,(state,action)=>{
         state.isLoading = false;
         state.isError = true;
         state.message=action.payload
         toast.error(action.payload)
     })
    }
   })
   
   export const {CALC_STORE_VALUE, CALC_OUTOFSTOCK, CALC_CATEGORY} = productSlice.actions;
   
   export const selectIsLoading = (state) =>state.product.isLoading
   
   export const selectProduct = (state) => state.product.product
   
   export const selectTotalStoreValue = (state)=> state.product.totalStoreValue
   
   export const selectOutOfStock = (state) => state.product.outOfStock
   
   export const selectCategory = (state) => state.product.category





export default productSlice.reducer;