import React from 'react';
// import { Route, Routes, Navigate } from 'react-router-dom';

import SignUp from './SignUp';
import Login from './Login';

const flag = true


const RegisterPage = () => {
    return (
        
        <div style={{textAlign: 'center'}}>
            {flag ? <SignUp/> : <Login />}
           {/* <SignUp /> */}
           {/* <Login /> */}
           
        </div>
    );
};

export default RegisterPage;