import axios from 'axios';

const apiBaseUrl = process.env.NEXT_PUBLIC_WOOCOMMERCE_API_ENDPOINT;
const apiAuth = {
  username: process.env.NEXT_PUBLIC_WOOCOMMERCE_CONSUMER_KEY,
  password: process.env.NEXT_PUBLIC_WOOCOMMERCE_CONSUMER_SECRET,
};

const wooCommerceApi = axios.create({
  baseURL: apiBaseUrl,
  auth: apiAuth,
});


export default wooCommerceApi;