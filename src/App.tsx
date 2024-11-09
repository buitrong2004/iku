import React, { useEffect, useState } from 'react';
import './App.css'
import { Route, Routes, useNavigate } from 'react-router-dom';
import Home from './components/home/home';
import { IProduct } from './interface/product';
import { AddProducts, DeleteProduct, GetAllProducts, UpdateProduct } from './service/service';
import AddProduct from './components/admin/add';
import EditProduct from './components/admin/edit';
import Page from './components/home/page';
import Detail from './components/home/detail';
import Voucher from './components/admin/voucher';
import AddVoucher from './components/admin/addvoucher';
import { IVoucher } from './interface/voucher';
import { AddVouchers, EditVouchers, VoucherDel } from './service/voucher';
import EditVoucher from './components/admin/editvoucher';
import Order from './components/admin/order.tsx/order';
import Search from './components/home/search';
import Cart from './components/admin/cart/cart';


function App() {
  const [products,setProducts] = useState<IProduct[]>([]);
  const [vouchers,setVoucher]= useState<IVoucher[]>([])
  const navigate = useNavigate()
  useEffect(()=>{
    (async()=>{
    
        const data = await GetAllProducts();
        setProducts(data)
      
    })()
  },[])
 
  const onAdd = async(product:IProduct)=>{
    try {
      const data = await AddProducts(product)
      alert("Thêm thành công.")
      setProducts([...products,data]);
      navigate('/')
    } catch (error) {
      console.log(error);
      
    }
  }
  const onDel = async(id:number|string)=>{
    try {
      const confirm = window.confirm("Bạn muốn xóa không ?")
      if(confirm){
        const product = await DeleteProduct(id);
        alert("Xóa thành công.");
        const newproducts = products.filter(product => product.id !== id)
        setProducts(newproducts)
      }
    } catch (error) {
      console.log(error);
      
    }
  }
  const onUpdate = async(product:IProduct,id:number|string)=>{
    try {
      const resdata = await UpdateProduct(product,id)
      alert("Cập nhật thành công.");
      const newproducts = products.map(product=> (product.id == id)?resdata:product)
      setProducts(newproducts)
      navigate('/')
    } catch (error) {
      console.log(error);
      
    }
  }
  const onVoucher = async(voucher:IVoucher)=>{
    try {
      const vc = await AddVouchers(voucher)
      alert("Thêm thành công.")
      setVoucher([...vouchers,vc]);
      navigate('/admin/voucher')
    } catch (error) {
      console.log(error);
    }
  }
  const updateVoucher = async(voucher:IVoucher,id:number|string)=>{
    try {
      const dataVoucher = await EditVouchers(voucher,id)
      alert("Cập nhật thành công.")
      const newvouchers = vouchers.map(voucher => (voucher.id == voucher)?dataVoucher:voucher)
      setProducts(newvouchers)
      navigate('/admin/voucher')
    } catch (error) {
      console.log(error);
      
    }
  }
  const voucherDel = async(id:number|string)=>{
    try {
      const confirm = window.confirm("Bạn muốn xóa không ?")
      if(confirm){
        const voucherss = await VoucherDel(id);
        alert("Xóa thành công.");
        const newvouchers = vouchers.filter(voucherss => voucherss.id !== id)
        setVoucher(newvouchers)
      }
    } catch (error) {
      console.log(error);
      
    }
  }
  return ( 
      <>
      <Routes>
        <Route path='/' element={<Page></Page>}></Route>
        <Route path='/admin/quanlysp' element={<Home products={products} onRemove={onDel}></Home>}></Route>
        <Route path='/addproduct' element={<AddProduct onAdd={onAdd} ></AddProduct>}></Route>
        <Route path='/admin/edit/:id' element={<EditProduct onUpdate={onUpdate}></EditProduct>}></Route>
        <Route path='/detail/:id' element={<Detail></Detail>}></Route>
        <Route path='/admin/voucher' element={<Voucher delVoucher={voucherDel}></Voucher>}></Route>
        <Route path='/admin/addvoucher' element={<AddVoucher onAdd={onVoucher}></AddVoucher>}></Route>
        <Route path='/admin/vouchers/:id' element={<EditVoucher onUpdate={updateVoucher}></EditVoucher>}></Route>
        <Route path='/admin/order' element={<Order></Order>}></Route>
        <Route path='/search' element={<Search></Search>}></Route>
        <Route path='/cart' element={<Cart></Cart>}></Route>
      </Routes>
      </>
  )
     
}

export default App
