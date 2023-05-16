import Layout from '@/components/Layout'
import ProductForm from '@/components/ProductForm';
import axios from 'axios';
import { useRouter } from 'next/router';
import React, {  useState } from 'react'

const NewProduct = () => {
    const [title,setTitle] = useState("");
    const [description,setDescription] = useState("");
    const [price,setPrice] = useState(0);
    const router = useRouter();


    const addProduct =async (e)=>{
        e.preventDefault();
        const data = {title,description,price};
        await axios.post('/api/products',data);
        router.push('/Products');
        
    }


  return (
    <Layout>
        <ProductForm/>
    </Layout>
  )
}

export default NewProduct