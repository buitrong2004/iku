import React from 'react'
import Header from '../../home/header'
import Menu from '../../home/menu'
import { Link } from 'react-router-dom'

type Props = {}

const Order = (props: Props) => {
  return (
   <div>
    <Header></Header>
    <div className='d-flex'>
        <Menu></Menu>
        <div className='order'>
                <div className="container mt-5 ">
     <div className="btn-group me-2">
          
          <Link to={`/addproduct`}><button type="button"  className="btn btn-sm btn-outline-secondary">Tạo Đơn Hàng</button></Link>
      </div>
  <h2 className="text-center mb-4">Beautiful Bootstrap Table</h2>
  <table className="table table-hover table-bordered align-middle text-center">
    <thead className="table-dark">
      <tr>
        <th>#</th>
        <th>Name</th>
        <th>Age</th>
        <th>City</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <th scope="row">1</th>
        <td>John Doe</td>
        <td>28</td>
        <td>New York</td>
        <td>
          <button className="btn btn-primary btn-sm">View</button>
          <button className="btn btn-warning btn-sm">Edit</button>
          <button className="btn btn-danger btn-sm">Delete</button>
        </td>
      </tr>
      <tr>
        <th scope="row">2</th>
        <td>Jane Smith</td>
        <td>32</td>
        <td>Los Angeles</td>
        <td>
          <button className="btn btn-primary btn-sm">View</button>
          <button className="btn btn-warning btn-sm">Edit</button>
          <button className="btn btn-danger btn-sm">Delete</button>
        </td>
      </tr>
      <tr>
        <th scope="row">3</th>
        <td>Emily Johnson</td>
        <td>26</td>
        <td>Chicago</td>
        <td>
          <button className="btn btn-primary btn-sm">View</button>
          <button className="btn btn-warning btn-sm">Edit</button>
          <button className="btn btn-danger btn-sm">Delete</button>
        </td>
      </tr>
    </tbody>
  </table>
</div>
        </div>
 


    </div>
    

   </div>
  )
}

export default Order
