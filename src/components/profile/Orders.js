import React, { useEffect, useState } from 'react';
import axios from 'axios';

// Loader
// import spinnerOrder from '../../gif/spinner.gif'
import Loader from '../shared/Loader';

// Component
import ShowOrders from './ShowOrders';

const Orders = () => {
    let token = localStorage.getItem('token')
    const [allOrders, setAllOrders] = useState([]);
    const [items, setItems] = useState()
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        const req = async () => {
            try {
                const { data } = await axios.get("http://kzico.runflare.run/order/", {
                    headers: {
                      authorization:
                        `Bearer ${token}`,
                    },
                  })
                  console.log(data)
                setLoading(false)
                setAllOrders([...data])
            } catch (error) {
                console.log(error.response);
                // console.log(error.response.data.message[0]);
            }
        }
        req();
    }, [])

    // console.log(allOrders);
    // allOrders.map((item) => item.orderItems.map(item => console.log(item.product)))

    return (
        <div style={{marginTop: '100px'}}>
            {
                loading ? <Loader /> : allOrders.map((item) =>  <ShowOrders key={item._id} data={item}/>)
            }
            {/* {loading ? <Loader /> : <p>{allOrders[0].paymentMethod}</p>} */}
        </div>
    );
};

export default Orders;