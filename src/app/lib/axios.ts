import axios from "axios"

const isBrowser = typeof window !== "undefined"

const isUsingPhone = isBrowser && navigator.userAgent.includes("Mobile")

const LOCAL_IP = "192.168.2.102"

export const baseURL =
    process.env.NODE_ENV === "production"
        ? "https://www.johanclifford.com"
        : isUsingPhone
          ? `http://${LOCAL_IP}:3000`
          : "http://localhost:3000"

const axiosAPI = axios.create({
    baseURL,
    withCredentials: true,
})

export default axiosAPI
