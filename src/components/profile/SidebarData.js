import *  as ImIcons  from "react-icons/im";
import *  as CgIcons  from "react-icons/cg";
import *  as RxIcons  from "react-icons/rx";

export const SidebarData = [
    {
        title: 'Change Profile',
        path: '/ChangeProfileData',
        icone: <ImIcons.ImProfile/>,
        cName: 'nav-text'
    },
    {
        title: 'Change Password',
        path: '/ChangePassword',
        icone: <CgIcons.CgPassword/>,
        cName: 'nav-text'
    },
    {
        title: 'Change Avatar',
        path: '/ChangeAvatar',
        icone: <RxIcons.RxAvatar/>,
        cName: 'nav-text'
    },
]