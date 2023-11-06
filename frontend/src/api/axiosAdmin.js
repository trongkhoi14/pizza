import axios from "axios";
import { store } from "../utils/Utils";
import { BASE_URL } from "../utils/constant";

const axiosAdmin = axios.create({
	withCredentials: true,
	baseURL: BASE_URL,
	headers: {
		"Content-Type": "application/json",
		Accept: "application/json",
	},
});

// Interceptors
axiosAdmin.interceptors.request.use(
	function (config) {
		const { info = null } = store.getState().employee;

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
axiosAdmin.interceptors.response.use(
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
			"api/v1/product-category",
			"api/v1/product",
			"api/v1/size",
			"api/v1/employee/login",
			"api/v1/employee/manager",
			"api/v1/employee/staff",
			"api/v1/order",
			"api/v1/notify"
		];
		if (URLS.includes(config.url) && data.data) {
			throw new Error(data.data);
		}
		return Promise.reject(error);
	},
);

export default axiosAdmin;
