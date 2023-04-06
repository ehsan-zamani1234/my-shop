import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { validate } from './validate';
import { notify } from './toast';
import styles from '../styles/SignUp.module.css'

const SignUp = () => {

    const [userdata, setUserdata] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        mobile: '',
        isAccepted: false
    })
    const [errors, setErrors] = useState({});
    const [touched, setTouched] = useState({});

    useEffect(() => {
        setErrors(validate(userdata, 'signup'))
        // console.log(errors);
    }, [userdata, touched])

    const changeHandler = event => {
        // console.log(event.target.name);
        if (event.target.name === 'isAccepted') {
            setUserdata({ ...userdata, [event.target.name]: event.target.checked })
        } else {
            setUserdata({ ...userdata, [event.target.name]: event.target.value })
        }
        // console.log(data);
    }
    // console.log(data);

    const touchedHandler = (event) => {
        setTouched({ ...touched, [event.target.name]: true })
    }


    // const req = async () => {
    //     try {
    //         const { data } = await axios.post(
    //             "http://kzico.runflare.run/user/signup",
    //             {
    //                 username: userdata.name,
    //                 email: userdata.email,
    //                 password: userdata.password,
    //                 mobile: userdata.mobile,
    //             }
    //         );
    //         console.log(data);
    //     } catch (error) {
    //         console.log(error.response.data);
    //     }
    // }
    // ----------------------------
    const submitHandler = (event) => {
        event.preventDefault();
        if (!Object.keys(errors).length) {
            // console.log(data);
            // console.log(userdata);
            const req = async () => {
                try {
                    const { data } = await axios.post(
                        "http://kzico.runflare.run/user/signup",
                        {
                            username: userdata.name,
                            email: userdata.email,
                            password: userdata.password,
                            mobile: userdata.mobile,
                        }
                    );
                    console.log(data);
                    // localStorage.setItem('userDataLogin', JSON.stringify(userdata))
                    
                    notify('You signed up successfully! Please Login', 'success')
                } catch (error) {
                    console.log(error.response.data.message);
                    let err = error.response.data.message 
                    notify(err, 'warning')
                }
            }
            req()
            // notify('You signed up successfully! Please Login', 'success')
        } else {
            notify('Invalid data!')
            setTouched({
                name: true,
                email: true,
                mobile: true,
                password: true,
                confirmPassword: true,
                isAccepted: true
            })
        }
    }
// -------------------


    return (
        <div className={styles.container}>
            {/* <button onClick={req}>Siug Up</button> */}
            <form onSubmit={submitHandler} className={styles.formContainer}>
                <h2 className={styles.header}>Sign Up</h2>
                <div className={styles.formField}>
                    <label>Name</label>
                    <input
                        className={(errors.name && touched.name) ? styles.uncoumpleted : styles.formInput}
                        type='text'
                        name='name'
                        value={userdata.name}
                        onChange={changeHandler}
                        onFocus={touchedHandler}
                    />
                    {errors.name && touched.name && <span>{errors.name}</span>}
                </div>
                <div className={styles.formField}>
                    <label>Email</label>
                    <input
                        className={(errors.email && touched.email) ? styles.uncoumpleted : styles.formInput}
                        type='text'
                        name='email'
                        value={userdata.email}
                        onChange={changeHandler}
                        onFocus={touchedHandler}
                    />
                    {errors.email && touched.email && <span>{errors.email}</span>}
                </div>
                <div className={styles.formField}>
                    <label>Password</label>
                    <input
                        className={(errors.password && touched.password) ? styles.uncoumpleted : styles.formInput}
                        type='password'
                        name='password'
                        value={userdata.password}
                        onChange={changeHandler}
                        onFocus={touchedHandler}
                    />
                    {errors.password && touched.password && <span>{errors.password}</span>}
                </div>
                <div className={styles.formField}>
                    <label>Confirm Password</label>
                    <input
                        className={(errors.confirmPassword && touched.confirmPassword) ? styles.uncoumpleted : styles.formInput}
                        type='password'
                        name='confirmPassword'
                        value={userdata.confirmPassword}
                        onChange={changeHandler}
                        onFocus={touchedHandler}
                    />
                    {errors.confirmPassword && touched.confirmPassword && <span>{errors.confirmPassword}</span>}
                </div>
                <div className={styles.formField}>
                    <label>Mobile</label>
                    <input
                        className={(errors.mobile && touched.mobile) ? styles.uncoumpleted : styles.formInput}
                        type='number'
                        name='mobile'
                        value={userdata.mobile}
                        onChange={changeHandler}
                        onFocus={touchedHandler}
                    />
                    {errors.mobile && touched.mobile && <span>{errors.mobile}</span>}
                </div>
                <div className={styles.formField}>
                    <div className={styles.checkBoxContainer}>
                        <label>I accept trms of privacy policy</label>
                        <input
                            className={(errors.isAccepted && touched.isAccepted) ? styles.uncoumpleted : styles.formInput}
                            type='checkbox'
                            name='isAccepted'
                            value={userdata.isAccepted}
                            onChange={changeHandler}
                            onFocus={touchedHandler}
                        />
                    </div>
                    {errors.isAccepted && touched.isAccepted && <span>{errors.isAccepted}</span>}
                </div>
                <div className={styles.formButtons}>
                    <Link to='/registerPage/login'>Login</Link>
                    <button type='submit'>Sign Up</button>
                </div>
            </form>
            <ToastContainer />
        </div>
    );
};

export default SignUp;