import { Routes, Route, Navigate } from "react-router"
import { menuRoutes } from "@menu/routes"
import { authRoutes } from "@auth/routes"
import { customerRoutes } from "@customer/routes"
import { staffRoutes } from "@staff/routes"
import ErrorBoundary from "@shared/components/ErrorBoundary/ErrorBoundary"

const AppRoutes = () => {
  return (
    <ErrorBoundary>
      <Routes>
        <Route path="/" element={<Navigate to="/menu" replace />} />
        {[...authRoutes, ...menuRoutes, ...customerRoutes].map((route) => (
          <Route key={route.path} path={route.path} element={route.element} />
        ))}
        {staffRoutes.map((route) => (
          <Route key={route.path} path={route.path} element={route.element}>
            {route.children?.map((child) =>
              child.index ? (
                <Route key="index" index element={child.element} />
              ) : (
                <Route key={child.path} path={child.path} element={child.element} />
              ),
            )}
          </Route>
        ))}
      </Routes>
    </ErrorBoundary>
  )
}

export default AppRoutes
