import axios from "axios"

// Check if running in a browser (not Node.js)
const isBrowser = typeof window !== "undefined"

// Check if the user is on a phone
const isUsingPhone = isBrowser && navigator.userAgent.includes("Mobile")

const LOCAL_IP = "192.168.2.102" // Change this to your actual local IP

export const baseURL =
    process.env.NODE_ENV === "production"
        ? "https://johanclifford.com"
        : isUsingPhone
          ? `http://${LOCAL_IP}:3000`
          : "http://localhost:3000"

const axiosAPI = axios.create({
    baseURL,
    withCredentials: true,
})

export default axiosAPI
