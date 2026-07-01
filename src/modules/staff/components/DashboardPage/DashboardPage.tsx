import { useMenus } from "@menu/hooks/useMenu"
import { useStaffFloors } from "../../hooks/useStaffFloors"
import { useStaffTables } from "../../hooks/useStaffTables"
import styles from "./DashboardPage.module.css"

const DashboardPage = () => {
  const { data: menus = [] } = useMenus()
  const { data: floors = [] } = useStaffFloors()
  const { data: tables = [] } = useStaffTables()

  const stats = [
    { label: "Menu items", value: menus.length },
    { label: "Floors", value: floors.length },
    { label: "Tables", value: tables.length },
  ]

  return (
    <section className={styles.root}>
      <h1 className={styles.title}>Overview</h1>
      <p className={styles.subtitle}>Manage restaurant content from one place</p>
      <div className={styles.grid}>
        {stats.map((stat) => (
          <article key={stat.label} className={styles.card}>
            <p className={styles.cardLabel}>{stat.label}</p>
            <p className={styles.cardValue}>{stat.value}</p>
          </article>
        ))}
      </div>
    </section>
  )
}

export default DashboardPage
