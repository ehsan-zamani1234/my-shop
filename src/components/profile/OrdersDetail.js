import React from 'react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { shorten } from '../../helper/function';
import styles from '../../styles/OrderDetail.module.css'

// Loader 
import Loader from '../shared/Loader';

const OrdersDetail = () => {

    const [SingleOrderDetails, setSingleOrderDetails] = useState({});
    const [loadingDetails, setLoadingDetails] = useState(true)
    
    let token = localStorage.getItem('token')
    const params = useParams();
    const id = params.id
    console.log(id);
    
    useEffect(() => {
        const req = async () => {
            try {
                const { data } = await axios.get(`http://kzico.runflare.run/order/${id}`, {
                    headers: {
                      authorization:
                        `Bearer ${token}`,
                    },
                  })
                  console.log(data)
                  setLoadingDetails(false)
                  setSingleOrderDetails({...data})
            } catch (error) {
                setLoadingDetails(false)
                console.log(error.response);
            }
        }
        req();
    }, [])

    console.log(SingleOrderDetails);
    const {orderItems, shippingAddress, totalPrice, shippingPrice} = SingleOrderDetails;
    
    console.log(shippingAddress);
    console.log(totalPrice);
    console.log(orderItems);
    let total = totalPrice + Number(shippingPrice);
    // const { city, address, postalCode, phone } = shippingAddress

    return (
        <div style={{marginTop: '100px'}}>
            {
               loadingDetails ? <Loader /> :
               <div className={styles.container}>
                    <div className={styles.data}>
                        <div>
                            {orderItems.map(item => <h4 key={item._id}>{shorten(item.product.name)}</h4>)}
                        </div>
                        <div>
                            {orderItems.map(item => <p className={styles.quantity} key={item._id}>{item.qty}</p>)}
                        </div>
                        <div>
                            {orderItems.map(item => <p className={styles.price} key={item._id}>{item.product.price.toFixed(2)} $</p>)}
                        </div> 
                        
                    </div>

                    <div className={styles.cost}>
                        <p className={styles.shippingPrice}>Shipping Price: {shippingPrice}</p>
                        <p>Total Price: <span className={styles.colorPrice}>{total.toFixed(2)} $</span> </p>
                    </div>

                    {
                        SingleOrderDetails && 
                        <div className={styles.receiver} style={{marginTop: '35px'}}>
                            <h4>Receiver Specifications: </h4>
                            <p> <span>City:</span> {SingleOrderDetails.shippingAddress.city}</p>
                            <p> <span>Address:</span> {SingleOrderDetails.shippingAddress.address}</p>
                            <p> <span>postalCode:</span> {`${SingleOrderDetails.shippingAddress.postalCode}`}</p>
                            <p> <span>Phone Number:</span> {`${SingleOrderDetails.shippingAddress.phone}`}</p>
                        </div>
                        // <p>{SingleOrderDetails.shippingAddress.address}</p>
                    }
            {/* <button>Back To Order</button> */}
               </div> 
            }
        </div>
      
    );

};
export default OrdersDetail;