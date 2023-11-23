import axiosInstance from "@/utils/axiosInstance";
import Cookies from "js-cookie";

const useAxios = async (url, method, data, isProtected = true, params = {}) => {
  try {
    const headers = {};

    if (isProtected) {
      const token = Cookies.get("auth_info");
      if (token) {
        headers["authorization"] = `Bearer ${token}`;
      }
    }

    const res = await axiosInstance({ url, method, data, headers, params });
    return res.data;
  } catch (err) {
    console.log("error: ", err.message);
    return null;
  }
};

export default useAxios;
