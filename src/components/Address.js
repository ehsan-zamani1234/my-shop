import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { validateAddress } from './validateAddress';
import { useId } from 'react';

// Styles
import '../App.css'
import styles from '../styles/Address.module.css'

const Address = () => {
    const [userAddress, setUserAddress] = useState({
        address: '',
        city: '',
        postalCode: '',
        phone: '',
    });
    const [errors, setErrors] = useState({});  
    const [touched, setTouched] = useState({});  
    // const postTextAreaId = useId();

    useEffect(() => {
        setErrors(validateAddress(userAddress))
        // console.log(errors);
    },[userAddress])


    const changeHandler = (event) => {
        setUserAddress({ ...userAddress, [event.target.name]: event.target.value })
        // console.log(userAddress);
    }

    const focusHandler = (event) => {
        setTouched({ ...touched, [event.target.name]: true })
    }

    const navigate = useNavigate()
    const submitHandler = (event) => {
        event.preventDefault();
        if (!Object.keys(errors).length) {
            console.log(userAddress);
            localStorage.setItem('userAddressFromLocal', JSON.stringify(userAddress))
            navigate('/checkout')
        } else {
            setTouched({
                address: true,
                city: true,
                postalCode: true,
                phone: true,
            })
        }
    }

    return (
        <>
        <div style={{ marginTop: '90px' ,display: 'flex', justifyContent: 'center', alignContent: 'center'}}>
            <h5><span className={styles.spanCartf}>{`CART >> `}</span><span className={styles.spanCarts}>{`ADDRESS >> `}</span><span className={styles.spanCartt}>{`CHECKOUT >> `}</span></h5>
        </div>
        <div className={styles.container}>
           <form onSubmit={submitHandler} className={styles.formContainer} >
                <h2 className={styles.header}>Address</h2>
                <div className={styles.formField}>
                    <label>City</label>
                    <input 
                    className={(errors.city && touched.city) ? styles.uncoumpleted : styles.formInput} 
                    type='text'
                    name='city' 
                    value={userAddress.city} 
                    onChange={changeHandler} 
                    onFocus={focusHandler} />
                    {errors.city && touched.city && <span>{errors.city}</span>}
                </div>
                <div className={styles.formField}>
                    <label>Address</label>
                    <input 
                    className={(errors.address && touched.address) ? styles.uncoumpleted : styles.formInput}
                    type='text' 
                    name='address' 
                    value={userAddress.address} 
                    onChange={changeHandler} 
                    onFocus={focusHandler} />
                    {errors.address && touched.address &&  <span>{errors.address}</span>}
                </div>
                <div className={styles.formField}>
                    <label>PostalCode</label>
                    <input 
                    className={(errors.postalCode && touched.postalCode) ? styles.uncoumpleted : styles.formInput} 
                    type='text' 
                    name='postalCode' 
                    value={userAddress.postalCode} 
                    onChange={changeHandler} 
                    onFocus={focusHandler} />
                    {errors.postalCode && touched.postalCode &&  <span>{errors.postalCode}</span>}
                </div>
                <div className={styles.formField}>
                    <label>Mobile</label>
                    <input
                    className={(errors.phone && touched.phone) ? styles.uncoumpleted : styles.formInput}  
                    type='text' 
                    name='phone' 
                    value={userAddress.phone} 
                    onChange={changeHandler} 
                    onFocus={focusHandler} />
                    {errors.phone && touched.phone &&  <span>{errors.phone}</span>}
                </div>
                <div className={styles.formButtons}>
                    {/* <a href='#'>Next</a> */}
                    <button type='submit'>Next</button>
                </div>
           </form>
        </div>
        </>
    );
};

export default Address;