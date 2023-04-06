import React from 'react';
// import { Link } from 'react-router-dom';
import Sidebar from './Sidebar';

//style
// import styles from '../../styles/Sidebar.module.css'

// import { SidebarData } from './SidebarData';

const Setting = () => {
    return (
      <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
        <div>
          <Sidebar/>
        </div>

        <div  style={{marginTop: '100px'}}>
          <p>change profile</p>
        </div>
      </div>
    );
};

export default Setting;