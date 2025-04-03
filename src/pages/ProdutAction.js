import { useState } from "react";
import "../utils/css/addProducts.css";
import axios from "axios";
import default_image from "../utils/images/icons/upload.svg";
import Rating from "../components/Common/Rating";

export default function ProductAction() {
    const [product, setProduct] = useState({
        name: "",
        attributes: "",
        initial_price: "",
        fixed_price: "",
        seller: "",
        ratings: "",
        img: null,
    });

    const [errors, setErrors] = useState({}); // State to track validation errors

    function validateForm() {
        const newErrors = {};
        if (!product.name) newErrors.name = "Name is required.";
        if (!product.attributes) newErrors.attributes = "Attributes are required.";
        if (!product.initial_price || isNaN(product.initial_price)) newErrors.initial_price = "Valid initial price is required.";
        if (!product.fixed_price || isNaN(product.fixed_price)) newErrors.fixed_price = "Valid fixed price is required.";
        if (!product.seller) newErrors.seller = "Seller information is required.";
        if (!product.ratings || product.ratings < 1 || product.ratings > 5) newErrors.ratings = "Ratings must be between 1 and 5.";
        if (!product.img) newErrors.img = "Product image is required.";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0; // Return true if no errors
    }

    async function handleSubmit(e) {
        e.preventDefault();
        if (!validateForm()) return; // Stop submission if validation fails

        const formdata = new FormData();
        formdata.append("name", product.name);
        formdata.append("attributes", product.attributes);
        formdata.append("initial_price", product.initial_price);
        formdata.append("fixed_price", product.fixed_price);
        formdata.append("seller", product.seller);
        formdata.append("ratings", product.ratings);
        formdata.append("img", product.img);

        try {
            let url = process.env.REACT_APP_API_URI + "/products/create";
            const response = await axios.post(url, formdata);
            console.log("Success:", response.data);
        } catch (error) {
            console.error("Error:", error.response || error.message);
        }
    }

    function handleChange(e) {
        if (e.target.name === "img") {
            setProduct((prev) => ({
                ...prev,
                [e.target.name]: e.target.files[0],
            }));
        } else {
            setProduct((prev) => ({
                ...prev,
                [e.target.name]: e.target.value,
            }));
        }
    }

    return (
        <>
            <main className="container">
                <div className="row d-flex">
                    <div id="edit-product" className="col-12 col-lg-6">
                        <div id="edit-product-form-outer">
                            <form onSubmit={handleSubmit} encType="multipart/form-data">
                                <h2>Product Details</h2>
                                <label>Name</label>
                                <input type="text" name="name" onChange={handleChange} />
                                {errors.name && <p className="error">{errors.name}</p>}

                                <label>Attributes</label>
                                <input type="text" name="attributes" onChange={handleChange} />
                                {errors.attributes && <p className="error">{errors.attributes}</p>}

                                <label>Initial Price</label>
                                <input type="text" name="initial_price" onChange={handleChange} />
                                {errors.initial_price && <p className="error">{errors.initial_price}</p>}

                                <label>Fixed Price</label>
                                <input type="text" name="fixed_price" onChange={handleChange} />
                                {errors.fixed_price && <p className="error">{errors.fixed_price}</p>}

                                <label>Seller Info</label>
                                <input type="text" name="seller" onChange={handleChange} />
                                {errors.seller && <p className="error">{errors.seller}</p>}

                                <label>Ratings</label>
                                <input type="number" name="ratings" min="1" max="5" onChange={handleChange} />
                                {errors.ratings && <p className="error">{errors.ratings}</p>}

                                <label>Image</label>
                                <input type="file" name="img" onChange={handleChange} />
                                {errors.img && <p className="error">{errors.img}</p>}

                                <input className="btn btn-primary" type="submit" value="Launch Product" />
                            </form>
                        </div>
                    </div>
                    <div id="view-product" className="col-12 col-lg-6">
                        <div className="product-card">
                            <div className="product-card-img">
                                <img
                                    src={
                                        product.img == null
                                            ? default_image
                                            : URL.createObjectURL(product.img)
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



