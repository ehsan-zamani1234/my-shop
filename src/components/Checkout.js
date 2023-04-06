import React from 'react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Cart from './shared/Cart';
import { Link } from 'react-router-dom';
import axios from 'axios';
// import { useNavigate } from 'react-router-dom';




// styles
import styles from '../styles/Checkout.module.css'

// redux
import { checkout } from '../redux/cart/cartAction';
import { clearAfterCheckout } from '../redux/cart/cartAction';




const Checkout = () => {

    // const [flag, setFlag] = useState({})
    const [getTotalPrice, setTotalPrice] = useState({})
    const dispatch = useDispatch()
    const state = useSelector(state => state.cartState)
    const [userAddress, setUserAddress] = useState({
        address: '',
        city: '',
        postalCode: '',
        phone: '',
    });
    useEffect(() => {
        const parsedUserAddress = JSON.parse(localStorage.getItem('userAddressFromLocal'))
        if (parsedUserAddress) {
            console.log(parsedUserAddress);
            setUserAddress({
                address: parsedUserAddress.address,
                city: parsedUserAddress.city,
                postalCode: parsedUserAddress.postalCode,
                phone: parsedUserAddress.phone
            })
        }else {
            // -----------------------lazem ast setUserAddress injuri beshe ??
            console.log('local is empty');
            setUserAddress({
                address: '',
                city: '',
                postalCode: '',
                phone: ''
            })
        }
    }, [])
    

    // let navigate = useNavigate();
    const req = async () => {
        const userSelected = state.selectedItems.map((item) => {
            return {
                product: item._id,
                qty: item.quantity
            }
        })
        console.log(...userSelected);
        const token = localStorage.getItem('token');
        console.log(token);
        try {
                const { data } = await axios.post(
                "http://kzico.runflare.run/order/submit",
                    {
                        orderItems: [
                                ...userSelected
                              ],
                              shippingAddress: {
                                address: userAddress.address,
                                city: userAddress.city,
                                postalCode: userAddress.postalCode,
                                phone: userAddress.phone,
                              },
                              paymentMethod: "cash",
                              shippingPrice: "5",
                              totalPrice: 1,
                            },
                            {
                              headers: {
                                authorization:
                                  `Bearer ${token}`,
                              },
                            }
                          );
                    // console.log(data.totalPrice + (+data.shippingPrice));
                    console.log(data.totalPrice);
                    console.log(data);
                    setTotalPrice({...data})
                    localStorage.setItem('orderReceipt', JSON.stringify(data))
                    // const parsedOrderReceipt = JSON.parse(localStorage.getItem('orderReceipt'))
                    // console.log(Number(parsedOrderReceipt.shippingPrice));
                } catch (error) {
                    console.log(error.response.data.message);
                    let err = error.response.data.message[0] 
                    console.log(err);
                    // navigate("/registerPage/login");
                    // localStorage.removeItem('token')  
            }
        }
        console.log(Number(getTotalPrice.totalPrice) + 5);
    const checkoutHandler = () => {
        // if (event.type === 'click') {
        //     console.log(state.total);
        //     setFlag({
        //         clicked: true,
        //     })
            
        // } else {
            
        //     return setFlag({})
        // }
        // ---------------------------------

        // console.log(state.total);
        {/* bayad next ro ke mizane check out kone val selectedItme va address ro befreste server */}
        req();
        dispatch(checkout())
        dispatch(clearAfterCheckout())
        // in doroste?  hon hate bala checkouto t mikone paein f
        localStorage.setItem('productsUserSelected', JSON.stringify({
                selectedItems: [],
                itemsCounter: 0,
                total: 0,
                checkout: false
        }))
        // localStorage.removeItem('productsUserSelected')
    }

    
    const parsedOrderReceipt = JSON.parse(localStorage.getItem('orderReceipt'))
    let ShippingPriceToNum = Number(parsedOrderReceipt.shippingPrice)
    console.log(Number(parsedOrderReceipt.shippingPrice));
    // let sum = parsedOrderReceipt.totalPrice + ShippingPriceToNum
    let sum = Number(getTotalPrice.totalPrice) + 5
    
    console.log(sum.toFixed(2));
    return (
        <>
        {
            state.selectedItems.length >= 1 &&  <div style={{ marginTop: '90px' ,display: 'flex', justifyContent: 'center', alignContent: 'center'}}>
            <h5><span className={styles.spanCartf}>{`CART >> `}</span><span className={styles.spanCarts}>{`ADDRESS >> `}</span><span className={styles.spanCartt}>{`CHECKOUT >> `}</span></h5>
        </div>
        }
      

        <div className={styles.container}>
            <div className={styles.cartContainer}>
                {state.selectedItems.length >= 1 && <h3>Edit your cart</h3> }
                {state.selectedItems.map((item) => <Cart key={item._id} data={item}/>)}
            </div>

            
            {
                state.itemsCounter > 0 &&
                 <div className={styles.payments}>
                    <p><span>City: </span>{userAddress.city}</p>
                    <p><span>Address: </span>{userAddress.address}</p>
                    <p><span>postalCode: </span>{userAddress.postalCode}</p>
                    <p><span>Mobile: </span>{userAddress.phone}</p>
                    <p><span>Total Peyments: </span>{state.total} $</p>
                    <p><span>Shipping Price: </span>{ShippingPriceToNum.toFixed(2)} $</p>
                    

                    {/* { Object.keys(flag).length >= 1 ? 
                            <button disabled style={{background: 'black'}} className={styles.checkout}>Next</button> :
                            <button onClick={checkoutHandler} className={styles.checkout}>checkout</button> 
                    } */}
                    <button onClick={checkoutHandler} className={styles.checkout}>Checkout</button>
                    
                </div>
            }
            {/* <button className={styles.checkout} onClick={() => dispatch(checkout())}>Check Out</button> */}
            {
                !state.checkout && state.itemsCounter === 0 && <div className={styles.complete}>
                    <h3>Want To Buy ?</h3>
                    <Link to='/products'>Go To Shop</Link>
                </div>
            }
            {/* ----------------ahari taghir */}
            {
                // className={styles.complete}
                // className={styles.payments}
                state.checkout && <div style={{display: 'flex', justifyContent: 'space-between'}}>
              
                    
                    <div className={styles.receipt}>
                    <h2>Receipt</h2>
                    <p><span>City: </span>{userAddress.city}</p>
                    <p><span>Address: </span>{userAddress.address}</p>
                    <p><span>postalCode: </span>{userAddress.postalCode}</p>
                    <p><span>Payment Method: </span>{parsedOrderReceipt.paymentMethod}</p>
                    <p><span>Total Peyments: </span>{sum ? `${sum.toFixed(2)} $` : "..." }</p>
                    </div>

                          
                    <div className={styles.complete}>
                        <h3 >Checked out successfully</h3>
                        <Link to='/products'>Buy More</Link>
                    </div>

                    
                    
                </div>
            }
            

        </div>
        </>
    );
};

export default Checkout;