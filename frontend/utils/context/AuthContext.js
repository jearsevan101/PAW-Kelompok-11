import Cookies from "js-cookie";
import useAxios from "@/utils/hooks/useAxios";
import { jwtDecode } from "jwt-decode";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export function AuthContextProvider({children}) {
  const [customerInfo, setCustomerInfo] => useState(() => {
    const storedToken = Cookies.get("auth_info");
    return {
      isLoggedIn: false,
      customerInfo: null
    };
  });

  useEffect(() => {
    localStorage.setItem('customer-info', JSON.stringify(customerInfo));
  }, [userInfo]);

  const loginCustomer = async (data) => {
    try {
      const response = await useAxios("/auth/login",  'POST', data, false);

      if (response && response.data.token) {
        const decodedToken = jwtDecode(response.data.token);
        const tokenExpiration = new Date((decodedToken.exp ?? 0) * 1000);

        if (tokenExpiration > new Date()) {
          Cookies.set("auth_info", response.data.token, {expires: tokenExpiration});
          setUserInfo({isLoggedIn: true, userInfo: decodedToken});
        }
      }

      return response;
    } catch (err) {
      console.log("error: ", err.message);
      return null;
    }
  }

  const registerCustomer = async (data) => {
    try {
      const response = await useAxios('/auth/register', 'POST', data, false);
      return response;
    } catch(err) {
      return null;
    }
  };

  const logoutCustomer = () => {
    Cookies.remove("auth_info");
    setUserInfo({isLoggedIn: false, userInfo: null});
  };

  return (
    <AuthContext.Provider value={{customerInfo, loginCustomer, registerCustomer, logoutCustomer}}>
        {children}
    </AuthContext.Provider>
  )
}