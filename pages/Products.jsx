import Layout from '@/components/Layout'
import axios from 'axios'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'


const Products = () => {
  const [products,setProducts] = useState([]);
  useEffect(()=>{
    const fetchProducts = async ()=>{
        await axios.get('/api/products')
            .then((response)=>setProducts(response.data))
            .catch((error)=>console.log(error));
    }
    fetchProducts();
})
  return (
    <Layout>
        <div>
          <Link href={'/products/new'}>
            <div className='m-4 '>
              <span className='px-2 py-2 bg-blue-900 text-white border-none outline-none rounded'>Add new product</span>
            </div>
          </Link>
          
<div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-10">
    <table className="text-sm w-11/12 mx-auto text-left text-gray-500 400 ">
        <thead className="text-xs text-gray-700 uppercase bg-gray-100 0 400">
            <tr>
                <th scope="col" className="px-6 py-3">
                    Product name
                </th>
                <th scope="col" className="px-6 py-3">
                    Price
                </th>
                <th scope="col" className="px-6 py-3">
                    <span className="sr-only">Edit</span>
                </th>
            </tr>
        </thead>
        <tbody>
          {
            products.map(product =>(
              <tr className="bg-white border-b 0 y-700 hover:bg-gray-50 ray-600" key={product._id}>
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                   {product.title}
                </th>
                <td className="px-6 py-4">
                    {product.price} Ks
                </td>
                <td className="px-6 py-4 text-right flex gap-2">
                    <Link className='font-medium p-1 flex gap-1 bg-blue-900 text-white rounded w-fit items-center' href={'/products/edit/'+product._id}>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                      </svg>

                      Edit
                      </Link>
                      <Link className='font-medium p-1 flex gap-1 bg-blue-900 text-white rounded w-fit items-center' href={'/products/delete/'+product._id}>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                      </svg>


                      Delete</Link>
                </td>
            </tr>
            ))
          }
        </tbody>
    </table>
</div>

        </div>
    </Layout>
  )
}

export default Products