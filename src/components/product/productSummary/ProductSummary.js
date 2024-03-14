import React,  { useEffect } from 'react';
import './ProductSummary.scss';
import { BsCurrencyRupee } from "react-icons/bs";
import { BsCart4, BsCartX } from "react-icons/bs";
import { BiCategory } from "react-icons/bi";
import InfoBox from "../../infoBox/InfoBox";
import { useDispatch, useSelector } from 'react-redux';
import { CALC_CATEGORY, CALC_OUTOFSTOCK, CALC_STORE_VALUE, selectCategory, selectOutOfStock, selectTotalStoreValue } from "../../../redux/features/product/productSlice";





// icons

const earningIcon = <BsCurrencyRupee size={40} color='#fff'/>

const productIcon = <BsCart4 size={40} color='#fff'/>
const categoryIcon = <BiCategory size={40} color='#fff'/>

const outOfStockIcon = <BsCartX size={40} color ='#fff'/>


export const formatNumbers = (x) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

const ProductSummary = ({product}) => {

  const dispatch = useDispatch();
  const totalStoreValue = useSelector(selectTotalStoreValue)
  const outOfStock = useSelector(selectOutOfStock)
  const category = useSelector(selectCategory)

  useEffect(()=>{
    dispatch(CALC_STORE_VALUE(product))
    dispatch(CALC_OUTOFSTOCK(product))
    dispatch(CALC_CATEGORY(product))
  },[dispatch,product])
  return (
    <div className='product-summary'>
    
      <h3 className='--mt'>Inventory Status</h3>
    
        <div className='info-summary'>
          <InfoBox icon={productIcon} title={'Total Products'} count={product.length} bgColor ='card1'/>
          <InfoBox icon={earningIcon} title={'Total Store Value'} count={`₹ ${formatNumbers(totalStoreValue)}`} bgColor ='card2'/>
          <InfoBox icon={outOfStockIcon} title={'Out Of Stock'} count={outOfStock} bgColor ='card3'/>

          <InfoBox icon={categoryIcon} title={'All Categories'} count={category.length} bgColor ='card4'/>

        </div>
    </div>
  )
}

export default ProductSummary
