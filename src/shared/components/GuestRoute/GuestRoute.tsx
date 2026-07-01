import { Navigate } from "react-router"
import { ROLE } from "@shared/constants/roles"
import { useProfile } from "@auth/hooks/useAuth"
import LoadingPage from "@shared/components/LoadingPage/LoadingPage"

interface GuestRouteProps {
  children: React.ReactNode
}

const GuestRoute = ({ children }: GuestRouteProps) => {
  const { data: profile, isLoading } = useProfile()

  if (isLoading) return <LoadingPage />
  if (profile) {
    if (profile.role_id === ROLE.STAFF) return <Navigate to="/staff" replace />
    return <Navigate to="/menu" replace />
  }

  return children
}

export default GuestRoute
