import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import { useDispatch, useSelector } from 'react-redux';
import { fetchGetLogin } from '../redux/user/userAction';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { validate } from './validate';
import { notify } from './toast';  
import styles from '../styles/SignUp.module.css'

const Login = () => {

    const dispatch = useDispatch();
    const userState = useSelector(state => state.userSate)
    const user_data = userState.userData;
    

    const [userdata, setUserdata] = useState({
        email: '',
        password: '',       
    })
    const [errors, setErrors] = useState({});
    const [touched, setTouched] = useState({});
  

    useEffect(() => {
        setErrors(validate(userdata, 'login'))
        // console.log(errors);
    }, [userdata, touched])

    const changeHandler = event => {
        setUserdata({ ...userdata, [event.target.name]: event.target.value })   
    }

    const touchedHandler = (event) => {
        setTouched({ ...touched, [event.target.name]: true })
    }

    // ----------------------------
    const submitHandler = (event) => {
        event.preventDefault();
        if (!Object.keys(errors).length) {
            dispatch(fetchGetLogin(userdata))
            console.log(user_data);
            // console.log(userdata);
            // const req = async () => {
            //     try {
            //         const { data } = await axios.post(
            //             "http://kzico.runflare.run/user/login",
            //             {
            //               "email": userdata.email,
            //               "password": userdata.password,
            //             }
            //           )
            //           console.log(data);
            //         //   console.log(data.user.token);
            //         //   console.log(userdata);
            //             localStorage.setItem('token', data.user.token)
            //             // console.log(data.user.token);
            //             let userToken = localStorage.getItem('token');
            //             userdata.token = userToken;
            //             console.log(userdata);
            //           notify('You loged in successfully', 'success')
            //     } catch (error) {
            //         console.log(error.response.data.message);
            //         let err = error.response.data.message 
            //         notify(err, 'warning')
            //     }
            // }
            // req();
            // localStorage.setItem('userDataLogin', JSON.stringify(userdata))
            
            // let userDataLoginLocal = localStorage.getItem('userDataLogin')
            // let parsedData = JSON.parse(userDataLoginLocal)
            // console.log(parsedData);
            notify('You loged in successfully', 'success')
        } else {
            notify('Invalid data!')
            setTouched({
                email: true,
                password: true,
            }) 
        } 
    }

    return (
        <div className={styles.container}>
            <form onSubmit={submitHandler} className={styles.formContainer}>
                <h2 className={styles.header}>Login</h2>
                
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
                
                
                
                <div className={styles.formButtons}>
                    <Link to='/registerPage/signup'>SignUp</Link>
                    <button type='submit'>Login</button>
                </div>
            </form>
            <ToastContainer />
        </div>
    );
};

export default Login;