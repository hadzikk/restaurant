import { NavLink, Outlet } from "react-router"
import Navbar from "@shared/components/Navbar/Navbar"
import styles from "./StaffLayout.module.css"

const StaffLayout = () => {
  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `${styles.link} ${isActive ? styles.linkActive : ""}`

  return (
    <div className={styles.root}>
      <Navbar />
      <div className={styles.body}>
        <aside className={styles.sidebar}>
          <p className={styles.sidebarTitle}>Staff Dashboard</p>
          <nav className={styles.nav}>
            <NavLink to="/staff" end className={linkClass}>
              Overview
            </NavLink>
            <NavLink to="/staff/menus" className={linkClass}>
              Menus
            </NavLink>
            <NavLink to="/staff/tables" className={linkClass}>
              Tables
            </NavLink>
            <NavLink to="/staff/floors" className={linkClass}>
              Floor Plans
            </NavLink>
          </nav>
        </aside>
        <main className={styles.main}>
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default StaffLayout
