import React, { useEffect, useState } from 'react'
import Header from './header'
import Menu from './menu'
import { IProduct } from '../../interface/product'
import axios from 'axios'
import { GetProductById } from '../../service/service'
import { useParams } from 'react-router-dom'

type Props = {}

const Detail = (props: Props) => {
    const [details,setDetails] = useState<IProduct[]>([])
  
    const param= useParams()
    useEffect(()=>{
        (async()=>{
            const data = await GetProductById(param?.id as number|string)
            setDetails([data]);
        })()
    },[])
  return (

<div>
  <Header></Header>
  <div className='d-flex'>
    <Menu></Menu>
    {Array.isArray(details) && details.map((detail:IProduct)=>(
  <div key={detail.id} className="product-detail">
    <img src={detail.image} alt="Tommy Boy Phố" className="product-image" />
    <h2 className="product-title">{detail.name}</h2>
    <p className="product-price">{detail.price}</p>
    <div className="product-options">
      <div className="product-option">
        <label htmlFor="color">Màu sắc:</label>
        <select id="color" className="select">
          <option value="trang-den">Quai trắng đế đen</option>
          <option value="den-trang">Quai đen đế trắng</option>
          <option value="full-den">Full đen</option>
        </select>
      </div>
      <div className="product-option">
        <label htmlFor="size">Kích cỡ:</label>
        <select id="size" className="select">
          <option value={37}>Size 37</option>
          <option value={38}>Size 38</option>
        </select>
      </div>
      <div className="product-quantity">
        <label htmlFor="quantity">Số lượng:</label>
        <input type="number" id="quantity" className="input" defaultValue={1} min={1} />
      </div>
    </div>
    <button className="btn-add-to-cart">Thêm vào giỏ hàng</button>
    
  </div>
    ))}
  </div>

</div>

  )
}

export default Detail