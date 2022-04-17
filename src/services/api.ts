import axios from "axios"

export const api = axios.create({
    baseURL: 'https://dtmoney-one-nu.vercel.app:3000/api'
}) 