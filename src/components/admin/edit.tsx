import React, { useEffect, useState } from 'react'
import Menu from '../home/menu'
import Header from '../home/header'
import { useForm } from 'react-hook-form'
import { IProduct } from '../../interface/product'
import Joi from 'joi'
import { joiResolver } from '@hookform/resolvers/joi'
import { GetProductById } from '../../service/service'
import { useParams } from 'react-router-dom'
import api from '../../config/axios'

type Props = {
    onUpdate:(data:IProduct)=>void;
}
type IStatus ={
  id:number|string,
  name:string,
}
const productScheama = Joi.object({
  name:Joi.string().required(),
  description:Joi.string().required(),
  price:Joi.number().required(),
  status:Joi.string(),
  image:Joi.required(),

})
const EditProduct = ({onUpdate}: Props) => {
  const [status,setStatus] = useState<IStatus[]>([])
  const [files,setFiles]= useState([]);
  const {register,handleSubmit,formState:{errors},reset} = useForm<IProduct>({
    resolver:joiResolver(productScheama)
  });
  useEffect(()=>{
    (async()=>{
      const {data} = await api.get(`http://localhost:3000/status`)
      setStatus(data) 
    })()
  },[])
  const param = useParams()
    useEffect(()=>{
        (async()=>{
            try {
                const product = await GetProductById(param?.id as number|string)
                    reset({
                        name:product.name,
                        description:product.description,
                        price:product.price,
                        status:product.status,
                        image:product.image,
                    })
            } catch (error) {
                console.log(error);
                
            }
        })()
    },[])
  
  const onFileUploadHandler = (e:any) =>{
    setFiles(e.target.files)
  };
  const images = () =>{
    return [...files].map((img) =>(
      <div className=''>
        <img src={URL.createObjectURL(img)} width={200} className='d-flex justify-content-start' />
      </div>
    ))
  }
   
    const onsubmit = (data:FormData)=>{
        onUpdate(data,param?.id as number|string);
    }
  return (
    <div>
        <Header></Header>
        <div className='d-flex'>
<Menu></Menu>
  <div className="container px-5">
    <h2 className="text-center">Chỉnh sửa sản phẩm</h2>
    <form onSubmit={handleSubmit(onsubmit)}>
      <div className="mb-3">
        <label htmlFor="productName" className="form-label">Tên sản phẩm</label>
        <input type="text" className="form-control" {...register('name')} id="productName" placeholder="Nhập tên sản phẩm" />
        {errors.name && <div className='text-danger '>{errors.name.message}</div>}
      </div>
      <div className="mb-3">
        <label htmlFor="productDescription" className="form-label">Mô tả sản phẩm</label>
        <textarea className="form-control" id="productDescription" {...register('description')} rows={3} placeholder="Nhập mô tả sản phẩm" defaultValue={""} />
        {errors.description && <div className='text-danger '>{errors.description.message}</div>}
      </div>
      <div className="mb-3">
        <label htmlFor="productPrice" className="form-label">Giá sản phẩm</label>
        <input type="number" className="form-control" {...register('price')} id="productPrice" placeholder="Nhập giá sản phẩm" />
        {errors.price && <div className='text-danger '>{errors.price.message}</div>}
      </div>
      <div className="mb-3">
      <label htmlFor="productName" className="form-label">Trạng Thái</label>
        <select {...register('status')} className="form-select" id="productCategory">
                    {status.map((statuss)=>(
                        <option key={statuss.id} value={statuss.id}>{statuss.name}</option>
                    ))}
        </select>
      </div>
      <div className="mb-3">
        <label htmlFor="productImage" className="form-label">Ảnh sản phẩm</label>
        <input type="file" className="form-control " {...register('image')} id="file" multiple accept="image/*" onChange={onFileUploadHandler}/>
        {images()}
        {errors.image && <div className='text-danger '>{errors.image.message}</div>}
      </div>
      <button type="submit" className="btn btn-primary">Cập nhật</button>
    </form>
  </div>
        </div>
        
</div>

  )
}

export default EditProduct












// import React, { useEffect, useState } from 'react'
// import Menu from '../home/menu'
// import Header from '../home/header'
// import { useForm } from 'react-hook-form'
// import { IProduct } from '../../interface/product'
// import Joi from 'joi'
// import { joiResolver } from '@hookform/resolvers/joi'
// import { useParams } from 'react-router-dom'
// import { GetProductById } from '../../service/service'

// type Props = {
//   onUpdate:(id:number|string)=>void;
// }
// const productScheama = Joi.object({
//   name:Joi.string().required(),
//   description:Joi.string().required(),
//   price:Joi.number().required(),
//   image:Joi.required(),

// })
// const EditProduct = ({onUpdate}: Props) => {
//   const [files,setFiles]= useState([]);
//  const param = useParams()
//   useEffect(()=>{
//     (async()=>{
//       const data = await GetProductById(param?.id as number|string)
//       reset({
//         name:data.name,
//         description:data.description,
//         price:data.price,
//         image:data.image,
//       })
//     })()
//   },[])
//   const onFileUploadHandler = (e:any) =>{
//     setFiles(e.target.files)
//   };
//   const images = () =>{
//     return [...files].map((img) =>(
//       <div className=''>
//         <img src={URL.createObjectURL(img)} width={200} className='d-flex justify-content-start' />
//       </div>
//     ))
//   }
//     const {register,handleSubmit,formState:{errors},reset} = useForm<IProduct>({
//       resolver:joiResolver(productScheama)
//     });
//     const onsubmit = (data:FormData)=>{
//       onUpdate(data,param?.id as number|string);
//     }
//   return (
//     <div>
//         <Header></Header>
//         <div className='d-flex'>
// <Menu></Menu>
//   <div className="container px-5">
//     <h2 className="text-center">Cập nhật sản phẩm</h2>
//     <form onSubmit={handleSubmit(onsubmit)}>
//       <div className="mb-3">
//         <label htmlFor="productName" className="form-label">Tên sản phẩm</label>
//         <input type="text" className="form-control" {...register('name')} id="productName" placeholder="Nhập tên sản phẩm" />
//         {errors.name && <div className='text-danger '>{errors.name.message}</div>}
//       </div>
//       <div className="mb-3">
//         <label htmlFor="productDescription" className="form-label">Mô tả sản phẩm</label>
//         <textarea className="form-control" id="productDescription" {...register('description')} rows={3} placeholder="Nhập mô tả sản phẩm" defaultValue={""} />
//         {errors.description && <div className='text-danger '>{errors.description.message}</div>}
//       </div>
//       <div className="mb-3">
//         <label htmlFor="productPrice" className="form-label">Giá sản phẩm</label>
//         <input type="number" className="form-control" {...register('price')} id="productPrice" placeholder="Nhập giá sản phẩm" />
//         {errors.price && <div className='text-danger '>{errors.price.message}</div>}
//       </div>
//       {/* <div className="mb-3">
//         <label htmlFor="productCategory" className="form-label">Trạng Thái</label>
//         <select className="form-select" id="productCategory">
//           <option selected>Chọn danh mục</option>
//           <option value={1}>Điện thoại</option>
//           <option value={2}>Máy tính</option>
//           <option value={3}>Phụ kiện</option>
//         </select>
//       </div> */}
//       <div className="mb-3">
//         <label htmlFor="productImage" className="form-label">Ảnh sản phẩm</label>
//         <input type="file" className="form-control " {...register('image')} id="file" multiple accept="image/*" onChange={onFileUploadHandler}/>
//         {images()}
//         {errors.image && <div className='text-danger '>{errors.image.message}</div>}
//       </div>
//       <button type="submit" className="btn btn-primary">Cập nhật sản phẩm</button>
//     </form>
//   </div>
//         </div>
        
// </div>

//   )
// }

// export default EditProduct