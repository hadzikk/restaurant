import { useState } from "react"
import { useFloors, useFloorTables } from "../../hooks/useFloorPlan"
import TableSidebar from "../TableSidebar/TableSidebar"
import type { RestaurantTable } from "@shared/types/database.types"
import styles from "./FloorPlanPage.module.css"

const FloorPlanPage = () => {
  const { data: floors = [], isLoading, error } = useFloors()
  const [activeFloorId, setActiveFloorId] = useState<string | null>(null)
  const [selectedTable, setSelectedTable] = useState<RestaurantTable | null>(null)

  const currentFloorId = activeFloorId ?? floors[0]?.id ?? null
  const { data: tables = [], isLoading: tablesLoading } = useFloorTables(currentFloorId)
  const activeFloor = floors.find((floor) => floor.id === currentFloorId)

  const handleSelectFloor = (floorId: string) => {
    setActiveFloorId(floorId)
    setSelectedTable(null)
  }

  return (
    <section className={styles.root}>
      <div className={styles.main}>
        <header className={styles.header}>
          <h1 className={styles.title}>Floor Plan</h1>
          <p className={styles.subtitle}>
            {activeFloor ? activeFloor.name : "Select a floor to view tables"}
          </p>
          {floors.length > 0 && (
            <div className={styles.tabs}>
              {floors.map((floor) => (
                <button
                  key={floor.id}
                  type="button"
                  className={`${styles.tab} ${floor.id === currentFloorId ? styles.tabActive : ""}`}
                  onClick={() => handleSelectFloor(floor.id)}
                >
                  {floor.name}
                </button>
              ))}
            </div>
          )}
        </header>

        <div className={styles.canvasWrapper}>
          {isLoading && <p className={styles.state}>Loading floors...</p>}
          {error && <p className={styles.state}>{error.message}</p>}
          {!isLoading && !error && floors.length === 0 && (
            <p className={styles.state}>No floor plans available yet</p>
          )}
          {tablesLoading && currentFloorId && (
            <p className={styles.state}>Loading tables...</p>
          )}
          {activeFloor && !tablesLoading && (
            <div
              className={styles.canvas}
              style={{
                width: activeFloor.width,
                height: activeFloor.height,
                minWidth: activeFloor.width,
                minHeight: activeFloor.height,
              }}
            >
              {tables.map((table) => (
                <button
                  key={table.id}
                  type="button"
                  className={[
                    styles.table,
                    table.shape === "circle" ? styles.tableCircle : styles.tableRectangle,
                    selectedTable?.id === table.id ? styles.tableSelected : "",
                    table.status === "occupied" ? styles.statusOccupied : "",
                    table.status === "reserved" ? styles.statusReserved : "",
                  ].join(" ")}
                  style={{
                    left: table.position_x,
                    top: table.position_y,
                    width: table.width,
                    height: table.height,
                  }}
                  onClick={() => setSelectedTable(table)}
                >
                  {table.name}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <TableSidebar table={selectedTable} onClose={() => setSelectedTable(null)} />
    </section>
  )
}

export default FloorPlanPage
