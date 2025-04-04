import { useEffect, useState } from "react";
import "../utils/css/main.css";
import "../utils/css/home.css";
import logo from "../utils/images/logo.svg";
import search_icon from "../utils/images/icons/search.svg";
import close from "../utils/images/icons/close.svg";
import axios from "axios";
import Auth from "./Authentication/Auth";
import Rating from "./Common/Rating";
import ViewProduct from "./Product/ViewProduct";

export default function Home() {
    const [products, setProducts] = useState([]);
    const [product, setProduct] = useState(null);
    const [showDescription, setShowDescription] = useState(false);

    useEffect(() => {
        let url = process.env.REACT_APP_API_URI + "/products/read";
        axios.get(url)
            .then((res) => {
                setProducts(res.data);
            })
            .catch((e) => {
                console.log(e);
            });
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
    const imageUri = process.env.REACT_APP_IMAGE_URI;
    return (
        <>
            <Auth />
            <main className={`${showDescription ? "low-opacity" : ""} container`}>
                <div className="row">
                    <div id="search-box" className="col-12">
                        <div className="search-box">
                            <input id="search-box-input" type="text" />
                            <img id="search-box-img" src={search_icon} alt="search" />
                        </div>
                    </div>
                    <div id="dashboard-products" className="container-fluid col-12 my-4">
                        <div className="row gy-5" id="product-cards p-5">
                            {
                                products.map((_product) => (
                                    <div
                                        key={_product._id}
                                        onClick={(e) => handleDescription(e, _product)}
                                        className="product-card col-12 col-md-6 col-lg-3"
                                    >
                                        <div className="product-card-img">
                                            <img src={imageUri+_product.img} alt="" />
                                        </div>
                                        <div className="product-card-body">
                                            <h6 className="mb-3">{_product.name || " "}</h6>
                                            <p>
                                                <b>{(_product.fixed_price) === "" ? " " : String.fromCodePoint(8377) + _product.fixed_price}</b>&emsp;
                                                <del>{(_product.initial_price) === "" ? " " : String.fromCodePoint(8377) + _product.initial_price}</del>&emsp;
                                                <span className="text-success">{_product.fixed_price / _product.initial_price * 100 + "% off"}</span>
                                            </p>
                                            <p>{<Rating value={_product.ratings} />}</p>
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