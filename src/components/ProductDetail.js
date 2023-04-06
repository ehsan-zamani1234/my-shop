import StarRatings from 'react-star-ratings';
import axios from 'axios';
import { useEffect, useState } from 'react';
import React from 'react';
import { Link, useParams } from 'react-router-dom';

//loader
import spinnerDetail from '../gif/spinner.gif'


// styles
import styles from '../styles/ProductDetails.module.css'


const ProductDetail = () => {
    const [product, setProduct] = useState([]);

    const params = useParams();
    const id = params.id

    const [loadingDetails, setLoadingDetails] = useState(true)
    

    useEffect(() => {
        const getSingleProduct = async () => {
            const res = await axios.get(`https://kzico.runflare.run/product/${id}`)
            setLoadingDetails(false)
            return setProduct(res.data)
        }
        getSingleProduct()
    }, [])
    

    const {image, brand, name, description, category, color, price, countInStock, rating} = product
    
    return (
        <>
            {loadingDetails ? <div className={styles.loading}> <img src={spinnerDetail} alt='loading' /> </div> : 
                <div className={styles.container}>
                {/* detail - {id} */}
                <img className={styles.image} src={image} alt='product'/>
                    <div className={styles.textContainer}>
                        <h2>{name}</h2>
                        <h3>{brand}</h3>
                        <p className={styles.description}>{description}</p>
                        <p className={styles.category}><span>Category:</span> {category}</p>
                        <p className={styles.color}>color: {color}</p>
                        <StarRatings
                        rating={rating}
                        starRatedColor="blue"
                        starDimension="15px"
                        starSpacing="2px"
                        numberOfStars={5}
                        />
                        {
                            countInStock ? <p className={styles.stock}>Count in Stock: {countInStock}</p> : <p className={styles.outOfStock}>Out of Stock :(</p>
                        }
                        <div className={styles.buttonContainer}>
                            <span className={styles.price}>{`${price}.00 $`}</span>
                            <Link to='/products'>Back to Shop</Link>
                        </div>
                    </div>
                
                </div>
            }
        </>
    );
};

export default ProductDetail;