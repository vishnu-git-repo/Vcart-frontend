import { useState } from "react";
import "../utils/css/addProducts.css";
import axios from "axios";
import default_image from "../utils/images/icons/upload.svg";
import Rating from "../components/Common/Rating";
import { useNavigate } from "react-router-dom";
import { uploadFile } from "../utils/js/appwrite";
import Progress from "../components/Common/Progress";

export default function ProductAction() {
    const [product, setProduct] = useState({
        name: "",
        attributes: "",
        initial_price: "",
        fixed_price: "",
        seller: "",
        ratings: "",
        img: "",
    });
    const [img, setImg] = useState(null);
    const [progressView, setProgressView] = useState(false);


    async function handleSubmit(e) {
        e.preventDefault();
        try {
            if (!img || !product.name || !product.attributes || !product.initial_price || !product.fixed_price || !product.seller || !product.ratings) {
                console.log("All fields are required");
                alert("All fields are required");
                return;
            }

            setProgressView(true);

            // Upload the selected image file
            const uploadResponse = await uploadFile(img);
            console.log("File uploaded successfully:", uploadResponse);

            // Update the product state with the uploaded image ID
            const updatedProduct = {
                ...product,
                img: uploadResponse,
            };

            // Send the product data to the backend
            const url = process.env.REACT_APP_API_URI + "/products/create";
            const response = await axios.post(url, JSON.stringify(updatedProduct), {
                headers: { "Content-Type": "application/json" },
            });
            console.log("Success:", response.data);

            setProduct({
                name: "",
                attributes: "",
                initial_price: "",
                fixed_price: "",
                seller: "",
                ratings: "",
                img: "",
            });
            setImg(null);
            setProgressView(false)
        } catch (error) {
            console.error("Error:", error.response || error.message);
        }
    }

    function handleChange(e) {
        if (e.target.name === "img") {
            setImg(e.target.files[0]); 
        } else {
            setProduct((prev) => ({
                ...prev,
                [e.target.name]: e.target.value,
            }));
        }
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
                <div className="row d-flex">
                    <div id="edit-product" className="col-12 col-lg-6">
                        <div id="edit-product-form-outer">
                            <form onSubmit={handleSubmit} encType="multipart/form-data">
                                <h2>Product Details</h2>
                                <label>Name</label>
                                <input type="text" name="name" value={product.name} onChange={handleChange} />

                                <label>Attributes</label>
                                <input type="text" name="attributes" value={product.attributes} onChange={handleChange} />

                                <label>Initial Price</label>
                                <input type="text" name="initial_price" value={product.initial_price} onChange={handleChange} />

                                <label>Fixed Price</label>
                                <input type="text" name="fixed_price" value={product.fixed_price} onChange={handleChange} />

                                <label>Seller Info</label>
                                <input type="text" name="seller" value={product.seller} onChange={handleChange} />

                                <label>Ratings</label>
                                <input type="number" name="ratings" min="1" max="5" value={product.ratings} onChange={handleChange} />

                                <label>Image</label>
                                <input type="file" name="img" onChange={handleChange} />

                                <input className="btn btn-primary" type="submit" value="Launch Product" />
                            </form>
                        </div>
                    </div>
                    <div id="view-product" className="col-12 col-lg-6">
                        <h2>Product Preview</h2>
                        <div className="product-card">
                            <div className="product-card-img">
                                <img
                                    src={
                                        img
                                            ? URL.createObjectURL(img) // Use the `img` state for preview
                                            : default_image
                                    }
                                    alt="product"
                                />
                            </div>
                            <div className="product-card-body">
                                <h6 className="mb-3">{product.name || " "}</h6>
                                <p>{product.attributes || " "}</p>
                                <p>
                                    <del>
                                        {product.initial_price
                                            ? String.fromCodePoint(8377) + product.initial_price
                                            : " "}
                                    </del>
                                    &emsp;
                                    <b>
                                        {product.fixed_price
                                            ? String.fromCodePoint(8377) + product.fixed_price
                                            : " "}
                                    </b>
                                </p>
                                <p>{product.seller || " "}</p>
                                <Rating value={product.ratings >= 5 ? "5" : product.ratings >= 1 ? product.ratings : 1} />
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
}