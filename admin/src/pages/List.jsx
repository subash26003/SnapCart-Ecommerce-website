import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { backendURL, currency } from '../App'
import { toast } from 'react-toastify'

const List = ({token}) => {
  const [list , setList] = useState([])

  const fetchList = async () =>{
    try{
      const response = await axios.get(backendURL + '/api/product/list')
      if(response.data.success){
        setList(response.data.products)
      }else{
        toast.error(response.data.message)
      }
    }catch(error){
      console.log(error.message)
    }
  }

  const removeProduct = async (id) =>{
    try {
       const response = await axios.post(backendURL + '/api/product/remove' , {id} , {headers : {token : token}})
       console.log(response.data)
       if(response.data.success){
        toast.success(response.data.message)
       }else{
        toast.error(response.data.message)
       }
    } catch (error) {
      console.log(error.message)
    }finally{
      await fetchList()
    }
  }

  useEffect(() => {
    fetchList()
  },[])

  return (
    <>
      <p className='mb-2'>All Products List</p>
      <div className='flex flex-col gap-2'>
        {/* ------------ List Table Title ------------ */}

        <div className='hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-1 px-2 border bg-gray-100 text-sm'> 
          <p>Image</p>
          <p>Name</p>
          <p>Category</p>
          <p>Price</p>
          <p className='text-center'>Action</p>
        </div>
        {
          list.map((item , index) => (
            <div key={index} className='grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center gap-2 py-1 px-2 border text-sm'>
              <img className='w-12' src={item.image[0]} alt="" />
              <p>{item.name}</p>
              <p>{item.category}</p>
              <p>{currency}{item.price}</p>
              <p onClick={() => removeProduct(item._id)} className='text-right  md:text-center cursor-pointer  text-lg'>X</p>
            </div>
          ))
        }
      </div>
    </>
  )
}

export default List