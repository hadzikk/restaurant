import { useState } from "react"
import {
  useCreateMenu,
  useDeleteMenu,
  useMenus,
  useUpdateMenu,
} from "@menu/hooks/useMenu"
import { toRupiah } from "@utils/currency"
import MenuFormModal from "./MenuFormModal"
import MenuCard from "@menu/components/MenuCard/MenuCard"
import styles from "./MenuManagePage.module.css"

const MenuManagePage = () => {
  const { data: menus = [], isLoading, error } = useMenus()
  const { mutate: createMenu, isPending: isCreating } = useCreateMenu()
  const { mutate: updateMenu } = useUpdateMenu()
  const { mutate: deleteMenu } = useDeleteMenu()

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [editingName, setEditingName] = useState("")
  const [editingPrice, setEditingPrice] = useState("")
  const [previewMenu, setPreviewMenu] = useState<any | null>(null)

  const handleCreate = (data: { name: string; price: number; category_id?: number; image_url?: string }) => {
    createMenu(data, {
      onSuccess: () => {
        setIsModalOpen(false)
      },
    })
  }

  const handleInlineEdit = (id: number, field: 'name' | 'price', value: string) => {
    if (field === 'name') {
      setEditingName(value)
    } else {
      setEditingPrice(value)
    }
  }

  const handleInlineSave = (id: number) => {
    const payload: any = {}
    if (editingName) payload.name = editingName
    if (editingPrice) payload.price = Number(editingPrice)
    
    if (Object.keys(payload).length > 0) {
      updateMenu({ id: id.toString(), payload })
    }
    
    setEditingId(null)
    setEditingName("")
    setEditingPrice("")
  }

  const handleInlineCancel = () => {
    setEditingId(null)
    setEditingName("")
    setEditingPrice("")
  }

  return (
    <section className={styles.root}>
      <header className={styles.header}>
        <h1 className={styles.title}>Menu Management</h1>
        <p className={styles.subtitle}>Create and update menu items</p>
        <button className={styles.addButton} onClick={() => setIsModalOpen(true)}>
          + Add New Menu
        </button>
      </header>

      {isLoading && <p className={styles.state}>Loading menus...</p>}
      {error && <p className={styles.state}>{error.message}</p>}

      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th className={styles.th}>Name</th>
              <th className={styles.th}>Price</th>
              <th className={styles.th}>Category</th>
              <th className={styles.th}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {menus.map((menu) => (
              <tr key={menu.id} className={styles.tr}>
                <td className={styles.td}>
                  {editingId === menu.id ? (
                    <input
                      className={styles.inlineInput}
                      value={editingName || menu.name}
                      onChange={(e) => handleInlineEdit(menu.id, 'name', e.target.value)}
                      autoFocus
                    />
                  ) : (
                    <span className={styles.name}>{menu.name}</span>
                  )}
                </td>
                <td className={styles.td}>
                  {editingId === menu.id ? (
                    <input
                      className={styles.inlineInput}
                      type="number"
                      value={editingPrice || menu.price}
                      onChange={(e) => handleInlineEdit(menu.id, 'price', e.target.value)}
                    />
                  ) : (
                    <span className={styles.price}>{toRupiah(menu.price)}</span>
                  )}
                </td>
                <td className={styles.td}>
                  <span className={styles.category}>{menu.menu_categories?.name || "-"}</span>
                </td>
                <td className={styles.td}>
                  <div className={styles.actions}>
                    {editingId === menu.id ? (
                      <>
                        <button
                          className={styles.action}
                          onClick={() => handleInlineSave(menu.id)}
                        >
                          Save
                        </button>
                        <button
                          className={`${styles.action} ${styles.actionDanger}`}
                          onClick={handleInlineCancel}
                        >
                          Cancel
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          className={styles.action}
                          onClick={() => {
                            setEditingId(menu.id)
                            setEditingName(menu.name)
                            setEditingPrice(menu.price.toString())
                          }}
                        >
                          Edit
                        </button>
                        <button
                          className={`${styles.action} ${styles.actionPreview}`}
                          onClick={() => setPreviewMenu(menu)}
                        >
                          Preview
                        </button>
                        <button
                          className={`${styles.action} ${styles.actionDanger}`}
                          onClick={() => {
                            if (window.confirm(`Delete ${menu.name}?`)) {
                              deleteMenu(menu.id)
                            }
                          }}
                        >
                          Delete
                        </button>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <MenuFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleCreate}
        isSubmitting={isCreating}
      />

      {previewMenu && (
        <div className={styles.previewOverlay} onClick={() => setPreviewMenu(null)}>
          <div className={styles.previewModal} onClick={(e) => e.stopPropagation()}>
            <div className={styles.previewHeader}>
              <h3 className={styles.previewTitle}>Menu Preview</h3>
              <button className={styles.closeButton} onClick={() => setPreviewMenu(null)}>×</button>
            </div>
            <div className={styles.previewContent}>
              <MenuCard menu={previewMenu} />
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

export default MenuManagePage
