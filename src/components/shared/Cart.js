import React, { useContext, useEffect } from 'react';
import { useDispatch } from 'react-redux';

// styles
import styles from '../../styles/Cart.module.css'

// context
// import { CartContext } from '../../context/CartContextProvider';

// action creator
import { removeItem, increase, decrease } from '../../redux/cart/cartAction';

// function heper
import { shorten } from '../../helper/function';

// icons
import trashIcon from '../../assets/icons/trash.svg'

const Cart = (props) => {
    // console.log(props.data);

    // const {dispatch} = useContext(CartContext)
    const dispatch = useDispatch()
    const {image, name, price, quantity} = props.data;
    // console.log( props.data);

    
   
        // localStorage.setItem('productsUserSelected', JSON.stringify(props.data))
        // const parsedSelectedUser = JSON.parse(localStorage.getItem('productsUserSelected')) 
        // console.log(parsedSelectedUser);

    // const {image, name, price, quantity} = parsedSelectedUser;

    return (
        <div className={styles.container}>
            <img className={styles.productImage} src={image} alt='product'/>
            <div className={styles.data}>
                <h3>{shorten(name)}</h3>
                <p>{price.toFixed(2)}$</p>
            </div>
            <div>
                <span className={styles.quantity}>{quantity}</span>
            </div>
            <div className={styles.buttonContainer}>
                {
                    quantity > 1 ?
                    <button onClick={() => dispatch(decrease(props.data))}>-</button> :
                    <button onClick={() => dispatch(removeItem(props.data))}><img src={trashIcon} alt='trash' style={{width: '20px'}}/></button>
                }
                 <button onClick={() => dispatch(increase(props.data))}>+</button>
            </div>
        </div>
    );
};

export default Cart;