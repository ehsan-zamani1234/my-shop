import React, { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';
import Loader from '../shared/Loader';
// styles
import styles from '../../styles/Profile.module.css'

const Profile = () => {
    const [getProfileData, setGetProfileData] = useState({});
    const [loadeing, SetLoading] = useState(true);
    const token = localStorage.getItem('token')
    console.log(token);

    const getProfile = async () => {
        try {
            const { data } = await axios.get(
                "http://kzico.runflare.run/user/profile",
                {
                  headers: {
                    authorization:
                      `Bearer ${token}`,
                  },
                }
              );
            //   console.log(data);
            setGetProfileData(data)
            SetLoading(false)
            //   console.log('this is token: ' + token);
        } catch (error) {
            SetLoading(false)
            console.log(error.response.data);
        }
    }

    console.log(getProfileData.user);
    const { user } = getProfileData;
    console.log(user);
    useEffect(() => {
        getProfile();
    }, [])


    return (
    <>
        {
            
            <div className={styles.profContainer}>
              { 
              loadeing ? <Loader /> : 
                <div className={styles.profile}>
                    <div style={{display: 'flex', justifyContent: 'center'}}>
                        <img style={{borderRadius: '50%'}} width='80px' src={user.image} alt='avatar'/>
                    </div>
                    <div style={{marginTop: '30px'}}>
                    <div><p>Email:<span style={{color: 'black', marginLeft: '5px'}}>{user.email}</span></p></div>
                    <div><p>Username:<span style={{color: 'black', marginLeft: '5px'}}>{user.username}</span></p></div>
                    <div><p>Mobile:<span style={{color: 'black', marginLeft: '5px'}}>{user.mobile}</span></p></div>
                    <div><p>First Name:<span style={{color: 'black', marginLeft: '5px'}}>{user.firstname ? user.firstname : ' '}</span></p></div>
                    <div><p>Last Name:<span style={{color: 'black', marginLeft: '5px'}}>{user.lastname ? user.lastname : ' '}</span></p></div>
                    <div><p>Gender:<span style={{color: 'black', marginLeft: '5px'}}>{user.gender ? user.gender : ' '}</span></p></div>
                    <div><p>Age:<span style={{color: 'black', marginLeft: '5px'}}>{user.age}</span></p></div>
                    <div><p>City:<span style={{color: 'black', marginLeft: '5px'}}>{user.city}</span></p></div>
                    </div>
                </div>
                }
        </div>
        }
        </>
    );
};

export default Profile;