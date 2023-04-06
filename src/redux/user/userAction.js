import axios from "axios"

const fetchGetLoginRequest = () => {
    return {
        type: 'FETCH_GETLOGIN_REQUEST'
    }
}

const fetchGetLoginSuccess = (data) => {
    return {
        type: 'FETCH_GETLOGIN_SUCCESS',
        payload: data
    }
}

const fetchGetLoginFailure = (error) => {
    return {
        type: 'FETCH_GETLOGIN_FAILURE',
        payload: error
    }
}


const fetchGetLogin = (userdata) => {

    return (dispatch) => {
        dispatch(fetchGetLoginRequest())
        // let token = localStorage.getItem('token')

            axios.post(
                "http://kzico.runflare.run/user/login",
                {
                  "email": userdata.email,
                  "password": userdata.password,
                }
              )
                .then(response => {
                const data = response.data;
                console.log(data.user.token);
                localStorage.setItem('userFromLocal', JSON.stringify(data.user))
                dispatch(fetchGetLoginSuccess(data.user))
                })
                .catch(error => {
                    console.log(error.response.data.message);
                    let err = error.response.data.message 
                    dispatch(fetchGetLoginFailure(err)) 
                })
    }
}


const clearUserData = () => {
    return {
        type: 'CLEAR_USER_DATA'
    }
    
}


export {fetchGetLogin, clearUserData}


// const getProfile = async () => {
//     try {
//         let token = localStorage.getItem('token')
//         const { data } = await axios.get(
//             "http://kzico.runflare.run/user/profile",
//             {
//               headers: {
//                 authorization:
//                   `Bearer ${token}`,
//               },
//             }
//           );
//           console.log(data);
//           dispatch(fetchGetProfileSuccess(data))
//           console.log('this is token: ' + token);
//     } catch (error) {
//         console.log(error.response.data);
//         const errorMsg = error.massage
//         dispatch(fetchGetProfileFailure(errorMsg))
//     }
// }






                //     const getProfile = async () => {
    //     try {
    //         let token = localStorage.getItem('token')
    //         const { data } = await axios.get(
    //             "http://kzico.runflare.run/user/profile",
    //             {
    //               headers: {
    //                 authorization:
    //                   `Bearer ${token}`,
    //               },
    //             }
    //           );
    //           console.log(data);
    //           dispatch(fetchGetProfileSuccess(data))
    //           console.log('this is token: ' + token);
    //     } catch (error) {
    //         console.log(error.response.data);
    //         const errorMsg = error.massage
    //         dispatch(fetchGetProfileFailure(errorMsg))
    //     }
    // }







        // try {
        //     let token = localStorage.getItem('token')
        //     const { data } = axios.get(
        //         "http://kzico.runflare.run/user/profile",
        //         {
        //           headers: {
        //             authorization:
        //               `Bearer ${token}`,
        //           },
        //         }
        //       );
        //       console.log(data);
        //       console.log('this is token: ' + token);
        //       dispatch(fetchGetProfileSuccess(data))
        // } catch (error) {
        //     console.log(error.response.data);
        //     const errorMsg = error.massage
        //     dispatch(fetchGetProfileFailure(errorMsg))
        // }