import axios from "axios";
import { useAuth } from "@clerk/clerk-react";

const axiosSecure = axios.create({
  baseURL: "http://localhost:4000/api/v1",
});

const useAxios = () => {
  const { getToken } = useAuth();

  axiosSecure.interceptors.request.use(async (config) => {
    const token = await getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  return { axiosSecure };
};

export default useAxios;
