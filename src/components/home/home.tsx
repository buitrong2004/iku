import React from 'react'
import List from '../admin/list'
import Menu from './menu'
import Header from './header'
import { IProduct } from '../../interface/product'
import { Link } from 'react-router-dom'
import Voucher from '../admin/voucher'


type Props = {
    products:IProduct[],
    onRemove:(id:number|string) => void
  }

const Home = ({products, onRemove}:Props) => {
  return (
    <div>
        <div>
      <div>
    <Header></Header>
  <div className="container-fluid">
    <div className="row">
      <div className="sidebar border border-right col-md-3 col-lg-2 p-0 bg-body-tertiary">
        <div className="offcanvas-md offcanvas-end bg-body-tertiary" tabIndex={-1} id="sidebarMenu" aria-labelledby="sidebarMenuLabel">
          <div className="offcanvas-header">
            <h5 className="offcanvas-title" id="sidebarMenuLabel">Company name</h5>
            <button type="button" className="btn-close" data-bs-dismiss="offcanvas" data-bs-target="#sidebarMenu" aria-label="Close" />
          </div>
          <Menu></Menu>
        </div>
      </div>
      <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
          <div className="btn-toolbar mb-2 mb-md-0">
            <div className="btn-group me-2">
          
                <Link to={`/addproduct`}><button type="button"  className="btn btn-sm btn-outline-secondary">Thêm Sản Phẩm</button></Link>
            
              
              <button type="button" className="btn btn-sm btn-outline-secondary">Export</button>
            </div>
            <button type="button" className="btn btn-sm btn-outline-secondary dropdown-toggle d-flex align-items-center gap-1">
              <svg className="bi"><use xlinkHref="#calendar3" /></svg>
              This week
            </button>
          </div>
        </div>
        <List products={products} onRemove={onRemove}></List>
        
      </main>
    </div>
  </div>
</div>

      </div>
    </div>
  )
}

export default Home