import { useState } from "react"
import {
  useCreateFloor,
  useDeleteFloor,
  useStaffFloors,
  useUpdateFloor,
} from "../../hooks/useStaffFloors"
import styles from "./FloorManagePage.module.css"

const FloorManagePage = () => {
  const { data: floors = [], isLoading, error } = useStaffFloors()
  const { mutate: createFloor, isPending } = useCreateFloor()
  const { mutate: updateFloor } = useUpdateFloor()
  const { mutate: deleteFloor } = useDeleteFloor()

  const [name, setName] = useState("")
  const [width, setWidth] = useState("800")
  const [height, setHeight] = useState("600")

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    createFloor(
      { name, width: Number(width), height: Number(height) },
      {
        onSuccess: () => {
          setName("")
          setWidth("800")
          setHeight("600")
        },
      },
    )
  }

  return (
    <section className={styles.root}>
      <header className={styles.header}>
        <h1 className={styles.title}>Floor Plan Management</h1>
        <p className={styles.subtitle}>Create and configure restaurant floors</p>
      </header>

      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.field}>
          <label className={styles.label}>Name</label>
          <input
            className={styles.input}
            value={name}
            onChange={(event) => setName(event.target.value)}
            required
          />
        </div>
        <div className={styles.field}>
          <label className={styles.label}>Width</label>
          <input
            className={styles.input}
            type="number"
            value={width}
            onChange={(event) => setWidth(event.target.value)}
            required
          />
        </div>
        <div className={styles.field}>
          <label className={styles.label}>Height</label>
          <input
            className={styles.input}
            type="number"
            value={height}
            onChange={(event) => setHeight(event.target.value)}
            required
          />
        </div>
        <button type="submit" className={styles.submit} disabled={isPending}>
          {isPending ? "Adding..." : "Add floor"}
        </button>
      </form>

      {isLoading && <p className={styles.state}>Loading floors...</p>}
      {error && <p className={styles.state}>{error.message}</p>}

      <div className={styles.list}>
        {floors.map((floor) => (
          <article key={floor.id} className={styles.item}>
            <div>
              <p className={styles.itemName}>{floor.name}</p>
              <p className={styles.itemMeta}>
                {floor.width} × {floor.height}px
              </p>
            </div>
            <div className={styles.actions}>
              <button
                type="button"
                className={styles.action}
                onClick={() => {
                  const nextName = window.prompt("Floor name", floor.name)
                  if (!nextName) return
                  updateFloor({ id: floor.id, payload: { name: nextName } })
                }}
              >
                Edit
              </button>
              <button
                type="button"
                className={styles.action}
                onClick={() => {
                  if (window.confirm(`Delete ${floor.name}?`)) {
                    deleteFloor(floor.id)
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

export default FloorManagePage
