import { axiosInstance } from "@/utils/axiosInstance";
import Cookies from "js-cookie";

const useAxios = async (url, method, needAuth=true) => {
  try {
    const headers = {};
    
    if (needAuth) {
      const token = Cookies.get("auth_info");
      if (token) {
        headers["authorization"] = `Bearer ${token}`;
      }
    }

    const res = await axiosInstance({url, method, data, headers});
    return res.data;
  } catch (err) {
    console.log("error: ", err.message);
    return null;
  }
}

export default useAxios;
