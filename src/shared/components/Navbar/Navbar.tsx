import { useState } from "react"
import { NavLink, useLocation, useNavigate } from "react-router"
import { useCurrentUser, useLogout, useProfile } from "@auth/hooks/useAuth"
import { canAccessStaffArea, getRoleLabel } from "@shared/constants/roles"
import { useCart } from "@shared/context/CartContext"
import styles from "./Navbar.module.css"

const Navbar = () => {
  const { data: user } = useCurrentUser()
  const { data: profile } = useProfile()
  const { mutate: logout } = useLogout()
  const { toggleCart, totalItems } = useCart()
  const navigate = useNavigate()
  const location = useLocation()
  const [isOpen, setIsOpen] = useState(false)
  const isStaffArea = location.pathname.startsWith("/staff")

  const initials = (profile?.full_name || user?.email || "?")
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase()

  const handleLogout = () => {
    logout(undefined, {
      onSuccess: () => navigate("/login"),
    })
  }

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `${styles.link} ${isActive ? styles.linkActive : ""}`

  return (
    <header className={styles.root}>
      <NavLink to="/menu" className={styles.brand}>
        Restaurant
      </NavLink>

      <nav className={styles.nav}>
        <NavLink to="/menu" className={navLinkClass}>
          Menu
        </NavLink>
        <NavLink to="/floor-plan" className={navLinkClass}>
          Floor Plan
        </NavLink>
        {canAccessStaffArea(profile?.role_id) && (
          <NavLink to="/staff" className={navLinkClass}>
            Staff
          </NavLink>
        )}
      </nav>

      <div className={styles.actions}>
        {!isStaffArea && (
          <button type="button" className={styles.cartButton} onClick={toggleCart}>
            Cart
            {totalItems > 0 && <span className={styles.badge}>{totalItems}</span>}
          </button>
        )}

        <div className={styles.profile}>
          <button
            type="button"
            className={styles.profileButton}
            onClick={() => setIsOpen((prev) => !prev)}
          >
            <span className={styles.avatar}>{initials}</span>
            <span>{profile?.full_name || user?.email}</span>
          </button>

          {isOpen && (
            <div className={styles.dropdown}>
              <p className={styles.dropdownName}>
                {profile?.full_name || user?.email}
              </p>
              <p className={styles.dropdownRole}>
                {profile?.roles?.name ?? getRoleLabel(profile?.role_id)}
              </p>
              <button
                type="button"
                className={styles.dropdownAction}
                onClick={handleLogout}
              >
                Sign out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}

export default Navbar
