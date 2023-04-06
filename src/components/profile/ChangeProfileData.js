import React, {useState, useEffect} from 'react';
import Sidebar from './Sidebar';
import { validateProfData } from './validateProfData';
import axios from 'axios';
import styles from '../../styles/ChangeProfile.module.css'


const ChangeProfileData = () => {
    const [profData, setProfData] = useState({
        firstname: '',
        lastname: '',
        gender: '',
        age: '',
        city: '',
    });
    const [errors, setErrors] = useState({});  
    const [touched, setTouched] = useState({});
    let token = localStorage.getItem('token')

    useEffect(() => {
        setErrors(validateProfData(profData))
        // console.log(errors);
    },[profData, touched])

    const changeHandler = (event) => {
        setProfData({ ...profData, [event.target.name]: event.target.value })
        // console.log(userAddress);
    }

    const focusHandler = (event) => {
        setTouched({ ...touched, [event.target.name]: true })
    }
    // ------------------------------

    const req = async () => {
        try {
            const { data } = await axios.put(
                "http://kzico.runflare.run/user/change-profile",
                {
                    firstname: profData.firstname,
                    lastname: profData.lastname,
                    gender: profData.gender,
                    age: profData.age,
                    city: profData.city,
                },
                {
                  headers: {
                    authorization:
                      `Bearer ${token}`,
                  },
                }
              );
              console.log(data);
              console.log('this is token: ' + token);
        } catch (error) {
            console.log(error);
        }
    }



    // -------------------------------------
    const submitHandler = (event) => {
        event.preventDefault();
        if (!Object.keys(errors).length) {
            // console.log(profData);
            req();
            // localStorage.setItem('userAddressFromLocal', JSON.stringify(userAddress))
            // navigate('/checkout')
        } else {
            setTouched({
                firstname: true,
                lastname: true,
                gender: true,
                age: true,
                city: true,
            })
        }
    }

    return (
        <div className={styles.containerr}>
            <Sidebar />

            <div style={{marginTop: '90px'}}>
                <div className={styles.container}>
                <form onSubmit={submitHandler} className={styles.formContainer}>
                <h2 className={styles.header}>Change profile</h2>
                <div className={styles.formField}>
                    <label>FirstName</label>
                    <input
                    className={(errors.firstname && touched.firstname) ? styles.uncoumpleted : styles.formInput}
                    type='text'
                    name='firstname' 
                    value={profData.firstname} 
                    onChange={changeHandler} 
                    onFocus={focusHandler} />
                    {errors.firstname && touched.firstname && <span>{errors.firstname}</span>}
                </div>
                <div className={styles.formField}>
                    <label>LastName</label>
                    <input 
                    className={(errors.lastname && touched.lastname) ? styles.uncoumpleted : styles.formInput}
                    type='text' 
                    name='lastname' 
                    value={profData.lastname} 
                    onChange={changeHandler} 
                    onFocus={focusHandler} />
                    {errors.lastname && touched.lastname &&  <span>{errors.lastname}</span>}
                </div>
                <div className={styles.formField}>
                    <label>Gender</label>
                    <input 
                    className={(errors.gender && touched.gender) ? styles.uncoumpleted : styles.formInput}
                    type='text' 
                    name='gender' 
                    value={profData.gender} 
                    onChange={changeHandler} 
                    onFocus={focusHandler} />
                    {errors.gender && touched.gender &&  <span>{errors.gender}</span>}
                </div>
                <div className={styles.formField}>
                    <label>Age</label>
                    <input
                    className={(errors.age && touched.age) ? styles.uncoumpleted : styles.formInput}
                    type='text' 
                    name='age' 
                    value={profData.age} 
                    onChange={changeHandler} 
                    onFocus={focusHandler} />
                    {errors.age && touched.age &&  <span>{errors.age}</span>}
                </div>
                <div className={styles.formField}>
                    <label>City</label>
                    <input 
                    className={(errors.city && touched.city) ? styles.uncoumpleted : styles.formInput}
                    type='text'
                    name='city' 
                    value={profData.city} 
                    onChange={changeHandler} 
                    onFocus={focusHandler} />
                    {errors.city && touched.city && <span>{errors.city}</span>}
                </div>
                <div className={styles.formButtons}>
                    {/* <a href='#'>Next</a> */}
                    <button type='submit'>Done</button>
                </div>
           </form>
        </div>
            </div>
        </div>
    );
};

export default ChangeProfileData;