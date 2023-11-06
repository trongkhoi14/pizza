import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  Outlet,
  createBrowserRouter,
  useLocation,
  useNavigate,
} from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";
import About from "../pages/AboutUs";
import Account from "../pages/Account";
import ChangePasswordForm from "../pages/Account/components/ChangePasswordForm";
import ProfileForm from "../pages/Account/components/ProfileForm";
import AdminLayout from "../pages/Admin";
import AdminCategory from "../pages/Admin/partials/AdminCategory";
import AdminEmployee from "../pages/Admin/partials/AdminEmployee";
import AdminLogin from "../pages/Admin/partials/AdminLogin";
import AdminOrder from "../pages/Admin/partials/AdminOrder";
import AdminDeliveredOrders from "../pages/Admin/partials/AdminOrder/DeliveredOrders";
import AdminProduct from "../pages/Admin/partials/AdminProduct";
import AdminSize from "../pages/Admin/partials/AdminSize";
import Dashboard from "../pages/Admin/partials/Dashboard";
import Blog from "../pages/Blog";
import Cart from "../pages/Cart";
import Checkout from "../pages/Checkout";
import ErrorPage from "../pages/Error";
import Home from "../pages/Home";
import Menu from "../pages/Menu";
import Tracking from "../pages/Tracking";
import { setInitStateCart } from "../redux/slice/cartSlice";
import { history } from "../utils/Utils";
import { ARTICLE_LIST } from "../utils/constant";
import BlogDetails from "../pages/Blog/components/BlogDetails";

const MainLayout = () => {
  history.navigate = useNavigate();
  history.location = useLocation();

  return (
    <>
      <Outlet />
    </>
  );
};

// const AdminLayout = () => {
// 	const { info } = useSelector((state) => state.employee);
// 	if (!Object.keys(info).length) return <Navigate to={"/admin/login"} />;

// 	return (
// 		<>
// 			<Outlet />
// 		</>
// 	);
// };

const ShopLayout = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setInitStateCart());
  });

  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};

export default createBrowserRouter([
  {
    element: <MainLayout />,
    errorElement: <ErrorPage debug={true} />,
    children: [
      {
        element: <AdminLogin />,
        path: "/admin/login",
      },
      {
        element: <AdminLayout />,
        path: "/admin",
        children: [
          {
            path: "/admin",
            element: <Dashboard />,
          },
          {
            path: "/admin/product",
            element: <AdminProduct />,
          },
          {
            path: "/admin/category",
            element: <AdminCategory />,
          },
          {
            path: "/admin/size",
            element: <AdminSize />,
          },
          {
            path: "/admin/order",
            element: <AdminOrder />,
          },
          {
            path: "/admin/delivered_orders",
            element: <AdminDeliveredOrders />,
          },
          {
            path: "/admin/employee/manager",
            element: (
              <AdminEmployee employeeType="manager" rolesRequired={["admin"]} />
            ),
          },
          {
            path: "/admin/employee/staff",
            element: (
              <AdminEmployee
                employeeType="staff"
                rolesRequired={["admin", "manager"]}
              />
            ),
          },
        ],
      },
      {
        element: <ShopLayout />,
        children: [
          {
            element: <Home />,
            path: "/",
          },
          {
            element: <Menu />,
            path: "/menu/:category",
          },
          {
            element: <Menu />,
            path: "/menu",
          },
          {
            element: <Menu />,
            path: "/menu/:category",
          },
          {
            element: <Menu />,
            path: "/menu",
          },
          {
            element: <About />,
            path: "/about-us",
          },
          {
            element: <Cart />,
            path: "/cart",
          },
          {
            element: <Checkout />,
            path: "/checkout",
          },
          {
            element: <Account />,
            path: "/account",
            children: [
              {
                element: <ProfileForm />,
                path: "/account/profile",
              },
              {
                element: <ChangePasswordForm />,
                path: "/account/change-password",
              },
            ],
          },
          {
            element: <Tracking />,
            path: "/tracking",
          },
          {
            path: "/articles/:article",
            loader: ({ params }) => {
              if (!ARTICLE_LIST.includes(params.article.toLocaleLowerCase()))
                throw new Response("Not Found", { status: 404 });
              return null;
            },
            children: [
              {
                path: "",
                element: <Blog />,
              },
              {
                path: ":id",
                element: <BlogDetails />,
              },
            ],
          },
        ],
      },
    ],
  },
]);
