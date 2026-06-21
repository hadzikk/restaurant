import { Routes, Route } from "react-router"
import { menuRoutes } from "@menu/routes"
import { authRoutes } from "@auth/routes"

const AppRoutes = () => {
    return (
        <Routes>
            {[...menuRoutes, ...authRoutes].map((route) => (
                <Route key={route.path} {...route} />
            ))}
        </Routes>
    )
}

export default AppRoutes