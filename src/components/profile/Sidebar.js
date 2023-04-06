import React from 'react';
import { SidebarData } from './SidebarData';
import { Link } from 'react-router-dom';
import styles from '../../styles/Sidebar.module.css'


const Sidebar = () => {
    return (
         <div>
            <div className={styles.sideMenu}>
            <ul className={styles.sideMenuItems}>
                {/* <li className='navbar-toggle'>
                  <Link to={'#'} className='menu-bars'>
                    <AiIcons.AiOutlineClose /> 
                  </Link>
                </li> */}
                {SidebarData.map((item, index) => {
                  return (
                    <li key={index} className={styles.sideText}>
                      <Link to={item.path}> 
                      {item.icone}
                      <span>{item.title}</span> 
                      </Link>
                    </li>
                  )
                })}
              
            </ul>

          </div>
          {/* ---------------- */}
        </div>
    );
};

export default Sidebar;