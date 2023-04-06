import { Route, Routes, Navigate } from 'react-router-dom';
// redirect mikone az har masire chertoperti be products

import { Provider } from 'react-redux';

//components
import Store from './components/Store';
import ProductDetail from './components/ProductDetail';
import Navbar from './components/shared/Navbar';
import ShopCart from './components/ShopCart';
import RegisterPage from './LoginSignup/RegisterPage.js'
import SignUp from './LoginSignup/SignUp.js';
import Login from './LoginSignup/Login.js';
import Home from './components/Home.js';
import Address from './components/Address.js';
import Checkout from './components/Checkout.js';
// import Setting from './components/profile/Setting';
import Orders from './components/profile/Orders';
import OrdersDetail from './components/profile/OrdersDetail';
import Profile from './components/profile/Profile';
import ChangeAvatar from './components/profile/ChangeAvatar';
import ChangePassword from './components/profile/ChangePassword';
import ChangeProfileData from './components/profile/ChangeProfileData';


// context
// import ProductContextProvider from './context/ProductContextProvider';
// import CartContextProvider from './context/CartContextProvider';

// redux
import store from './redux/store'


function App() {
  return (
      <Provider store={store}>
          <Navbar />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/products/:id' element={<ProductDetail />} />
            <Route path='/products' element={<Store />} />
            <Route path='/address' element={<Address />} />
            <Route path='/checkout' element={<Checkout />} />
            <Route path='/profile' element={<Profile />}/>
            <Route path='/ChangeProfileData' element={<ChangeProfileData />} />
            <Route path='/ChangePassword' element={<ChangePassword />} />
            <Route path='/ChangeAvatar' element={<ChangeAvatar />} />
            {/* <Route path='/setting' element={<Setting />}/> */}
            <Route path='/orders' element={<Orders />}/>
            <Route path='/orders/:id' element={<OrdersDetail />}/>
            <Route path='/cart' element={<ShopCart />} />
            <Route path='/registerPage' element={<RegisterPage />} />
            <Route path='/registerPage/signup' element={<SignUp />} />
            <Route path='/registerPage/login' element={<Login />} />
            <Route path='/*' element={<Navigate to='/products' />} />
          </Routes>
      </Provider>
        
      
  );
}

export default App;
