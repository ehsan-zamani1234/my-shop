import React from 'react';
import { useEffect } from 'react';
// import axios from 'axios';
// ------------------------
import { useSelector, useDispatch } from 'react-redux';
import Loader from './shared/Loader';
import { fetchProducts } from '../redux/products/poductsAction';
import { shorten } from '../helper/function';
import StarRatings from 'react-star-ratings';
// ------------------------
// import { fetchGetProfile } from '../redux/user/userAction';
// ------------------------

//styles
import styles from '../styles/Home.module.css'


// Import Swiper styles
import 'swiper/css';
import "swiper/swiper.min.css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from "swiper";

//images
import first from '../assets/slider-images/1.jpg'
import seccond from '../assets/slider-images/2.jpg'
import third from '../assets/slider-images/3.jpg'

const Home = () => {

    const dispatch = useDispatch();

    const productsState = useSelector(state => state.productsState)
    const products = productsState.products;
    const sliceItems = products.slice(17, 25);



    

    useEffect(() => {
        if (!productsState.products.length) dispatch(fetchProducts())
    }, [])

    return (
        <>
            <Swiper
                spaceBetween={30}
                centeredSlides={true}
                autoplay={{
                    delay: 4000,
                    disableOnInteraction: false,
                }}
                pagination={{
                    clickable: true,
                }}
                navigation={true}
                modules={[Autoplay, Pagination, Navigation]}
                style={{ marginTop: '70px', zIndex: '0' }}
                className="mySwiper"
            >
                <SwiperSlide>
                    {" "}
                    <img
                        src={first}
                        alt="Picture of the author"
                        style={{ width: '100%', height: '100%' }}
                    />
                </SwiperSlide>
                <SwiperSlide>
                    {" "}
                    <img
                        src={seccond}
                        alt="Picture of the author"
                        style={{ width: '100%', height: '100%' }}
                    />
                </SwiperSlide>
                <SwiperSlide>
                    {" "}
                    <img
                        src={third}
                        alt="Picture of the author"
                        style={{ width: '100%', height: '100%' }}
                    />
                </SwiperSlide>
            </Swiper>

            <Swiper
                slidesPerView={3}
                spaceBetween={7}

                breakpoints={{
                    640: {
                        slidesPerView: 3,
                        spaceBetween: 2,
                    },
                    768: {
                        slidesPerView: 4,
                        spaceBetween: 7,
                    },
                    1024: {
                        slidesPerView: 5,
                        spaceBetween: 7,
                    }
                }}
                modules={[Pagination]}
                className="mySwiper"
                style={{ marginTop: '12px', marginBottom: '30px', marginLeft: '20px', zIndex: '0' }}
            >
                {
                    productsState.loading ?
                        <Loader /> :
                        productsState.error ?
                            <p>Something went wrong!</p> :
                            sliceItems.map((product) => <SwiperSlide key={product._id}>
                                {
                                    <>
                                        <div className={styles.carousel}>
                                            <img style={{ width: '70px', height: "100px" }} src={product.image} alt='product image' />
                                            <h5>{shorten(product.name)}</h5>
                                            <div style={{ display: 'flex', alignItems: 'center', zIndex: '0', marginTop: '-13px' }}>
                                                <StarRatings
                                                    rating={product.rating}
                                                    starRatedColor="blue"
                                                    starDimension="15px"
                                                    starSpacing="2px"
                                                    numberOfStars={5}
                                                />
                                            </div>
                                        </div>
                                    </>
                                }
                            </SwiperSlide>)
                }


            </Swiper>
        </>
    );
};

export default Home;



 // let token = localStorage.getItem('token')
        // const getProfile = async () => {
        //     try {
        //         const { data } = await axios.get(
        //             "http://kzico.runflare.run/user/profile",
        //             {
        //               headers: {
        //                 authorization:
        //                   `Bearer ${token}`,
        //               },
        //             }
        //           );
        //           console.log(data);
        //           console.log('this is token: ' + token);
        //     } catch (error) {
        //         console.log(error.response.data);
        //     }
        // }
        // getProfile();