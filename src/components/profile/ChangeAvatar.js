import React from 'react';
import Sidebar from './Sidebar';
import axios from 'axios';
import { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { notify } from '../../LoginSignup/toast';
import styles from '../../styles/ChangeAvatar.module.css'

const ChangeAvatar = () => {

    const token = localStorage.getItem('token')
    const [pic, setPic] = useState(null)
    const req = async () => { 
        const formData = new FormData();
        formData.append("profile-image", pic)
        try {
            const { data } = await axios.post(
                "http://kzico.runflare.run/user/profile-image",
                formData,   
                {
                  headers: {
                    authorization:
                      `Bearer ${token}`,
                  },
                }
              )
            //   console.log('this is token: ' + token);
            console.log(data);
            notify('Password has been changed', 'success')
        } catch (error) {
            // console.log(error.response.data);
            notify(error.response.data.message)
        }
    }
 
    return (
        <div className={styles.containerr}>
            <Sidebar />

            <div style={{marginTop: '15px'}}>
            {/* style={{ display: 'flex', justifyContent: 'center', marginTop: '100px'}} */}
            <div  className={styles.container} style={{marginTop: '90px'}}>
                <form className={styles.formContainer} onSubmit={(e) => e.preventDefault()}>
                <h2 className={styles.header} >Change Avatar</h2>
                    <div className={styles.formField}>
                        <input  
                        className={styles.formInput}
                        onChange={(e) => setPic(e.target.files[0])} type='file'/>
                    </div>
                    <div className={styles.formButtons}>
                    <button type='submit' onClick={req}>
                        Change Avatar
                    </button>
                    </div>
                </form>
                <ToastContainer />
            </div>
           
        </div>
        </div>
    );
};

export default ChangeAvatar;