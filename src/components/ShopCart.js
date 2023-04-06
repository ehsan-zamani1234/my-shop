import React from 'react';
import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
// import { useContext } from "react";
import { Link } from 'react-router-dom';

// styles
import styles from '../styles/ShopCart.module.css'

// image
import costomImage from '../assets/costomimg/custom-ecommerce-png.jpg'

// context
// import { CartContext } from '../context/CartContextProvider';

// component
import Cart from './shared/Cart';

// action creator
import { clear } from '../redux/cart/cartAction';

const ShopCart = () => {
    
    const state = useSelector(state => state.cartState)
    const dispatch = useDispatch();
    
    console.log(state.itemsCounter);
    console.log(state.checkout);
    


    const userState = useSelector(state => state.userSate)
    const user_data = userState.userData;
    // console.log(user_data);
    console.log(user_data.token);

    let navigate = useNavigate();

    const checkoutHandler = () => {
        if (user_data.token) {
            // dispatch(checkout())
            // <Navigate to="/address"  />
            navigate("/address");
        } else {
            console.log('error line 71 shopcart');
            navigate("/registerPage/login");
            // <Navigate to="/registerPage/login"  />
        }
    }
    





    



    localStorage.setItem('productsUserSelected', JSON.stringify(state))
    // const parsedSelectedUser = JSON.parse(localStorage.getItem('productsUserSelected')) 
    //     console.log(parsedSelectedUser);
    //     console.log(parsedSelectedUser.selectedItems);
    //     console.log(parsedSelectedUser.itemsCounter);

    
    return (
        <>
        {
            state.itemsCounter && 
            <>
            <img  className={styles.adamak} style={{marginTop: '90px'}} src={costomImage} alt='adamak' />
            <div style={{ display: 'flex', justifyContent: 'center', alignContent: 'center'}}>
                <h5><span  className={styles.spanCartf}>{`CART >> `}</span><span className={styles.spanCart}>{`ADDRESS >> `}</span><span className={styles.spanCart}>{`CHECKOUT >> `}</span></h5>
            </div>
            </>
        }
        <div className={styles.container}>
            <div className={styles.cartContainer}>
                {state.selectedItems.map((item) => <Cart key={item._id} data={item}/>)}
                {/* {parsedSelectedUser.selectedItems.map((item) => <Cart key={item._id} data={item}/>)} */}
            </div>

            {
                state.itemsCounter > 0 && <div className={styles.payments}>
                    <p><span>Total Items: </span>{state.itemsCounter}</p>
                    <p><span>Total Peyments: </span>{state.total} $</p>
                    <div className={styles.buttonContainer}>
                        <button className={styles.clear} onClick={() => dispatch(clear())}>Clear</button>
                        {/* <button className={styles.checkout} onClick={() => dispatch(checkout())}>Check Out</button> */}

                    
                        {/* <button className={styles.checkout}><Link to='/login'>Login</Link></button> */}
                        <button className={styles.checkout} onClick={checkoutHandler}>Next</button>
                    </div>
                </div>
            }

            {
                state.itemsCounter === 0 && <div className={styles.complete}>
                    <h3>Want To Buy ?</h3>
                    <Link to='/products'>Go To Shop</Link>
                </div>
            }

            {/* {
                state.checkout && <div className={styles.complete}>
                    <h3>Checked Out Successfully! next for Address</h3>
                    <Link to='/address'>Address</Link>
                </div>
            } */}
        </div>
        </>
    );
};

export default ShopCart;
