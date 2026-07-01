import StaffRoute from "@shared/components/StaffRoute/StaffRoute"
import StaffLayout from "./components/StaffLayout/StaffLayout"
import DashboardPage from "./components/DashboardPage/DashboardPage"
import MenuManagePage from "./components/MenuManagePage/MenuManagePage"
import TableManagePage from "./components/TableManagePage/TableManagePage"
import FloorManagePage from "./components/FloorManagePage/FloorManagePage"

export const staffRoutes = [
  {
    path: "/staff",
    element: (
      <StaffRoute>
        <StaffLayout />
      </StaffRoute>
    ),
    children: [
      { index: true, element: <DashboardPage /> },
      { path: "menus", element: <MenuManagePage /> },
      { path: "tables", element: <TableManagePage /> },
      { path: "floors", element: <FloorManagePage /> },
    ],
  },
]
