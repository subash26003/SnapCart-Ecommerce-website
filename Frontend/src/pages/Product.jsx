import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import {ShopContext} from './../context/ShopContext'
import RelatedProducts from '../components/RelatedProducts'
import { assets } from '../assets/assets'

const Product = () => {

  const {products,currency,addToCart} = useContext(ShopContext)
  const {productId} = useParams()
  const [productData , setProductData] = useState(false)
  const [image , setImage] = useState('')
  const [size , setSize] = useState('')

  const fetchProductData = async () =>{
    products.map((item) => {
      if(item._id === productId){
        setProductData(item)
        setImage(item.image[0])
        return null;
      }
    })
  }

  useEffect(() => {
    fetchProductData();
  },[productId])

  return productData ? (
    <div className='border-t-2 transition-opacity esae-in duration-500 opacity-100 pt-10'>
      {/*--------------------- Product Data ------------------ */}
      <div className='flex flex-col sm:flex-row gap-12 '>
        {/*-------------------- images --------------------*/}
        <div className='flex-1 flex flex-col-reverse gap-3 sm:flex-row '>
          <div className='product-images flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full'>
          {
            productData.image.map((item , index) => (
              <img onClick={() => setImage(item)} className='w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer' key={index} src={item} alt="" />
            ))
          }
          </div>
          <div className='w-full sm:w-[80%]'>
            <img src={image}  className='w-full h-auto' alt="" />
          </div>
        </div>
        {/*------------------- Info -------------------- */}
        <div className='flex-1'>
          <h1 className='text-2xl sm:text-3xl font-medium mt-2'>{productData.name}</h1>
          <div className='flex items-center gap-1 mt-2'>
            <img src={assets.star_icon} className='w-3.5 ' alt="" />
            <img src={assets.star_icon} className='w-3.5' alt="" />
            <img src={assets.star_icon} className='w-3.5' alt="" />
            <img src={assets.star_icon} className='w-3.5' alt="" />
            <img src={assets.star_dull_icon} className='w-3.5' alt="" />
            <p className='text-gray-400 pl-2'>(122)</p>
          </div>
          <p className='text-3xl font-medium mt-5'>{currency}{productData.price}</p>
          <p className='mt-5 text-gray-500 w-4/5'>{productData.description}</p>
          <div className='flex flex-col gap-4 my-8 '>
            <p >Select Size</p>
            <div className='flex gap-2 my-4'>
              {
                productData.sizes.map((item,index) => (
                  <button key = {index} onClick={() => setSize(item)} className={`border ${size === item ? 'border-orange-500' : ''} w-10 h-10 bg-gray-200`} >{item}</button>
                ))
              }
            </div>
          </div>
          <button onClick={() => addToCart(productData._id , size)} className=' text-white bg-black py-3 px-8 mt-4 text-sm active:bg-gray-800'>ADD TO CART</button>
          <hr className='mt-8 sm:w-4/5'/>
          <div className='text-sm text-gray-500 mt-5 flex flex-col gap-1'>
            <p>100% Original Product</p>
            <p>Cash on delivery is available on this product.</p>
            <p>Easy return and exchange policy within 7 days.</p>
          </div>
        </div>
      </div>
      {/* ------------- Description & Review section */}

      <div className='mt-20'>
        <div className='flex'>
          <p className='border font-semibold px-5 py-3 text-sm'>Description</p>
          <p className='border px-5 py-3 text-sm'>Reviews (122)</p>
        </div>
        <div className='flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500'>
          <p>Discover a seamless online shopping experience with our e-commerce platform, offering a wide range of high-quality products at unbeatable prices, designed to meet all your needs with convenience and ease.</p>
          <p>Your one-stop destination for a diverse selection of products, combining convenience, quality, and fast delivery to enhance your shopping journey from start to finish.</p>
        </div>
      </div>
      {/* ----------- Display related products */}
      <RelatedProducts id={productData._id} category={productData.category} subCategory={productData.subCategory} />
    </div>
  ) : <div className='opacity-0'></div>
}

export default Product