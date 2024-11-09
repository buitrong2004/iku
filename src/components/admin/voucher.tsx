import React, { useEffect, useState } from 'react'
import Header from '../home/header'
import Menu from '../home/menu'
import { Link, NavLink } from 'react-router-dom'
import { IVoucher } from '../../interface/voucher'
import axios from 'axios'
import api from '../../config/axios'
import { GetAllVouchers } from '../../service/voucher'

type Props = {
    delVoucher:IVoucher[]
}

const Voucher = ({delVoucher}: Props) => {
    const [vouchers,setVoucher]= useState<IVoucher[]>([])
    useEffect(()=>{
        (async()=>{
            const data = await GetAllVouchers()
            setVoucher(data)
        })()
    },[])

  return (
    <div>
        <Header></Header>
        <div className='d-flex '>
            <Menu></Menu>

            <div className='col-md-9 ms-sm-auto col-lg-10 px-md-4'>
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                <div className="btn-toolbar mb-2 mb-md-0">
                    <div className="btn-group me-2">
                        <Link to={`/admin/addvoucher`}>
                        <button type="button" className="btn btn-sm btn-outline-secondary">Tạo Mới</button>
                        </Link><button type="button" className="btn btn-sm btn-outline-secondary">Export</button>
                        </div><button type="button" className="btn btn-sm btn-outline-secondary dropdown-toggle d-flex align-items-center gap-1">
                            <svg className="bi"><use xlinkHref="#calendar3" /></svg>This week</button></div></div>
           <div className="container mt-5">
                <form className="d-flex">
                    <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                    <button className="btn btn-outline-success" type="submit">Search</button>
                    
                </form>
            </div>

           <div className="container mt-5">
  <h2 className="text-center mb-4 ">Danh Sách Voucher</h2>
  <table className="table table-bordered table-hover ">
                        <thead className="table-primary ">
                            <tr>
                                <th scope="col">STT</th>
                                <th scope="col">Mã</th>
                                <th scope="col">Tên</th>
                                <th scope="col">Loại</th>
                                <th scope="col">Số Lượng</th>
                                <th scope="col">Ngày Bắt Đầu</th>
                                <th scope="col">Ngày Kết Thúc</th>
                                <th scope="col">Trạng Thái</th>
                                <th scope="col">Thao Tác</th>
                            </tr>
                        </thead>
                        <tbody>
                            {vouchers.map((voucher:IVoucher,i:number)=>(
                                <tr key={voucher.id}>
                                <th scope="col">{i+1}</th>
                                <th scope="col">{voucher.code}</th>
                                <th scope="col">{voucher.name}</th>
                                <th scope="col">{voucher.type}</th>
                                <th scope="col">{voucher.quantity}</th>
                                <th scope="col">{voucher.start}</th>
                                <th scope="col">{voucher.end}</th>
                                <th scope="col">{voucher.status}</th>
                                <th scope="col" className='ml-2'>
                                    <button type="button" className="btn btn-warning btn-sm" onClick={()=> delVoucher(voucher.id)}>Xóa</button>
                                    <NavLink to={`/admin/vouchers/${voucher.id}`}><button type="button" className="btn btn-danger btn-sm">Cập Nhật</button></NavLink>
                                </th>
                            </tr>  
                            ))}
                            
                        </tbody>
                    </table>
</div>

            </div>
        </div>  
    </div>
  )
}

export default Voucher