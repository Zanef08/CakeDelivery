import React from 'react'
import "./ViewOrders.css"
import { useState } from 'react'
import { toast } from "react-toastify"
import { useEffect } from 'react'
import axios from "axios"
import { assets } from '../../assets/assets'

const ViewOrders = ({ url }) => {
  const [orders, setOrders] = useState([]);
  const fecthAllOrders = async () => {
    const response = await axios.get(url + "/api/order/list");
    if (response.data.success) {
      setOrders(response.data.data);
      console.log(response.data.data);
    }
    else {
      toast.error("Error")
    }
  }
  const statusHandler = async (event, orderId) => {
    const response = await axios.post(url + "/api/order/status", {
      orderId,
      status: event.target.value
    })
    if (response.data.success) {
      await fecthAllOrders();
      toast.success("Status Updated")
    }
  }

    useEffect(() => {
      fecthAllOrders();
    }, []);

    return (
      <div className='order add'>
        <h3>Order Page</h3>
        <div className='order-list'>
          {orders.map((order, index) => (
            <div key={index} className='order-item'>
              <img src={assets.parcel_icon} alt="" />
              <div>
                <p className='order-item-food'>
                  {order.items.map((item, index) => {
                    if (index === order.items.length - 1) {
                      return item.name + " x " + item.quantity
                    }
                    else {
                      return item.name + " x " + item.quantity + ", "
                    }
                  })}
                </p>
                <p className="order-item-name">{order.address.userName}</p>
                <p className="order-item-address"> Address:  
                   {order.address.address}
                </p>
                <p className="order-item-phone">Phone Number: {order.address.phone}</p>
                <p className='order-item-date'>Delivery Date: {order.address.dateTime}</p>
              </div>
              <p>Items: {order.items.length}</p>
              <p>Price: ${order.amount}</p>
              <select onChange={(event) => statusHandler(event, order._id)} value={order.status}>
                <option value="Cake Processing">Cake Processing</option>
                <option value="Out for delivery">Out for delivery</option>
                <option value="Delivered">Delivered</option>
              </select>
            </div>

          ))}
        </div>
      </div>
    )
  }

  export default ViewOrders
