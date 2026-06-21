import LoginPage from "./components/LoginPage/LoginPage";
import RegisterPage from "./components/RegisterPage/RegisterPage";

export const authRoutes = [
    { path: "/login", element: <LoginPage /> },
    { path: "/register", element: <RegisterPage /> },
]