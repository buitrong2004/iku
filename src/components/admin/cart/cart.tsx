import React, { useState } from 'react'
import { IProduct } from '../../../interface/product';
import Header from '../../home/header';
import Menu from '../../home/menu';



const Cart = () => {
  const [cart,setCart] = useState<IProduct[]>([])
  const increaseQuantity = (id:number|string) => {
    setCart(
      cart.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  // Hàm giảm số lượng
  const decreaseQuantity = (id:number|string) => {
    setCart(
      cart
        .map((item) =>
          item.id === id && item.quantity > 1
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  // Hàm xóa sản phẩm khỏi giỏ hàng
  const removeFromCart = (id:number|string) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  // Hàm tính tổng tiền
  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.quantity * item.price, 0);
  };

  return (
   <div>
    <Header></Header>
     <div className='d-flex'>
      <Menu></Menu>
      <h2 className="text-2xl font-bold mt-8 mb-4">Your Cart</h2>
      {cart.length === 0 ? (
        <p className="text-gray-600">Your cart is empty.</p>
      ) : (
        <div className="bg-white p-6 rounded-lg shadow-lg">
          {cart.map((item) => (
            <div
              key={item.id}
              className="flex justify-between items-center border-b border-gray-200 pb-4 mb-4"
            >
              <div>
                <h3 className="text-lg font-semibold">{item.name}</h3>
                <p className="text-gray-500">
                  ${item.price} x {item.quantity}
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => decreaseQuantity(item.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                >
                  -
                </button>
                <span className="px-4">{item.quantity}</span>
                <button
                  onClick={() => increaseQuantity(item.id)}
                  className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                >
                  +
                </button>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="ml-4 bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-600"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}

          {/* Tổng giá */}
          <div className="flex justify-between items-center mt-4">
            <h3 className="text-lg font-bold">Total Price:</h3>
            <span className="text-xl font-semibold">${getTotalPrice()}</span>
          </div>

          {/* Nút thanh toán */}
          <div className="text-right mt-6">
            <button className="bg-blue-500 text-white py-2 px-6 rounded hover:bg-blue-600">
              Checkout
            </button>
          </div>
        </div>
      )}
     </div>
   </div>
  );
}

export default Cart