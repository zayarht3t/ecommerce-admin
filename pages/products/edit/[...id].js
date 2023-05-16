import Layout from '@/components/Layout'
import ProductForm from '@/components/ProductForm';
import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'

const EditProductPage = () => {
    const router = useRouter();
    const {id} = router.query;
    const [product,setProduct] = useState(null);
    useEffect(()=>{
      if(!id){
        return;
      }
      
         axios.get('/api/products?id=' + id)
        .then(response=>setProduct(response.data))
        .catch(error=>console.log(error));
    },[id])

  return (
    <Layout>
      <ProductForm {...product}/>
    </Layout>
  )
}

export default EditProductPage