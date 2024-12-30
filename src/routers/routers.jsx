import { createBrowserRouter } from "react-router-dom";
import Layout from "../components/layout/Layout";
import HomePage from "../pages/HomePage";
import ProductListPage from "../pages/ProductList/ProductListPage";
import ProductList from "../pages/ProductList/ProductList";
import DetailProduct from "../pages/DetailProduct/DetailProduct";
import Login from "../pages/Login";
import CartPage from "../pages/CartPage";
import OrderPage from "../pages/OrderPage";
import OrderDetailPage from "../pages/OrderDetailPage";
import BlogPage from "../pages/ProductList/BlogPage";
import PrivateRoute from "../components/PrivateRouter";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                path: "",
                element: <HomePage />,
            },
            {
                path: "product",
                element: (<ProductListPage />),
                children: [
                    {
                        path: "",
                        element: (<ProductList />)
                    },
                    {
                        path: ":id",
                        element: (<DetailProduct />)
                    }
                ]
            },
            {
                path: "blog",
                element: <BlogPage />,
            },
            {
                path: "shopping-cart",
                element: <PrivateRoute></PrivateRoute>,
                children: [
                    {
                        path: "",
                        element: (<CartPage />)
                    }
                ]
            },
            {
                path: "order",
                element: <OrderPage />,
            },
            {
                path: "login",
                element: <Login />,
            },
        ],
    },
]);

export default router;
