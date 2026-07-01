import ProtectedRoute from "@shared/components/ProtectedRoute/ProtectedRoute"
import AppLayout from "@shared/components/AppLayout/AppLayout"
import MenuPage from "./components/MenuPage/MenuPage"

export const menuRoutes = [
  {
    path: "/menu",
    element: (
      <ProtectedRoute>
        <AppLayout>
          <MenuPage />
        </AppLayout>
      </ProtectedRoute>
    ),
  },
]
