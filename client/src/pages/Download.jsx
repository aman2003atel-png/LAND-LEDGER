import React from 'react'
import { useNavigate } from 'react-router-dom';
import { assets } from '../assets/assets';
import axios from 'axios';

const Download = () => {

   const backendUrl = import.meta.env.VITE_BACKEND_URL;

   const navigate = useNavigate();
    const handleClick = () => {
    navigate('/'); 
    // handleData();
    handleDownload();

   };

    const handleDownload = async () => {
    try {
      const response = await axios.get(backendUrl + '/api/transaction/download', {
        responseType: 'blob', // Treat response as binary data
      });

      // Create a download link
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'report.csv'); // Filename
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error('Error downloading the file:', error);
    }
  };

   

//    const handleData = async () => {
//     // try {
//     //   const res = await fetch('http://localhost:4000/transaction/scan-receipt', {
//     //     method: 'POST',
//     //     headers: { 'Content-Type': 'application/json' },
//     //     // body: JSON.stringify(),
//     //   });

//     //   const data = await res.json();
//     //   console.log(data);
//     //   //  handle(data)
     
//     // } catch (err) {
//     //    console.log(err.message)
//     // }

//          const person ={
//             "name": "Aman",
//             "age": 23,
//             "address":  "India"
//          }


// const personWrapper = {
//   data: [person]
// };

// const personJSON = JSON.stringify(personWrapper);    
//   handle(JSON.parse(personJSON)); 
         
// };

//   function handle(inputData){
//       const headers = Object.keys(inputData.data[0]).toString();
//       //  console.log(headers);

//      const main = inputData.data.map((item)=> {
//        return Object.values(item).toString();
//      })
//     //  console.log(main);

//      const csv = [headers, ...main].join('\n');
//     //  console.log(csv)
//       startCSVDownload(csv);

//       } 

//       function startCSVDownload(input){
//          const blob = new Blob([input],{ type: 'application/csv'});
//          const url = URL.createObjectURL(blob);

//          const a = document.createElement('a');
//          a.download = 'receipt-csv.csv';
//          a.href = url;
//          a.style.display = 'none';

//          document.body.appendChild(a);

//          a.click();

//          a.remove();
//          URL.revokeObjectURL(url);
//       }



   return (
   <div>
       
      <div className='flex justify-center items-center h-100 bg-white p-4 w-180  rounded border-2 border-gray-400 border-dotted cursor-pointer hover: scale-105 transition-all '>
      <div>
          <div className='flex justify-center items-center '>
            <button onClick={handleClick}    type='submit' className=' mx-32  p-2   text-white border rounded-full cursor-ponter'>
           <img className='  w-20 cursor-pointer' src={ assets.download} alt="" />
           </button>
          </div>
        <div>
        <h1 className='flex justify-center items-center  text-1xl font-bold '>DOWNLOAD CSV FILE</h1>
        <h4 className='flex justify-center items-center font-extralight text-gray-500 '> Click to Download CSV FILE of Uploaded Image </h4>
        <h4 className='flex justify-center items-center font-extralight text-gray-500'> ThankYou for Using Service</h4>
        </div>
      </div>
      </div>
  
   </div>
    )
}

export default Download
