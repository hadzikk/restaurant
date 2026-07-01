import { Navigate } from "react-router"
import { useCurrentUser, useProfile } from "@auth/hooks/useAuth"
import { canAccessStaffArea } from "@shared/constants/roles"
import LoadingPage from "@shared/components/LoadingPage/LoadingPage"

interface StaffRouteProps {
  children: React.ReactNode
}

const StaffRoute = ({ children }: StaffRouteProps) => {
  const { data: user, isLoading: userLoading } = useCurrentUser()
  const { data: profile, isLoading: profileLoading } = useProfile()

  if (userLoading || profileLoading) return <LoadingPage />
  if (!user) return <Navigate to="/login" replace />
  if (!canAccessStaffArea(profile?.role_id)) return <Navigate to="/menu" replace />

  return children
}

export default StaffRoute
