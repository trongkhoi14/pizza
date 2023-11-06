import axios from "axios";
import { store } from "../utils/Utils";
import { BASE_URL } from "../utils/constant";

const axiosClient = axios.create({
	withCredentials: true,
	baseURL: BASE_URL,
	headers: {
		"Content-Type": "application/json",
		Accept: "application/json",
	},
});

// Interceptors
axiosClient.interceptors.request.use(
	function (config) {
		const { info = null } = store.getState().user;

		if (info) {
			config.headers.Authorization = `Bearer ${info.accessToken}`;
		}

		return config;
	},
	function (error) {
		// Do something with request error
		return Promise.reject(error);
	},
);

// Add a response interceptor
axiosClient.interceptors.response.use(
	function (response) {
		// Any status code that lie within the range of 2xx cause this function to trigger
		// Do something with response data
		return response.data;
	},
	function (error) {
		// Any status codes that falls outside the range of 2xx cause this function to trigger
		// Do something with response error
		const { config, status, data } = error.response;
		const URLS = [
			"api/v1/user/register",
			"api/v1/user/login",
			"api/v1/user/logout",
			"api/v1/product-category",
			"api/v1/product",
			"api/v1/order",
			"api/v1/order/search",
			"api/v1/product/category"
		];
		if (URLS.includes(config.url) && data.data) {
			throw new Error(data.data);
		}
		return Promise.reject(error);
	},
);

export default axiosClient;
