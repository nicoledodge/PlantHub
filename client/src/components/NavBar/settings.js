import Auth from "../../utils/auth";

const getSettings = (handleSignUpModal, handleLoginModal, logout) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;
    if (!token) {
      return [
        {
            name:'SignUp',
            callback: handleSignUpModal,
        },
        {
            name:'Login',
            callback: handleLoginModal,
        },
    ];
    } 
    return [
        {
            name: 'Profile',
            callback: null,
            routeTo: '/Profile'
        },
        {
            name:'Dashboard',
            callback: null,
            routeTo: "/mygarden"
        },
        {
            name:'Logout',
            callback: logout,
        },
    ];
}

export default getSettings