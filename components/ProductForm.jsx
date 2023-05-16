
import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import {ReactSortable} from 'react-sortablejs'

const ProductForm = ({
    _id,
    title: existingTitle,
    description: existingDescription,
    price: existingPrice,
    img: existingImage,
    category: assignCategory,
    properties: assignProperties
}) => {
    const [title,setTitle] = useState(existingTitle ||"");
    const [description,setDescription] = useState(existingDescription||"");
    const [price,setPrice] = useState(existingPrice||0);
    const [images,setImages] = useState(existingImage || []);
    const [categories,setCategories] = useState( []);
    const [selectedCategory,setSelectedCategory] = useState( ''); 
    const [productProperties,setProductProperties] = useState( {});
    const router = useRouter();

    const fetchCategory = async ()=>{
        const response = await axios.get(`/api/category`)
        setCategories(response.data);
      }

    useEffect(()=>{
        fetchCategory()
        
    },[])

    const addProduct =async (e)=>{
        e.preventDefault();
        const data = {title,description,price,images,selectedCategory,productProperties};
        if(_id){
            await axios.put('/api/products',{...data,_id})
        }else{
            await axios.post('/api/products',data);
            
        }
        
        router.push('/Products');
        
    }

    const uploadImage = async(e)=>{
        const files = e.target.files;
        if(files.length > 0){
            let body = new FormData();
            for(const file of files){
                 body.append('file',file);
            }
            
            const response = await fetch('/api/upload',{
                method: 'POST',
                body
            })

            //console.log(await response.json());

            const imageArr = await response.json();
            setImages(imageArr)
            // const imageUrl = await response.json()
            // setImages(imageUrl)
        }
    }

    const updateImagesOrder = (images)=>{
        setImages(images)
    }

    const propertiesToFill = [];
    if(selectedCategory.length>0 && selectedCategory ){
        let selCatInfo = categories.find(({_id})=>_id === selectedCategory)
        propertiesToFill.push(...selCatInfo.properties)

        while(selCatInfo?.parent?._id){
            const parent = categories.find(({_id})=>_id === selCatInfo?.parent?._id)
            propertiesToFill.push(parent.properties)
            selCatInfo = parent

        }
    }

    const addProp = (name,value)=>{
        setProductProperties(prev=>{
            const newProp = {...prev};
            newProp[name] = value;
            return newProp
        })
    }
  return (
    <div className='m-4 md:ml-10'>
            <form className='flex flex-col gap-2' onSubmit={(e)=>addProduct(e)}>
                <h2 className='font-bold text-2xl mb-2 text-blue-900'>New Product</h2>
                <label>Name:</label>
                <input type='text' onChange={e=>setTitle(e.target.value)} value={title} placeholder='product name' name='title' className='px-2 md:w-2/5 py-1 focus:outline-none rounded border-2 border-blue-900'/>
                <label htmlFor="">Category</label>
                <select id="countries" onChange={(ev)=>setSelectedCategory(ev.target.value)} value={selectedCategory} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg md:w-2/5 focus:ring-blue-500 focus:border-blue-500 block  p-2.5 ">
              <option selected>No parent category</option>
              {
                categories.map((category)=>(
                  <option value={category._id} >{category.name}</option>
                ))
              }
            </select>
            {
                propertiesToFill.length > 0 &&
                    propertiesToFill.map(p=>(
                        <div className='flex items-center gap-2 mt-1'>
                            <div className='flex items-center w-1/4 justify-between '>
                                <p>{p.name}</p>
                                                            

                                                            {
                                                                p.value &&
                                                                <select id="countries" value={productProperties[p.name]} onChange={(ev)=>addProp(p.name,ev.target.value)}  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-fit focus:ring-blue-500 focus:border-blue-500 block  p-1 ">
                                                            
                                                                {p.value?.map(v=>(
                                                                    <option value={v} >{v}</option>
                                                                ))}
                                                            </select>
                                                            }
                            </div>
                            
                           
                        </div>
                    ))
            }
                <label>
                    
                    Image:
                    <div className='flex gap-2 items-center'>
                        <ReactSortable list={images} setList={updateImagesOrder}
                        className='flex flex-wrap gap-1'
                        >
                          {
                       images && 
                       images.map(image=>(
                        <img src={image} alt="" className='w-16 h-16 rounded' key={image}/>
                       ))
                       
                    }  
                        </ReactSortable>
                        
                        <div className='flex py-4 px-3 bg-gray-400 rounded w-fit mt-1 cursor-pointer'>
                       <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                    </svg>
                    upload
                    </div>
                    </div>
                    
                    <input type="file"  className='hidden' onChange={(e)=>uploadImage(e)} multiple />
                </label>
                <label>Description:</label>
                <textarea name='description' onChange={e=>setDescription(e.target.value)} value={description} rows={5} placeholder='description' className='px-2 md:w-2/5 py-1 focus:outline-none rounded border-2 border-blue-900'></textarea>
                <label>Price:</label>
                <div className='md:flex md:gap-5'>
                     <input type='number' onChange={e=>setPrice(e.target.value)} placeholder='price' value={price} name='title' className='px-2 md:w-2/5 py-1 mr-3 focus:outline-none rounded border-2 border-blue-900'/>
                <button type='submit' className='bg-blue-900 px-3 py-1 rounded outline-none border-none text-white w-fit'>Save</button>
                </div>
               
            </form>
        </div>
  )
}

export default ProductForm