import Layout from '@/components/Layout'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const Orders = () => {

    const [orders, setOrders] = useState([]);
    const MySwal = withReactContent(Swal)

    useEffect( ()=>{
        const fetchData = async () => {
        const response = await axios.get('api/orders');
        setOrders(response.data);     
        }

        fetchData();

    },[])

    const deleteHandler = async (id)=>{
        MySwal.fire({
          title: <p>Are you sure?</p>,
          text: `Do you want to delete `,
          cancelButtonText: 'No',
          showCancelButton: true,
          confirmButtonText: 'Yes',
          
          didOpen: () => {
            // `MySwal` is a subclass of `Swal` with all the same instance & static methods
            
          },
        }).then((result) => {
          if(result.isConfirmed){
            axios.post('api/deleteOrder',{id});
             
          }
        })
        .catch(()=>{
          return MySwal.fire(<p>cancel</p>)
        })
      }
  return (
    <Layout>
        
<div className="relative overflow-x-auto shadow-md sm:rounded-lg">
    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" className="px-6 py-3">
                    Date
                </th>
                <th scope="col" className="px-6 py-3">
                    Recipient
                </th>
                <th scope="col" className="px-6 py-3">
                    Product
                </th>
                <th scope="col" className="px-6 py-3">
                    PAID
                </th>
                <th scope="col" className="px-6 py-3">
                    <span className="sr-only">Edit</span>
                </th>
            </tr>
        </thead>
        <tbody>
            {
                orders.length > 0 &&
                orders.map(order=>(
                    
                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600" key={order._id}>
                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        {order.createdAt}
                    </th>
                    <td className="px-6 py-4">
                        {order.name} {order.email}<br/>
                        {order.city} {order.postalCode}<br/>
                        {order.country}<br/>
                        {order.street}
                    </td>
                    {
                        order.line_items.length >0 &&
                        <td>
                            {order.line_items.map(item=>(
                                <>
                                    <span className="px-6 py-4" key={item}>
                                        {item.price_data.product_data.name} * {item.quantity}
                                    </span>
                                    <br/>
                                </>
                            ))}
                        </td>
                    }

                    <td className={'px-6 py-4 text-right text-lg'+ (order.paid ? ' text-green-500': ' text-red-500')}>
                        {order.paid ? 'paid' : 'false'}
                    </td>
                    
                    <td className="px-6 py-4 text-right">
                        <button href="#" onClick={()=>deleteHandler(order._id)} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Delete</button>
                    </td>
                </tr>
                ))
            }
        </tbody>
    </table>
</div>

    </Layout>
  )
}

export default Orders