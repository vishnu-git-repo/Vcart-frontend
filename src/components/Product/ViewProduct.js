import Rating from "../Common/Rating"
import logo from "../../utils/images/logo.svg"
import style from "../../utils/css/viewProduct.module.css"
import Auth from "../Authentication/Auth"

import { useEffect, useState } from "react";
import axios from "axios";

export default function ViewProduct(props) { 

    const product = props.product;

    function handleAddCart(e, product) {
        e.stopPropagation();
        let cart = JSON.parse(localStorage.getItem("cart")) || []; 
        if (!Array.isArray(cart)) {
            <Auth/>
        }
        cart.push(product); 
        localStorage.setItem("cart", JSON.stringify(cart)); 
        alert(`${product.name} added to cart`); 
    }
    async function handleBuyNow(e,_product){
        e.stopPropagation();
        const user_id = JSON.parse(localStorage.getItem("user"))._id;
        const products = [];
        products.push({
            product : _product._id,
            product_quantity : 1
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
    }

    return(
        <>
            <div className={style.productCard}>
                <div>
                    <div className={style.productCardImg}>
                        <img src={`http://localhost:8000/uploads/${product.img}`|| logo} alt="" />
                    </div>
                    <div className={style.actions}>
                        <button className="btn btn-muted" onClick={(e)=>handleAddCart(e,product)}> Add Cart</button>
                        <button className="btn btn-success" onClick={(e)=>handleBuyNow(e,product)}>Buy Now</button>
                    </div>
                </div>
                <div className={style.productCardBody}>
                    <h6 className="mb-3">{`${ product.name ||" " } (${ product.attributes ||" " })` }</h6>
                    {/* <p>{product.attributes ||" "}</p> */}
                    <p className="text-success">Special price</p>
                    <p>
                        <b>{(product.fixed_price)===""?" ":String.fromCodePoint(8377)+product.fixed_price}</b>&emsp;
                        <del>{(product.initial_price)===""?" ":String.fromCodePoint(8377)+product.initial_price}</del>&emsp;
                        <span className="text-success">{product.fixed_price/product.initial_price *100 +"% off"}</span>
                    </p>
                    <p><span className="text-muted">{"Seller Info :"}</span>{product.seller ||" "}</p>
                    <p className="my-3">{<Rating value={product.ratings}/>}<span className="text-muted">{" (0)ratings & (0)reviews"}</span></p>
                </div>
            </div>
        </>
    )
}