import Layout from '@/components/Layout'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const CategoriesPage = () => {
  const [name,setName] = useState('')
  const [categories,setCategories] = useState([]);
  const [parentCategory,setParentCategory] = useState();
  const [editCategory,setEditCategory] = useState(null);
  const [properties,setProperties] = useState([]);
  const MySwal = withReactContent(Swal)

  const handleSubmit =async (e) => {
    const data = {
      name,
      parentCategory,
      properties: properties.map(p=>({
        name: p.name,
        value: p.value.split(',')
      }))
    };
    if(editCategory){
      
      data.id = editCategory._id;
      const response = await axios.put('api/category',data);
      console.log(response.data);
    }else{
          e.preventDefault();
          console.log(parentCategory)
          const response = await axios.post(`/api/category`,data)
          fetchCategory()
    }

    setName('');
    setProperties('')
    setParentCategory('');

  }
const fetchCategory = async ()=>{
      const response = await axios.get(`/api/category`)
      setCategories(response.data);
    }
  useEffect(()=>{
    
    fetchCategory()
  },[])

  const editHandler = async (category)=>{
    setEditCategory(category);
    setName(category.name)
    setParentCategory(category?.parent?._id)
    setProperties(category.properties.map(({name,value})=>({
      name,
      value:value.join(",")
    })))
  }

  const deleteHandler = async (category)=>{
    MySwal.fire({
      title: <p>Are you sure?</p>,
      text: `Do you want to delete ${category.name}`,
      cancelButtonText: 'No',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      
      didOpen: () => {
        // `MySwal` is a subclass of `Swal` with all the same instance & static methods
        
      },
    }).then(async(result) => {
      if(result.isConfirmed){
        await axios.delete(`api/category?_id=${category._id}`)
         fetchCategory()
      }
    })
    .catch(()=>{
      return MySwal.fire(<p>cancel</p>)
    })
  }

  const addProperty = ()=>{
    setProperties(prev=>[
      ...prev,{name: '',value: ''}
    ])
  }

  const handleChangeNameProperty = (property,name,index)=>{
    setProperties(prev=>{
      const properties = [...prev];
      properties[index].name = name;
      return properties;
    })
  }

  const handleChangeValueProperty = (property,value,index)=>{
    setProperties(prev=>{
      const properties = [...prev];
      properties[index].value = value;
      return properties;
    })
  }

  const removeProperty=(id)=>{
    setProperties(prev=>{
      const properties = [...prev].filter((p,index)=>{
        return index !== id;
      })
      return properties
    })

  }

  return (
    <Layout>
        <div className='p-2 gap-3 flex flex-col'>
          <h1 className='text-blue-900 text-2xl font-bold'>Categories</h1>
          <p className='text-sm font-semibold'>new category name</p>
          <form className='flex flex-col gap-2 w-full' onSubmit={(e)=>handleSubmit(e)}>
            <div className='flex gap-3'>
               <input type="text" placeholder='name' value={name}  onChange={(e)=>setName(e.target.value)} className='p-1 w-2/4 border-[1px] border-gray-300 rounded'/>
            <select id="countries" onChange={(ev)=>setParentCategory(ev.target.value)} value={parentCategory} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 ">
              <option selected>No parent category</option>
              {
                categories.map((category)=>(
                  <option value={category._id} >{category.name}</option>
                ))
              }
            </select>
            </div>
              
            <div>
              <button onClick={addProperty} type='button' className='w-fit p-1 rounded outline-none text-xs bg-blue-900 text-white border-none'>Add new property</button>
              {
                properties.length>0 && 
                 properties.map((property,index)=>(
                  <div className='flex gap-2 my-1'>
                  <input type='text' placeholder='property'
                    onChange={(ev)=>handleChangeNameProperty(property,ev.target.value,index)}
                    value={property.name} 
                    className=' w-1/4 p-1 rounded border-[1px] border-gray-300'/>
                  <input type='text' 
                    placeholder='values' 
                    value={property.value}
                    onChange={(ev)=>handleChangeValueProperty(property,ev.target.value,index)} 
                    className=' w-1/4 p-1 rounded border-[1px] border-gray-300'/>
                  <button type='button' onClick={()=>removeProperty(index)} className='w-fit bg-gray-400 text-white rounded border-none outline-none p-1 text-xs'>Remove</button>
              </div>
                 ))
              }
              
            </div>
            <button type='submit' className='w-fit outline-none bg-blue-900 text-white rounded px-2 py-1'>Save</button>
          </form>
          <div className="relative md:w-1/2 overflow-x-auto shadow-md sm:rounded-lg mt-10">
    <table className="text-sm w-11/12 mx-auto text-left text-gray-500 400 ">
        <thead className="text-xs text-gray-700 uppercase bg-gray-100 0 400">
            <tr>
                <th scope="col" className="px-6 py-3">
                    Category 
                </th>
                <th scope="col" className="px-6 py-3">
                    Parent 
                </th>
            </tr>
        </thead>
        <tbody>
          {
            categories.map(category =>(
              <tr className="bg-white border-b 0 y-700 hover:bg-gray-50 ray-600" key={category._id}>
                <th scope="row" className="px-6 py-2 font-medium text-gray-900 whitespace-nowrap ">
                   {category.name}
                </th>
                <td className="px-6 py-2">
                    {category?.parent?.name}
                </td>
                <td className="px-6 py-3 text-right flex gap-2">
                    <button onClick={()=>editHandler(category)} className='font-medium p-1 flex gap-1 bg-blue-900 text-white rounded w-fit items-center' >
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                      </svg>

                      Edit
                      </button>
                      <button onClick={()=>deleteHandler(category)} className='font-medium p-1 flex gap-1 bg-blue-900 text-white rounded w-fit items-center' >
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                      </svg>


                      Delete</button>
                </td>
            </tr>
            ) )
          }
              
        </tbody>
    </table>
</div>
        </div>
    </Layout>
  )
}

export default CategoriesPage