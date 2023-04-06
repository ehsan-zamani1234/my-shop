// CgProfile
// GoListOrdered
// AiFillSetting
import *  as CgIcons  from "react-icons/cg";
import *  as GoIcons  from "react-icons/go";
import *  as AiIcons  from "react-icons/ai";


const SidebarDataRes = [
    {
        title: 'Profile',
        path: '/profile',
        icone: <CgIcons.CgProfile/>,
        cName: 'nav-text' 
    },
    {
        title: 'Order',
        path: '/orders',
        icone: <GoIcons.GoListOrdered/>,
        cName: 'nav-text'
    },
    {
        title: 'Setting',
        path: '/ChangeProfileData',
        icone: <AiIcons.AiFillSetting/>,
        cName: 'nav-text'
    },
]

export default SidebarDataRes