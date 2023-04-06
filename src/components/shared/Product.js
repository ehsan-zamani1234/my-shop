// import React, { useContext } from 'react';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { Link } from 'react-router-dom';

import StarRatings from 'react-star-ratings';

// styles
import styles from '../../styles/Product.module.css'

// helper function
import { shorten } from '../../helper/function';
import { isInCart } from '../../helper/function';
import { quantityCount } from '../../helper/function';

// icons
import trashIcon from '../../assets/icons/trash.svg'

// context
// import { CartContext } from '../../context/CartContextProvider';

// action creator
import { addItem, removeItem, increase, decrease, checkout, clear } from '../../redux/cart/cartAction';

const Product = ({ productData }) => {

    // state va dispatch destroture shod
    // const { state, dispatch } = useContext(CartContext)
    const state = useSelector(state => state.cartState)
    const dispatch = useDispatch()

    return (
        <div className={styles.container}>
            <img className={styles.cardImage} src={productData.image} alt='product' style={{ width: '200px' }} />
            <h3>{shorten(productData.name)}</h3>
            <p>{`${productData.price.toFixed(2)}$`}</p>
            {/* <p>{productData.countInStock}</p> */}
            <div style={{display: 'flex', marginLeft: '20px', zIndex: '0'}}>
            <StarRatings
                rating={productData.rating}
                starRatedColor="blue"
                starDimension="15px"
                starSpacing="2px"
                numberOfStars={5}
            />
            </div>
            <div className={styles.linkContainer}>
                <Link to={`/products/${productData._id}`} >Detail</Link>
                <div className={styles.buttonContainer}>
                    {
                        quantityCount(state, productData._id) > 1 && <button className={styles.smallButton} onClick={() => dispatch(decrease(productData))}>-</button>
                    }
                    {
                        quantityCount(state, productData._id) === 1 && <button className={styles.smallButton} onClick={() => dispatch(removeItem(productData))}> <img src={trashIcon} alt='trash icon'/> </button>
                    }
                    {   
                        quantityCount(state, productData._id) > 0 && <span className={styles.counter}>{quantityCount(state, productData._id)}</span>
                    }
                    {
                        isInCart(state, productData._id) ?
                            <button className={styles.smallButton} onClick={() => dispatch(increase(productData))}>+</button> :
                            productData.countInStock ? 
                            <button onClick={() => dispatch(addItem(productData))}>Add to Cart</button> :
                            <button className={styles.disabledButton} disabled>Add to Cart</button>
                    }

                </div>
            </div>
        </div>
    );
};

export default Product;