import React, { useState } from 'react';
import { useEffect } from 'react';
import ReactPaginate from 'react-paginate';
import { useSelector, useDispatch } from 'react-redux';

// styles
import '../styles/paginate.css';
import styles from '../styles/Store.module.css'

// components
import Product from './shared/Product';
import Loader from './shared/Loader';

// context
// import { productsContext } from '../context/ProductContextProvider';

// redux
import { fetchProducts } from '../redux/products/poductsAction';

const Store = () => {

    const dispatch = useDispatch();
    const productsState = useSelector(state => state.productsState)

    useEffect(() => {
        if(!productsState.products.length )dispatch(fetchProducts())
    },[])
  
    const itemPerPage = 10;
    const products = productsState.products;
    const [itemOffset, setItemOffset] = useState(0);
    const endOffset = itemOffset + itemPerPage;
    const currentItems = products.slice(itemOffset, endOffset);
    const pageCount = Math.ceil(products.length / itemPerPage)
    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemPerPage) % products.length;
        setItemOffset(newOffset);
        window.scrollTo(0, 0)
      };
    

    return (
        <div>
            <div className={styles.container}>
                {
                    productsState.loading ?
                        <Loader /> :
                    productsState.error ? 
                        <p>Something went wrong!</p> :
                        currentItems.map((product) => <Product
                        key={product._id}
                        productData={product}
                    />)
                }
            </div>
            <div>
                <ReactPaginate
                    breakLabel="..."
                    nextLabel=">"
                    onPageChange={handlePageClick}
                    // pageRangeDisplayed={5}
                    pageCount={pageCount}
                    previousLabel="<"
                    renderOnZeroPageCount={null}
                    containerClassName='btn'
                    pageLinkClassName='btn-link'
                    previousLinkClassName='previous'
                    nextLinkClassName='next'
                    activeLinkClassName='activeStyle'
                />
                
            </div>
        </div>

    );
};

export default Store;