import { jwtDecode } from "jwt-decode";
import axios from 'axios'

const setToken  = (token) => {
    localStorage.setItem('token', token)
}

const getToken = () => {
    const token  = localStorage.getItem('token');
    if (token) {
        return token
    }
    return null;
}

const login = (userData) => {
    return axios.post("http://localhost:5000/login", userData)
}

const getUserId = () => {
    const token = getToken();
    if (token) {
        const payload = jwtDecode(token)
        return payload?.userId
    }
    return null;
}

const getUserEmail = () => {
    const token = getToken();
    if (token) {
        const payload = jwtDecode(token)
        return payload?.email
    }
    return null;
}

const getUserRoles = () => {
    const token = getToken();
    if (token) {
        const payload = jwtDecode(token)
        return payload?.roles
    }
    return null; 
}

const isLoggedIn = () => {
    const token = getToken();
    if (token) {
        const payload = jwtDecode(token);
        const isLogin = Date.now() < payload.exp * 1000;
        return isLogin;
    }
    return null;
}

const logOut = ()=> {
    localStorage.clear();
 }


const setCurrentRole = (role) => {
    localStorage.setItem('currentRole', role);
}

const getCurrentRole = () => {
    return localStorage.getItem('currentRole');
}

const setCurrentRoleId = (roleId) => {
    localStorage.setItem('currentRoleId', roleId);
}

const getCurrentRoleId = () => {
    return parseInt(localStorage.getItem('currentRoleId'));
}


export  const authService = { logOut, getToken, setToken, login, getUserEmail, getUserRoles, isLoggedIn, setCurrentRole, getCurrentRole, setCurrentRoleId, getCurrentRoleId, getUserId };