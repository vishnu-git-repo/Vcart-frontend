import { useState, useEffect } from "react";
import "../../utils/css/cart.css";
import axios from "axios";
import Progress from "../Common/Progress";
import close from "../../utils/images/icons/close.svg";
import ViewProduct from "../Product/ViewProduct";

export default function Cart() {
    const [cart, setCart] = useState([]);
    const [product, setProduct] = useState(null);
    const [showDescription, setShowDescription] = useState(false);
    const [progressView, setProgressView] = useState(true);

    useEffect(() => {
        const storedCart = localStorage.getItem("cart");
        if (storedCart) {
            const parsedCart = JSON.parse(storedCart);
            if (Array.isArray(parsedCart)) {
                setCart(parsedCart.reverse()); 
                setProgressView(false);
            } else {
                setCart([]);
            }
        }
    }, []); 

    function handleQuantityChange(index, newQuantity) {
        const updatedCart = [...cart];
        updatedCart[index].quantity = newQuantity;
        setCart(updatedCart);
        localStorage.setItem("cart", JSON.stringify(updatedCart)); 
    }
    async function placeOrder(){
        const user_id = JSON.parse(localStorage.getItem("user"))._id;
        const products = []
        if(cart.length>0){
            cart.map((product)=>{
                products.push({
                    product : product._id,
                    product_quantity : product.quantity
                })
            })
            const order = {
                user_id,
                products
            }
            const url = process.env.REACT_APP_API_URI + "/orders/create"
            await axios.post(url,order)
            .then( res=>{
                console.log(res.data.message);
                alert(res.data.message)
            } )
            .catch( e=>console.log(e) )
        }else{
            alert("No items in cart to place order")
        }
    }

    function handleDescription(e, _product) {
        e.stopPropagation();
        setProduct(_product);
        setShowDescription(true);
    }
    function closeDescription(e) {
        e.stopPropagation();
        setShowDescription(false);
    }

    return (
        <>
            <div style={{ display: progressView ? "block" : "none" }}>
                <Progress />
            </div>
            <main 
                className="container"
                style={{ display: progressView ? "none" : "block" }}
            >
                <div id="cart-amount" className="col-12 container m-0">
                    <b>Total Amount:</b>&emsp; 
                    <span>&#8377; {cart.reduce((total, product) => total + (product.fixed_price || 0) * (product.quantity || 1), 0)}</span>
                    &nbsp;<button className="btn btn-success" onClick={placeOrder}>Place Order</button>
                </div>
                <div className="col-12">
                    <h2>Cart Items</h2>
                </div>
                <div className="row">    
                    <div id="cart-items" className="container">
                        <div id="product-cards" className="row gy-5">
                        {
                            cart.map((product, index) => (
                                <div 
                                    key={index} className="product-card col-12 col-md-6 col-lg-3"
                                >
                                        
                                    <div className="product-card-img" onClick={(e) => handleDescription(e, product)}>
                                        <img src={product.img} alt={product.name || "Product"} />
                                    </div>
                                    <div className="product-card-body">
                                        <h6>{product.name || "Product Name"}</h6>
                                        <div className="cart-tems-body-content">
                                            <p id="cart-items-counter">
                                                <b id="cart-items-add" onClick={() => handleQuantityChange(index, (product.quantity || 1) + 1)}>+</b>
                                                <input
                                                    id="cart-items-count"
                                                    type="number"
                                                    value={product.quantity || 1}
                                                    onChange={(e) => handleQuantityChange(index, parseInt(e.target.value, 10) || 1)}
                                                />
                                                <b id="cart-items-sub" onClick={() => handleQuantityChange(index, Math.max((product.quantity || 1) - 1, 1))}>-</b>
                                            </p>
                                            <p id="cart-actual-price">
                                                <del className="text-muted">&#8377; {(product.initial_price || 0) * (product.quantity || 1) }</del>&emsp;
                                                <b>&#8377; {(product.fixed_price || 0) * (product.quantity || 1)}/-</b><br/>
                                                <span className="text-success">{(product.fixed_price/product.initial_price*100).toFixed(0)+"% offer"}</span>
                                            </p>
                                            <button id="cart-card-remove-btn" 
                                                className="btn btn-danger"
                                                onClick={() => {
                                                    const updatedCart = cart.filter((_, i) => i !== index);
                                                    setCart(updatedCart);
                                                    localStorage.setItem("cart", JSON.stringify(updatedCart));
                                                }}>Remove
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                        </div>
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