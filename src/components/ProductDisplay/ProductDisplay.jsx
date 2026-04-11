import React from 'react'
import './ProductDisplay.css'
import ReviewSystem from '../ReviewSystem/ReviewSystem' // ហៅ Review មកប្រើ

const ProductDisplay = (props) => {
    const {product} = props;

    return (
        <div className='productdisplay'>
            <div className="productdisplay-left">
                <div className="productdisplay-img-list">
                    <img src={product.image} alt="" />
                    <img src={product.image} alt="" />
                    <img src={product.image} alt="" />
                </div>
                <div className="productdisplay-img">
                    <img className='productdisplay-main-img' src={product.image} alt="" />
                </div>
            </div>
            <div className="productdisplay-right">
                <h1>{product.name}</h1>
                <div className="productdisplay-right-stars">
                    <span>⭐⭐⭐⭐⭐</span>
                    <p>(122)</p>
                </div>
                <div className="productdisplay-right-prices">
                    <div className="productdisplay-right-price-old">${product.price + 20}</div>
                    <div className="productdisplay-right-price-new">${product.price}</div>
                </div>
                <div className="productdisplay-right-description">
                    សាច់ក្រណាត់ទន់ល្មើយ មិនស្អាតមិនយកលុយ ស្ទីលទាន់សម័យសម្រាប់យុវវ័យ។
                </div>
                <button className='add-to-cart-btn'>ADD TO CART</button>
            </div>

            {/* បន្ថែមប្រព័ន្ធ Review នៅខាងក្រោមគេបង្អស់ */}
            <div className="review-container" style={{gridColumn: "1/-1", marginTop: "50px"}}>
                <ReviewSystem productId={product.id} />
            </div>
        </div>
    )
}

export default ProductDisplay