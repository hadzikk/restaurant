import { Routes, Route } from "react-router"
import { menuRoutes } from "@menu/routes"

const AppRoutes = () => {
    return (
        <Routes>
            {[...menuRoutes].map((route) => (
                <Route key={route.path} {...route} />
            ))}
        </Routes>
    )
}

export default AppRoutes