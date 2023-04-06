import React from 'react';
import { useState, useEffect } from 'react';

//API
import { getProducts } from '../services/api';


export const productsContext = React.createContext();

const ProductContextProvider = (props) => {

    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchAPI = async () => {
            setProducts(await getProducts())
        }
        fetchAPI()
    }, [])


    return (
        <div>
            <productsContext.Provider value={products}>
                {props.children}
            </productsContext.Provider>

        </div>
    );
};

export default ProductContextProvider;