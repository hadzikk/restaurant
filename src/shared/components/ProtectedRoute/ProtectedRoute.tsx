import { Navigate } from "react-router"
import { ROLE } from "@shared/constants/roles"
import { useProfile } from "@auth/hooks/useAuth"
import LoadingPage from "@shared/components/LoadingPage/LoadingPage"

interface ProtectedRouteProps {
  children: React.ReactNode
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { data: profile, isLoading } = useProfile()

  if (isLoading) return <LoadingPage />
  if (!profile) return <Navigate to="/login" replace />
  if (profile.role_id === ROLE.STAFF) return <Navigate to="/staff" replace />

  return children
}

export default ProtectedRoute
