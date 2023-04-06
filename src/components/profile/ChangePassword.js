import React, { useState } from 'react';
import Sidebar from './Sidebar';
import styles from '../../styles/ChangePassword.module.css'
import { useEffect } from 'react';
import { validatePasswords } from './validatePasswords.js';
import axios from 'axios';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { notify } from '../../LoginSignup/toast';

const ChangePassword = () => {
    const [dataPass, setDataPass] = useState({
        oldPassword: '',
        newPassword: '',
    })
    const [errors, setErrors] = useState({});
    const [tuched, setTouched] = useState({});
    let token = localStorage.getItem('token')
    const [reqData, setReqData] = useState({});

   

    useEffect(() => {
        setErrors(validatePasswords(dataPass))
        console.log(errors);
    }, [dataPass])

    const changeHandler = (event) => {
        // console.log(event.target.value);
        // console.log(event.target.name);
        setDataPass({...dataPass, [event.target.name]: event.target.value})
        console.log(dataPass);
    }

    const focusHandler = event => {
        setTouched({...tuched, [event.target.name]: true})
    }

    // -------------------------
    const req = async () => {
        try {
            const { data } = await axios.put(
                "http://kzico.runflare.run/user/change-password",
                {
                    old_password: dataPass.oldPassword,
                    new_password: dataPass.newPassword,
                },
                {
                  headers: {
                    authorization:
                      `Bearer ${token}`,
                  },
                }
              );
              console.log(data);
              setReqData({...data})
              notify('Password has been changed', 'success')
            //   console.log('this is token: ' + token);
        } catch (error) {
            console.log(error);
            console.log(error.response.data.message);
            notify(error.response.data.message)
        }
    }
    // ------------------------

    const submitHandler = (event) => {
        event.preventDefault()
        if (!Object.keys(errors).length) {
            console.log(dataPass);
            req();
        } else {
            setTouched({
                oldPassword: true,
                newPassword: true,
            })
        }
    }


    return (
        <div className={styles.containerr}>
            <Sidebar />

            <div style={{marginTop: '15px'}}>
            <div className={styles.container} style={{marginTop: '90px'}}>
                <form onSubmit={submitHandler} className={styles.formContainer}>
                    <h2 className={styles.header} >Change Password</h2>
                    <div className={styles.formField}>
                        <label>Old Password</label>
                        <input 
                            className={(errors.oldPassword && tuched.oldPassword) ? styles.uncoumpleted : styles.formInput}
                            type='text' 
                            name='oldPassword' 
                            value={dataPass.oldPassword} 
                            onChange={changeHandler} 
                            onFocus={focusHandler}/>
                        {errors.oldPassword && tuched.oldPassword && <span>{errors.oldPassword}</span>}
                    </div>
                    <div className={styles.formField}>
                        <label>New Password</label>
                        <input 
                            className={(errors.newPassword && tuched.newPassword) ? styles.uncoumpleted : styles.formInput}
                            type='text' 
                            name='newPassword' 
                            value={dataPass.newPassword} 
                            onChange={changeHandler} 
                            onFocus={focusHandler}/>
                        {errors.newPassword && tuched.newPassword && <span>{errors.newPassword}</span>}
                    </div>
                    <div className={styles.formButtons}>
                    {/* <a href='#'>Next</a> */}
                    <button type='submit'>Done</button>
                </div>
                </form>
                <ToastContainer />
            </div>
            </div>
            
        </div>
    );
};

export default ChangePassword;