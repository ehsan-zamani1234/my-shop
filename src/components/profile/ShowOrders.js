import React from 'react';
import { Link } from 'react-router-dom';

// helper
import { shorten } from '../../helper/function';

// styles
import styles from '../../styles/ShowOrders.module.css'


const ShowOrders = (props) => {
    // console.log(props.data);
    const {totalPrice, orderItems} = props.data
    // console.log(totalPrice);
    console.log(orderItems.length);
    // console.log(props.data._id);
   

    return (
        // style={{display: 'flex', justifyContent: 'space-around', alignItems: 'center', borderWidth: '1px', borderColor: 'red', borderStyle: 'solid'}}
        <div className={styles.container}>
            <div className={styles.data}>
                {orderItems.map(item => <h4 key={item._id}>{shorten(item.product.name)}</h4>)}
            </div>
            <div >
                {orderItems.map(item => <p className={styles.quantity} key={item._id}>qty:{item.qty}</p>)}
            </div>
            <div className={styles.data}>
              <p>totalPrice: {totalPrice.toFixed(2)} $ </p>
            </div>
            <div  className={styles.buttonContainer}>
                <Link className={styles.buttonLink} to={`/orders/${props.data._id}`}>Detail</Link>
            </div>
        </div>   
    
           
    );
};

export default ShowOrders;