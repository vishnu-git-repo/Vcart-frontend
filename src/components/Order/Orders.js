import { useEffect, useState } from "react";
import style from "../../utils/css/orders.module.css"; 
import axios from "axios";
import Progress from "../Common/Progress";
import close from "../../utils/images/icons/close.svg";
import ViewProduct from "../Product/ViewProduct";

export default function Orders() {
    const [orders, setOrders] = useState([]); 
    const [product, setProduct] = useState(null);
    const [showDescription, setShowDescription] = useState(false);
    const [progressView, setProgressView] = useState(true);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const api_uri = `${process.env.REACT_APP_API_URI}/orders/`;
                const user = JSON.parse(localStorage.getItem("user")); // Parse user data
                const user_id = user?._id; // Safely access _id
                const res = await axios.get(api_uri, {
                    params: { user_id }, 
                });
                setOrders(res.data.reverse());
                setProgressView(false);
            } catch (e) {
                console.error(e);
            }
        };
        fetchOrders();
    }, []);


    function handleDescription(e, _product) {
        e.stopPropagation();
        setProduct(_product);
        setShowDescription(true);
    }
    function closeDescription(e) {
        e.stopPropagation();
        setShowDescription(false);
    }
    
    function convertToIST(utcDateString) {
        
        const utcDate = new Date(utcDateString);
        const istDate = new Date(utcDate.getTime());
        return istDate.toLocaleString("en-IN");
    }
    

    return (
        <>
            <div style={{ display: progressView ? "block" : "none" }}>
                <Progress/>
            </div>
            <main 
                className="container"
                style={{ display: progressView ? "none" : "block" }}
            >
                <div className="row">
                    <div className="col-12">
                        <h2 className="text-center mt-4">Orders List</h2>
                    </div>
                    <div id="order-items" className="row gx-2 gy-4 col-12 mb-4">
                        {orders.map((order) => (
                            <div key={order._id} className="">
                                <div className="col-12">
                                    <p className="text-center">
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
                                    <div className="product-cards row d-flex justify-content-center">
                                        {order.products.map((item, index) => (
                                            <div 
                                                key={index} 
                                                className="product-card col-12 col-md-6 col-lg-3"
                                                onClick={(e) => handleDescription(e, item.product)}
                                            >
                                                <div className="product-card-img">
                                                    <img src={item.product.img} alt={"Product image"} />
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
                                        <p className="text-center">Placed at {convertToIST(order.date)}</p>
                                    </div>
                                </div>
                                <hr className="hr"/>
                            </div>
                        ))}
                    </div>
                </div>
            </main>
            {showDescription && product && (
                <div className="product-description" style={{ display: "block" }}>
                    <div className="product-description-card-outer">
                        <div className="product-description-card">
                            <div className="close-btn">                           
                                <img src={close} alt="close" onClick={closeDescription} /> 
                            </div>
                            <ViewProduct product={product} />
                        </div>
                    </div>
                </div>
            )}
        </>
    
    );
}