import React, { useState } from 'react'
import api from '../api/axiosConfig.js';


export default function Hotel({hotel}) {
    const [showForm, setShowForm] = useState(false)
    const [review, setReview] = useState('');
    const [reviewSent, setReviewSent] = useState(false);

    const handleAddReview =()=>{
        setShowForm(!showForm);
    }
    const handleReviewSubmit = (e) =>{
        e.preventDefault();
        sendReview(hotel.id, review);

    }

    const sendReview = async (id, text) => {
        try {
            const res = await api.post('/api/v1/reviews',{reviewBody: text,hotelId:id});
            if (res.status === 201) {
                setReviewSent(true);
                setShowForm(false);
                setReview('');
            }
        } catch (error) {
            console.log(error);
            
        }
       

     }
  return (
    <div className='w-full sm:w-[330px] bg-white shadow-md hover:shadow-lg transition-shadow overflow-hidden rounded-lg my-3'>
         <div className="p-3 flex flex-col gap-2 w-full">
         <p className='text-lg font-semibold text-slate-700 truncate text-center'>{hotel.name}</p>
         <div className='flex items-centergap-1'>


                <p className='text-sm text-gray-600 truncate'>Rooms {hotel.rooms.length}</p>
            </div>
            <div className='flex items-center text-center self-center gap-1'>
           <button onClick={handleAddReview} className='bg-green-700 text-white rounded-md w-40 hover:opacity-95'>Add review</button>                           
            </div>
            {showForm && (
          <form onSubmit={handleReviewSubmit} className='mt-3'>
            <textarea
              className='w-full p-2 border border-gray-300 rounded-md' rows='2'value={review} onChange={(e) => setReview(e.target.value)}
              placeholder='Write down your thoughs about our hotel.'
              required
            />
            <button
              type='submit'
              className='mt-2 bg-blue-500 text-white rounded-md p-2 w-full hover:opacity-95'
            >
              Add
            </button>
            
          </form>
        )}
        {reviewSent && <p className='text-green-500 mt-2'>Review sent!</p>}
         </div>
    </div>
  )
}
