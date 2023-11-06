export const EXPIRE_TIME = 1000 * 60 * 60 * 24;

export const EMPLOYEE_ROLES = ["staff", "manager", "admin"];

export const ORDER_STATUS = [
  "cancelled",
  "pending",
  "preparing",
  "delivering",
  "delivered",
];

export const STATUS_COLORS = {
  cancelled: "text-red-500",
  pending: "text-orange-500",
  preparing: "text-blue-500",
  delivering: "text-purple-500",
  delivered: "text-green-500",
};

export const ARTICLE_LIST = ["news", "promotions"];


export const BASE_URL = "http://localhost:5000/"
export const SOCKET_SERVER_URL = "http://localhost:5000/"
