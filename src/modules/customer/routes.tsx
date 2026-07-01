import ProtectedRoute from "@shared/components/ProtectedRoute/ProtectedRoute"
import AppLayout from "@shared/components/AppLayout/AppLayout"
import FloorPlanPage from "./components/FloorPlanPage/FloorPlanPage"

export const customerRoutes = [
  {
    path: "/floor-plan",
    element: (
      <ProtectedRoute>
        <AppLayout>
          <FloorPlanPage />
        </AppLayout>
      </ProtectedRoute>
    ),
  },
]
