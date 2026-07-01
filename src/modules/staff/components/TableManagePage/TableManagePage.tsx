import { useState } from "react"
import { useStaffFloors } from "../../hooks/useStaffFloors"
import {
  useCreateTable,
  useDeleteTable,
  useStaffTables,
  useUpdateTable,
} from "../../hooks/useStaffTables"
import type { TableShape, TableStatus } from "@shared/types/database.types"
import styles from "./TableManagePage.module.css"

const TableManagePage = () => {
  const { data: floors = [] } = useStaffFloors()
  const { data: tables = [], isLoading, error } = useStaffTables()
  const { mutate: createTable, isPending } = useCreateTable()
  const { mutate: updateTable } = useUpdateTable()
  const { mutate: deleteTable } = useDeleteTable()

  const [form, setForm] = useState({
    floor_id: "",
    name: "",
    capacity: "4",
    status: "available" as TableStatus,
    position_x: "40",
    position_y: "40",
    width: "80",
    height: "80",
    shape: "rectangle" as TableShape,
  })

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    createTable(
      {
        floor_id: form.floor_id,
        name: form.name,
        capacity: Number(form.capacity),
        status: form.status,
        position_x: Number(form.position_x),
        position_y: Number(form.position_y),
        width: Number(form.width),
        height: Number(form.height),
        shape: form.shape,
      },
      {
        onSuccess: () =>
          setForm((prev) => ({ ...prev, name: "", capacity: "4" })),
      },
    )
  }

  return (
    <section className={styles.root}>
      <header className={styles.header}>
        <h1 className={styles.title}>Table Management</h1>
        <p className={styles.subtitle}>Configure tables on each floor</p>
      </header>

      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.field}>
          <label className={styles.label}>Floor</label>
          <select
            className={styles.select}
            value={form.floor_id}
            onChange={(event) =>
              setForm((prev) => ({ ...prev, floor_id: event.target.value }))
            }
            required
          >
            <option value="">Select floor</option>
            {floors.map((floor) => (
              <option key={floor.id} value={floor.id}>
                {floor.name}
              </option>
            ))}
          </select>
        </div>
        <div className={styles.field}>
          <label className={styles.label}>Name</label>
          <input
            className={styles.input}
            value={form.name}
            onChange={(event) =>
              setForm((prev) => ({ ...prev, name: event.target.value }))
            }
            required
          />
        </div>
        <div className={styles.field}>
          <label className={styles.label}>Capacity</label>
          <input
            className={styles.input}
            type="number"
            value={form.capacity}
            onChange={(event) =>
              setForm((prev) => ({ ...prev, capacity: event.target.value }))
            }
            required
          />
        </div>
        <div className={styles.field}>
          <label className={styles.label}>Status</label>
          <select
            className={styles.select}
            value={form.status}
            onChange={(event) =>
              setForm((prev) => ({
                ...prev,
                status: event.target.value as TableStatus,
              }))
            }
          >
            <option value="available">Available</option>
            <option value="occupied">Occupied</option>
            <option value="reserved">Reserved</option>
          </select>
        </div>
        <div className={styles.field}>
          <label className={styles.label}>Shape</label>
          <select
            className={styles.select}
            value={form.shape}
            onChange={(event) =>
              setForm((prev) => ({
                ...prev,
                shape: event.target.value as TableShape,
              }))
            }
          >
            <option value="rectangle">Rectangle</option>
            <option value="circle">Circle</option>
          </select>
        </div>
        <div className={styles.field}>
          <label className={styles.label}>X</label>
          <input
            className={styles.input}
            type="number"
            value={form.position_x}
            onChange={(event) =>
              setForm((prev) => ({ ...prev, position_x: event.target.value }))
            }
          />
        </div>
        <div className={styles.field}>
          <label className={styles.label}>Y</label>
          <input
            className={styles.input}
            type="number"
            value={form.position_y}
            onChange={(event) =>
              setForm((prev) => ({ ...prev, position_y: event.target.value }))
            }
          />
        </div>
        <div className={styles.field}>
          <label className={styles.label}>Width</label>
          <input
            className={styles.input}
            type="number"
            value={form.width}
            onChange={(event) =>
              setForm((prev) => ({ ...prev, width: event.target.value }))
            }
          />
        </div>
        <div className={styles.field}>
          <label className={styles.label}>Height</label>
          <input
            className={styles.input}
            type="number"
            value={form.height}
            onChange={(event) =>
              setForm((prev) => ({ ...prev, height: event.target.value }))
            }
          />
        </div>
        <button type="submit" className={styles.submit} disabled={isPending}>
          {isPending ? "Adding..." : "Add table"}
        </button>
      </form>

      {isLoading && <p className={styles.state}>Loading tables...</p>}
      {error && <p className={styles.state}>{error.message}</p>}

      <div className={styles.list}>
        {tables.map((table) => (
          <article key={table.id} className={styles.item}>
            <div>
              <p className={styles.itemName}>{table.name}</p>
              <p className={styles.itemMeta}>
                {table.capacity} seats · {table.status} · {table.shape}
              </p>
            </div>
            <div className={styles.actions}>
              <button
                type="button"
                className={styles.action}
                onClick={() =>
                  updateTable({
                    id: table.id,
                    payload: {
                      status:
                        table.status === "available" ? "occupied" : "available",
                    },
                  })
                }
              >
                Toggle status
              </button>
              <button
                type="button"
                className={styles.action}
                onClick={() => {
                  if (window.confirm(`Delete ${table.name}?`)) {
                    deleteTable(table.id)
                  }
                }}
              >
                Delete
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

export default TableManagePage
