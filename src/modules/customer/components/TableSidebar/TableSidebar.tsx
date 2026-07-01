import type { RestaurantTable } from "@shared/types/database.types"
import styles from "./TableSidebar.module.css"

interface TableSidebarProps {
  table: RestaurantTable | null
  onClose: () => void
}

const statusClassMap = {
  available: styles.statusAvailable,
  occupied: styles.statusOccupied,
  reserved: styles.statusReserved,
}

const TableSidebar = ({ table, onClose }: TableSidebarProps) => {
  return (
    <aside className={styles.sidebar}>
      {!table ? (
        <p className={styles.empty}>Select a table to view details</p>
      ) : (
        <>
          <h2 className={styles.title}>{table.name}</h2>
          <p className={styles.subtitle}>Table information</p>
          <div className={styles.detail}>
            <div className={styles.row}>
              <span className={styles.label}>Capacity</span>
              <span className={styles.value}>{table.capacity} seats</span>
            </div>
            <div className={styles.row}>
              <span className={styles.label}>Status</span>
              <span className={`${styles.value} ${statusClassMap[table.status]}`}>
                {table.status}
              </span>
            </div>
            <div className={styles.row}>
              <span className={styles.label}>Shape</span>
              <span className={styles.value}>{table.shape}</span>
            </div>
            <div className={styles.row}>
              <span className={styles.label}>Position</span>
              <span className={styles.value}>
                {table.position_x}, {table.position_y}
              </span>
            </div>
          </div>
          <button type="button" className={styles.close} onClick={onClose}>
            Close
          </button>
        </>
      )}
    </aside>
  )
}

export default TableSidebar
