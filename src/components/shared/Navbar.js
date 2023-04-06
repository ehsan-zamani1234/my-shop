import React from 'react';
import { useState } from 'react';
// import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
// import { useSelector } from 'react-redux';
// import { useContext } from 'react';
import { Link } from 'react-router-dom';
// import Loader from './Loader';
import SidebarDataRes from './SideparDataRes';

import *  as FaIcons  from "react-icons/fa";
import *  as AiIcons  from "react-icons/ai";
import *  as BiIcons  from "react-icons/bi";

// styles
import styles from '../../styles/Navbar.module.css'
import '../../styles/SidebarRes.css'

// redux
import { clearUserData } from '../../redux/user/userAction';



// context
// import { CartContext } from '../../context/CartContextProvider';

// redux
// import { fetchGetProfile } from '../../redux/user/userAction';
// import { fetchGetLogin } from '../../redux/user/userAction';


// icons
import shopIcon from '../../assets/icons/shop.svg'
import homeIcon from '../../assets/icons/home.svg'



const Navbar = () => {

    // const [getUserEmail, setGetUserEmail] = useState([]);

    // const dispatch = useDispatch();

    // const { state } = useContext(CartContext)
    // const dispatch = useDispatch();

    const state = useSelector(state => state.cartState)
    const dispatch = useDispatch();



    const userState = useSelector(state => state.userSate)
    const user_data = userState.userData;
    // console.log(user_data);
    // console.log(user_data.token);
    let jwt = user_data.token
    localStorage.setItem('token', jwt)

    const [sidebar, SetSidebar] = useState(false);
    const showSidebar = () => SetSidebar(!sidebar);
    
    
    // const user_data = userState.userData.user.email;

    // const user_err = userState.error;
    // console.log(user_data.length);
    // var parsedData = JSON.parse(localStorage.getItem('userDataLogin')) 
    // if (user_data) {
    //     console.log(parsedData.email);
    // }
    // useEffect(() => {
    //         dispatch(fetchGetLogin())
    // }, [])




    // const userState = useSelector(state => state.userSate)
    // console.log(userState.userData.user)

    // const receivedData = userSate.user
    // const userData = receivedData.user
    // // const userEmail = userData.email 
    // if (userSate.loading) {
    //     console.log('loading');
    // } else if (userSate.user) {
    //     console.log(userData);
    // }

    // useEffect(() => {
    //     const fetchProf = async () => {
    //         dispatch(await fetchGetProfile())
    //     }
    //     fetchProf()
    // }, [])

    // useEffect(() => {
    //         dispatch(fetchGetProfile())
    // }, [])
    
// -----------------------------------------------------------------------
//  useEffect(() => {
//     let token = localStorage.getItem('token')
//     const req = async () => {
//         try {
//             const { data } = await axios.get(
//                 "http://kzico.runflare.run/user/profile",
//                 {
//                   headers: {
//                     authorization:
//                       `Bearer ${token}`,
//                   },
//                 }
//               );
//               console.log(data.user);
//               console.log('this is token: ' + token);
//             //   localStorage.setItem('userData', JSON.stringify(data.user))
//               return setGetUserEmail(data.user)
//         } catch (error) {
//             // error ham bayad set beshe to Satate
//             // check beshe AGE ERROR VUJUD DASHT butten age na email
//             console.log(error.response.data);
//             console.log(error.response.data.message);
//         }
        
//     }
//     req();
//  }, [])


//  console.log(getUserEmail);
//  const { email } = getUserEmail
// //  const { message } = getErrorUserEmail

// console.log(email);
// console.log(`error ${message}`);
// -----------------------------------------------------------------------
const [dropFlag, setDropFlag] = useState(false)
const showDropdown = () => {
    setDropFlag(true)
};

const hideDropdown = () => {
    setDropFlag(false)
};

const logOutHandler = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('userFromLocal')
    dispatch(clearUserData())
}

    

    return (
        <div className={styles.mainContainer}>
            <div className={styles.container}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Link to='/'><img src={homeIcon} alt='home' style={{ marginRight: '16px', marginTop: '6px' }} /></Link>
                    <Link className={styles.productLink} to='/products'>Products</Link>
                </div>
                <div className={styles.iconContainerDisplay}>
                    <div className={styles.iconContainer}>
                        <Link to='/cart'><img src={shopIcon} alt='shop' /></Link>
                        <span>{state.itemsCounter}</span>
                    </div>
                    {/* {
                        user_data.token ?
                       
                        <p className={styles.emailBtn}>{user_data.email}</p> :
                        <Link to='/registerPage'><button className={styles.btn}>Login/SignUp</button></Link> 
                    } */}
                    {
                        user_data.token ?
                        <>
                        <div className={styles.dropdown} onMouseEnter={showDropdown} onMouseLeave={hideDropdown}>
                            <p className={styles.emailBtn}>{user_data.email}</p>
    
                            {dropFlag ? (<ul className={styles.dropdownMenu} onMouseEnter={showDropdown}>
                                <Link className={styles.dropItem} to='/profile'><li>Profile</li></Link>
                               
                                <Link className={styles.dropItem} to='/orders'><li>Orders</li></Link>
                                
                                <Link className={styles.dropItem} to='/ChangeProfileData'><li>Setting</li></Link>
   
                                <li onClick={logOutHandler} className={styles.noneBorder}>Log out</li>
                                </ul>): null}
                        </div>
                        <div className='fullSidebar'>
                            <div className={styles.hamburger}>
                                <Link to={'#'}>
                                    <FaIcons.FaBars  onClick={showSidebar}/>
                                </Link>
                            </div> 

                            <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
                            <ul className='nav-menu-items'  onClick={showSidebar}>
                                <li className='navbar-toggle'>
                                <Link to={'#'} className='menu-bars'>
                                    <AiIcons.AiOutlineClose /> 
                                </Link>
                                </li>
                                {SidebarDataRes.map((item, index) => {
                                return (
                                    <li key={index} className={item.cName}>
                                    <Link to={item.path}> 
                                    {item.icone}
                                    <span>{item.title}</span> 
                                    </Link>
                                    </li>
                                )
                                })}
                                <li className='nav-text'>
                                    <Link to='#'>
                                    {/* BiLogOutCircle */}
                                    <BiIcons.BiLogOutCircle/>
                                    <span onClick={logOutHandler}>Log out</span>
                                    </Link>
                                </li>
                                
                            
                            </ul>
                        </nav>
                        </div> 
                          
                        </>
                        :
                        <Link to='/registerPage'><button className={styles.btn}>Login/SignUp</button></Link> 
                    }
                    {/* <Link to='/registerPage'><button className={styles.btn}>Login/SignUp</button></Link> */}
                </div>
            </div>

        </div>
    );
};

export default Navbar;