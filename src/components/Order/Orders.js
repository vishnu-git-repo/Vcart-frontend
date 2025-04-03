import { useEffect, useState } from "react";
import style from "../../utils/css/orders.module.css"; 
import axios from "axios";

export default function Orders() {
    const [orders, setOrders] = useState([]); 

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const api_uri = `${process.env.REACT_APP_API_URI}/orders/`;
                const user = JSON.parse(localStorage.getItem("user")); // Parse user data
                const user_id = user?._id; // Safely access _id
                const res = await axios.get(api_uri, {
                    params: { user_id }, 
                });
                setOrders(res.data); // Update orders state
            } catch (e) {
                console.error(e);
            }
        };
        fetchOrders();
    }, []);

    return (
        <main className="container">
            <div className="row">
                <div className="col-12">
                    <h2 className="text-center mt-4">Orders List</h2>
                </div>
                <div id="order-items" className="row gx-2 gy-4 col-12 mb-4">
                    {orders.map((order) => (
                        <div key={order._id} className="">
                            <div className="col-12">
                                <p>
                                    Order ID: {order._id}&emsp;
                                    <span className={
                                        (order.status)==="pending"?style.statusPending:
                                        (order.status)==="cancelled"?style.statusRemoved:
                                        (order.status)==="processed"?style.statusProcessed:
                                        (order.status)==="delivered"?style.statusDelivered:""
                                    }
                                    >
                                        {order.status}
                                    </span>
                                </p>
                                <div className="product-cards row">
                                    {order.products.map((item, index) => (
                                        <div key={index} className="product-card col-12 col-md-6 col-lg-3">
                                            <div className="product-card-img">
                                                <img src={`http://localhost:8000/uploads/${item.product.img}` || ""} alt={item.product.name || "Product"} />
                                            </div>
                                            <div className="product-card-body">
                                                <h6>{item.product.name}</h6>
                                                <p>{item.product.attributes}</p>
                                                <p>Seller: {item.product.seller}</p>
                                                <p>
                                                    <del>&#8377; {item.product.initial_price}</del>&nbsp; <b>&#8377; {item.product.fixed_price}</b>
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                    <p>Placed at {order.date}</p>
                                </div>
                            </div>
                            <hr className="hr"/>
                        </div>
                    ))}
                </div>
            </div>
        </main>
    );
}