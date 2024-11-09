import React, { useEffect, useState } from 'react'
import { IProduct } from '../../interface/product'
import { NavLink } from 'react-router-dom'

import api from '../../config/axios'

type Props = {
    products:IProduct[],
    onRemove:(id:number|string) => void,
}
type IStatus={
  id:number|string,
  name:string,
}
const List = ({products,onRemove}:Props) => {
  const [status,setStatus] = useState<IStatus[]>([])
  useEffect(()=>{
    (async()=>{
      try {
        const {data} = await api.get(`http://localhost:3000/status`)
        setStatus(data);
      } catch (error) {
        console.log(error);
        
      }
    })()
  },[])
  return (
   <div>
    <div className="container mt-5">
  <h2 className="text-center mb-4">Danh Sách Sản Phẩm</h2>
  <table className="table table-hover table-bordered align-middle text-center ">
    <thead className="table-dark">
    <tr  className='text-center'>
            <th scope="col">#</th>
          <th scope="col">Tên Sản Phẩm</th>
             <th scope="col">Mô Tả Sản Phẩm</th>
             <th scope="col">Giá Sản Phẩm</th>
      <th scope="col">Hình Ảnh</th>
        <th scope="col">Trạng Thái</th>
           <th scope="col">Thao Tác</th>
          </tr>
    </thead>
    <tbody>
             {products?.map((product:IProduct,i:number)=>(
                 <tr  className='text-center' key={product.id}>
             <th scope="col">{i+1}</th>
             <th scope="col">{product.name}</th>
             <th scope="col">{product.description}</th>
             <th scope="col">{product.price}</th>
             <th scope="col"><img src={product.image} width={50} height={50}></img></th>
             <th scope="col"> 
                 <select className="form-control" id="exampleSelect">
                     {status.map((statuss)=>(
                       <option key={statuss.id} value={statuss.id}>{statuss.name}</option>
                     ))}
                 </select>
             </th>
             <th scope="col" >
             <button type="button" className="btn btn-warning btn-sm" onClick={()=>onRemove(product.id)}>Xóa</button>
             <NavLink to={`/admin/edit/${product.id}`}><button type="button" className="btn btn-danger btn-sm">Cập Nhật</button></NavLink>
             </th>
           </tr>
             ))}
        
          
         </tbody>
  </table>

</div>

   </div>
    
  )
}

export default List