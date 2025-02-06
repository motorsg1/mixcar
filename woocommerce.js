import axios from 'axios';

const apiBaseUrl = 'https://restapi.motorsgate.sa/wp-json/';
const apiAuth = {
  username: 'ck_b9fdbf7eb67976331e0fe28c8c3e6d7d4f08e517',
  password: 'cs_db6151af3a1f6fdac18b4823278944a0051e8766',
};

const wooCommerceApi = axios.create({
  baseURL: apiBaseUrl,
  auth: apiAuth,
});

export default wooCommerceApi;