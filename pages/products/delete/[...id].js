import Layout from '@/components/Layout'
import axios from 'axios';
import { useRouter } from 'next/router'
import React from 'react'

const DeletePage = () => {
    
    const router = useRouter();
    const {id} = router.query;

    
    const deleteProduct = async (e)=>{
        e.preventDefault();
        await axios.post('/api/delete',{id: id});
        router.push('/Products');
    }

    const redirect = async (e)=>{
        e.preventDefault();
        router.push('/Products')
        
    }
  return (
    <Layout>
        <div className='flex flex-col h-full items-center '>
            <div className=' mx-auto mt-10 shadow-md p-5 rounded border-[1px] border-gray-400 '>
                 <h1 className='text-xl text-red-900 font-bold'>Are you sure you want to delete?</h1>
                 <div className=' flex justify-between mt-3'>
                    <button onClick={deleteProduct} className='px-2 py-1 w-fit bg-red-600 text-white rounded border-none'>Yes</button>
                    <button onClick={redirect} className='px-2 py-1 w-fit bg-gray-500 text-white rounded border-none'>No</button>
                 </div>
            </div>
           
        </div>
        
    </Layout>
  )
}

export default DeletePage