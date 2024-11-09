import React, { useEffect, useState } from 'react'
import { NavLink, useSearchParams } from 'react-router-dom'
import api from '../../config/axios'
import { IProduct } from '../../interface/product'
import Header from './header'
import Menu from './menu'

type Props = {}

const Search = (props: Props) => {
    const [search] = useSearchParams()
    const [products,setProducts] = useState<IProduct[]>([])
    const [keyrowds,setKeywords] = useState<string>('')
    useEffect(()=>{
        (async()=>{
            const {data} = await api.get('products?name_like=' + search.get('keyword'))
            setProducts(data)
            setKeywords(search.get('keyword') as string)
    })()
        },[])
  return (
    <div>
       <Header></Header>
       <div className='d-flex'>
        <Menu></Menu>
        <div>
        <h1 className='text-[24px] py-10 text-center'>Kết quả tìm kiếm theo từ khóa:<strong>'{keyrowds}'</strong></h1>
        <div className="p-6">
          <div className="grid grid-cols-4 gap-4 ml-20">
            {products && products.map((product:IProduct)=>(
    
              <div key={product.id} className="bg-white p-4 w-[250px] rounded-lg shadow-lg">
                <NavLink to={`/detail/${product.id}`}><img src={product.image} alt="Sữa tắm trắng" className="h-40 w-full object-cover rounded-md mb-4" /></NavLink>
                {/* <div className="text-sm mb-2 text-red-500">Yêu thích</div> */}
                <div className="text-lg font-bold mb-2">{product.name}</div>
                <div className="text-red-500 font-bold text-xl">{product.price}</div>
                {/* <div className="text-green-500 text-sm">99% Giảm</div> */}
              </div>
            ))}
          </div>
        </div>
        </div>
       </div>
    </div>
  )
}

export default Search