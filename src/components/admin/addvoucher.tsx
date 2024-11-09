import React, { useEffect, useState } from 'react'
import Menu from '../home/menu'
import Header from '../home/header'
import { useForm } from 'react-hook-form'
import { IProduct } from '../../interface/product'
import Joi from 'joi'
import { joiResolver } from '@hookform/resolvers/joi'
import api from '../../config/axios'
import { IVoucher } from '../../interface/voucher'

type Props = {
    onAdd:(data:IProduct)=>void;
}
const voucherScheama = Joi.object({
  code:Joi.string().required(),
  name:Joi.string().required(),
  type:Joi.string().required(),
  quantity:Joi.number().required(),
  start:Joi.string().required(),
  end:Joi.string().required(),
  status:Joi.required(),
})  

const AddProduct = ({onAdd}: Props) => {
 const {register,handleSubmit,formState:{errors}} = useForm<IVoucher>({
  resolver:joiResolver(voucherScheama)
 })
 const onsubmit = (voucher:IVoucher)=>{
  onAdd(voucher)
 }
  return (
    <div>
        <Header></Header>
        <div className='d-flex'>
<Menu></Menu>
  <div className="container px-5">
    <h2 className="text-center">Thêm sản phẩm</h2>
    <form onSubmit={handleSubmit(onsubmit)}>
      <div className="mb-3">
        <label htmlFor="productName" className="form-label">Mã</label>
        <input type="text" className="form-control" {...register('code')} id="productName" placeholder="Nhập Mã" />
        {errors.code && <div className='text-danger '>{errors.code.message}</div>}
      </div>
      <div className="mb-3">
        <label htmlFor="productDescription" className="form-label">Tên</label>
        <textarea className="form-control" id="productDescription" {...register('name')} rows={3} placeholder="Nhập Tên " defaultValue={""} />
        {errors.name && <div className='text-danger '>{errors.name.message}</div>}
      </div>
      <div className="mb-3">
        <label htmlFor="productPrice" className="form-label">Loại</label>
        <input type="text" className="form-control" {...register('type')} id="productPrice" placeholder="Nhập Loại" />
        {errors.type && <div className='text-danger '>{errors.type.message}</div>}
      </div>
      <div className="mb-3">
        <label htmlFor="productPrice" className="form-label">Số lượng</label>
        <input type="number" className="form-control" {...register('quantity')} id="productPrice" placeholder="Nhập Số Lượng" />
        {errors.quantity && <div className='text-danger '>{errors.quantity.message}</div>}
      </div>
      <div className="mb-3">
        <label htmlFor="productPrice" className="form-label">Ngày Bắt Đầu</label>
        <input type="date" className="form-control" {...register('start')} id="productPrice" placeholder="Nhập Ngày Bắt Đầu" />
        {errors.start && <div className='text-danger '>{errors.start.message}</div>}
      </div>
      <div className="mb-3">
        <label htmlFor="productPrice" className="form-label">Ngày Kết Thúc</label>
        <input type="date" className="form-control" {...register('end')} id="productPrice" placeholder="Nhập Ngày Kết Thúc" />
        {errors.end && <div className='text-danger '>{errors.end.message}</div>}
      </div>
      <div className="mb-3">
        <label htmlFor="productPrice" className="form-label">Trạng Thái</label>
        <input type="text" className="form-control" {...register('status')} id="productPrice" placeholder="Nhập Trạng Thái" />
        {errors.status && <div className='text-danger '>{errors.status.message}</div>}
      </div>
      <button type="submit" className="btn btn-primary">Thêm sản phẩm</button>
    </form>
  </div>
        </div>
        
</div>

  )
}

export default AddProduct