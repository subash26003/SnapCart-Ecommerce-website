import React, { useState } from 'react'
import { assets } from '../assets/assets'
import axios from 'axios'
import { backendURL } from '../App'
import { toast } from 'react-toastify'

const Add = ({token}) => {

  const [image1 , setImage1] = useState(false)
  const [image2 , setImage2] = useState(false)
  const [image3 , setImage3] = useState(false)
  const [image4 , setImage4] = useState(false)

  const [name , setName] = useState("")
  const [description , setDescription ] = useState("")
  const [price, setPrice] = useState("")
  const [category , setCategory] = useState("Men")
  const [subCategory , setSubCategory] = useState("Topwear")
  const [bestseller,setBestseller] = useState(false)
  const [sizes,setSizes] = useState([])

  const updateSize = (s) =>{
    if(sizes.includes(s)){
      setSizes(pre => pre.filter(item => item !== s))
    }else{
      setSizes(pre => [...pre,s])
    }
  }
 

  const handleSubmit = async (e) =>{
    e.preventDefault()
    try{
      const formData = new FormData()

      formData.append('name',name)
      formData.append('description',description)
      formData.append('price',price)
      formData.append('category',category)
      formData.append('subCategory',subCategory)
      formData.append('bestseller',bestseller)
      formData.append('sizes',JSON.stringify(sizes))
      
      image1 && formData.append("image1",image1)
      image2 && formData.append("image2",image2)
      image3 && formData.append("image3",image3)
      image4 && formData.append("image4",image4)

      const response  = await axios.post(backendURL + '/api/product/add' , formData,{headers : {token}})
      console.log(response.data)
      if(response.data.success){
        setName("")
        // setDescription("")
        setImage1(false)
        setImage2(false)
        setImage3(false)
        setImage4(false)
        toast.success(response.data.message)
      }else{
        toast.error(response.data.message)
      }
    }catch(e){
      toast.error(e.message)
      console.log(e.message)
    }
  }

  return (
    <form onSubmit={handleSubmit} className='flex flex-col w-full items-start gap-3'>
      <div>
        <p className='mb-2'>Upload Image</p>
        <div className='flex gap-2'>
          <label htmlFor="image1">
            <img className='w-20 cursor-pointer'  src={image1 ? URL.createObjectURL(image1) :assets.upload_area} alt="" />
            <input onChange={(e) => setImage1(e.target.files[0])} type="file" id="image1" hidden/>
          </label>
          <label htmlFor="image2">
            <img className='w-20 cursor-pointer' src={image2 ? URL.createObjectURL(image2) :assets.upload_area} alt="" />
            <input onChange={(e) => setImage2(e.target.files[0])} type="file" id="image2" hidden/>
          </label>
          <label htmlFor="image3">
            <img className='w-20 cursor-pointer' src={image3 ? URL.createObjectURL(image3) :assets.upload_area} alt="" />
            <input onChange={(e) => setImage3(e.target.files[0])} type="file" id="image3" hidden/>
          </label>
          <label htmlFor="image4">
            <img className='w-20 cursor-pointer' src={image4 ? URL.createObjectURL(image4) :assets.upload_area} alt="" />
            <input onChange={(e) => setImage4(e.target.files[0])} type="file" id="image4" hidden/>
          </label>
        </div>
      </div>
      
      <div className='w-full'>
        <p className='mb-2'>Product Name</p>
        <input value={name} onChange={(e) => setName(e.target.value)} className='w-full max-w-[500px] px-3 py-2' type="text" placeholder='Type here' required/>
      </div>

      <div className='w-full'>
        <p className='mb-2'>Product description</p>
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} className='w-full max-w-[500px] px-3 py-2' type="text" placeholder='Write content here' required/>
      </div>

      <div className='flex flex-col sm:flex-row gap-2 w-full sm:gap-8'>
        <div>
          <p className='mb-2'>Product category</p>
          <select onChange={(e) => setCategory(e.target.value)} className='w-full px-3 py-2'>
            <option value="Men">Men</option>
            <option value="Women">Women</option>
            <option value="Kids">Kids</option>
          </select>
        </div>
        <div>
          <p className='mb-2'>Sub category</p>
          <select onChange={(e) => setSubCategory(e.target.value)} className='w-full px-3 py-2'>
            <option value="Topwear">Topwear</option>
            <option value="Bottomwear">Bottomwear</option>
            <option value="Winterwear">Winterwear</option>
          </select>
        </div>
        <div>
          <p className='mb-2'>Product Price</p>
          <input onChange={(e) => setPrice(e.target.value)}  className='w-full px-3 py-2 sm:w-[120px]' type="number"  placeholder='25'/>
        </div>
      </div>

      <div>
        <p className='mb-2'>Product Sizes</p>
        <div className='flex gap-3'>
          <div onClick={() => updateSize("S")}>
            <p  className={`${sizes.includes('S') ? 'bg-pink-200' : 'bg-slate-200'} px-3 py-1 cursor-pointer`}>S</p>
          </div>
          <div onClick={() => updateSize("M")}>
            <p  className={` ${sizes.includes('M') ? 'bg-pink-200' : 'bg-slate-200'}  px-3 py-1 cursor-pointer`}>M</p>
          </div>
          <div onClick={() => updateSize("L")}>
            <p  className={` ${sizes.includes('L') ? 'bg-pink-300' : 'bg-slate-200'}  px-3 py-1 cursor-pointer`}>L</p>
          </div>
          <div onClick={() => updateSize("XL")}>
            <p  className={` ${sizes.includes('XL') ? 'bg-pink-300' : 'bg-slate-200'}  px-3 py-1 cursor-pointer`}>XL</p>
          </div>
          <div onClick={() => updateSize("XXL")}>
            <p  className={` ${sizes.includes('XXL') ? 'bg-pink-300' : 'bg-slate-200'}  px-3 py-1 cursor-pointer`}>XXL</p>
          </div>
        </div>
      </div>
      <div className='flex gap-2 mt-2'>
        <input onClick={() => setBestseller(pre => !pre)} type="checkbox" id="bestseller" />
        <label className='cursor-pointer ' htmlFor="bestseller">Add to Bestseller</label>
      </div>
      <button type="submit" className='w-28 py-3 mt-4 bg-black text-white'>ADD</button>
    </form>
  )
}

export default Add