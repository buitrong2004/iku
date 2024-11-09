import React, { useEffect, useState } from 'react'
import Header from './header'
import Menu from './menu'
import { IProduct } from '../../interface/product'
import { GetAllProducts } from '../../service/service'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import api from '../../config/axios'

type Props = {}

const Page = (props: Props) => {
    const [products,setProducts] = useState<IProduct[]>([])
    const {register,handleSubmit} = useForm()
    const navigate = useNavigate()
    const [cart, setCart] = useState<IProduct[]>([]);
    const addToCart = (product:IProduct) => {
      const existingProduct = cart.find((item) => item.id === product.id);
  
      if (existingProduct) {
        setCart(
          cart.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        );
      } else {
        setCart([...cart, { ...product, quantity: 1 }]);
      }
    };
  
    useEffect(()=>{
      (async()=>{
          try {
              const {data} = await api.get(` http://localhost:3000/cart`);
              setProducts(data)
          } catch (error) {
              console.log(error);
              
          }
      })()
  },[])
   
    useEffect(()=>{
        (async()=>{
            try {
                const data = await GetAllProducts();
                setProducts(data)
            } catch (error) {
                console.log(error);
                
            }
        })()
    },[])
    const onsubmit = (data:any)=>{
      const {keywords} = data
      navigate(`/search?keyword=${keywords}`)
    }
  return (

       
<div>
  <Header></Header>
  
  <div className='d-flex'>
    <Menu></Menu>
    
      <div className='timkiem'>
      <div className="container mt-4">
      <div className="row">
      <div className="container mt-5">
                <form className="d-flex" onSubmit={handleSubmit(onsubmit)}>
                    <input className="form-control me-2" {...register('keywords')} type="search" placeholder="Search" aria-label="Search" />
                    <button className="btn btn-outline-success" type="submit">Search</button>
                    
                </form>
            </div>
 
        <div className="p-6">
          <div className="grid grid-cols-6 gap-4">
            {products && products.map((product:IProduct)=>(
    
              <div key={product.id} className="bg-white p-2 w-[200px] h-[308px] rounded-lg shadow-lg">
                <NavLink to={`/detail/${product.id}`}><img src={product.image} alt="Sữa tắm trắng" className="h-40 w-[188px] h-[188px] object-cover  mb-4" /></NavLink>
                {/* <div className="text-sm mb-2 text-red-500">Yêu thích</div> */}
                <div className="text-lg font-thin text-sm	 mb-2">{product.name}</div>
                <div className="text-red-500 font-normal text-lg d-flex"><div className='underline decoration-1 text-sm mt-1'>đ </div><div className='ml-1'> {product.price}</div>
                <button
              onClick={() => addToCart(product)}
              className=" bg-blue-500 text-white py-2 px-2 rounded hover:bg-blue-600 w-24 h-10 ml-10"

            >
              Thêm
            </button>
                </div>
                {/* <div className="text-green-500 text-sm">99% Giảm</div> */}
               
              </div>
            ))}
          </div>
        </div>
  </div>
</div>
      </div>
  </div>
   {/* Giỏ hàng */}
  
    </div>



  )
}

export default Page