import React, { useState }  from 'react'
import { toast } from 'react-toastify';
import axios from 'axios';
import Download from './Download'
import { assets } from '../assets/assets';
import { useNavigate } from 'react-router-dom';
   

const Upload = () => {

const navigate = useNavigate();
 
    const [InvoiceImg, setInvoiceImg] = useState(false);
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
   
     const handleClick = () => {
    navigate('/download'); 
  };
  
 const onSubmitHandler = async (event) => {
    event.preventDefault()  

    try {
          if(!InvoiceImg){
        return toast.error('Receipt Not Selected')
          }
      const formData = new FormData()
      formData.append('receipt', InvoiceImg)

     const {data} = await axios.post(backendUrl + '/api/transaction/scan-receipt',formData)
      if (data.success) {
          toast.success(data.message)
          setInvoiceImg(false)
      } else {
           toast.error(data.message)
         }
        
    } catch (error) {
              console.log(error.message)
    }

      }
  return  (
   <form onSubmit={onSubmitHandler}>
   <div>
    <div className='flex justify-center items-center h-100 bg-white p-4 w-180  rounded border-2 border-gray-400 border-dotted  hover: scale-105 transition-all '>
    <div>
        <div className='flex justify-center items-center  cursor-pointer '>
          <label htmlFor="receipt-img">
          <img className='  w-15 cursor-pointer' src={ InvoiceImg ? URL.createObjectURL(InvoiceImg): assets.upload} alt="" />
          </label>
          <input onChange={(e)=> setInvoiceImg(e.target.files[0])} type="file"  id="receipt-img" hidden  />
        </div>
        
        <button onClick={handleClick} type='submit' className=' mx-32 my-5  p-2 bg-blue-700  text-white border rounded-full cursor-ponter'>UPLOAD</button>
      
      <div>
      <h1 className='flex justify-center items-center  text-1xl font-bold '>UPLOAD PDF INVOICE</h1>
      <h4 className='flex justify-center items-center font-extralight text-gray-500 '>Drag & drop your PDF invoice or Click to browse </h4>
      <h4 className='flex justify-center items-center font-extralight text-gray-500'> Supports files up to 10MB</h4>
      </div>
    </div>
    </div>
  
 </div>
 </form>

  )
}

export default Upload;
