import { useState } from "react"
import { uploadMenuImage } from "@shared/utils/imageUpload"
import { useMenuCategories } from "@menu/hooks/useMenuCategories"
import styles from "./MenuFormModal.module.css"

interface MenuFormModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (data: { name: string; price: number; category_id?: number; image_url?: string }) => void
  isSubmitting: boolean
}

const MenuFormModal = ({ isOpen, onClose, onSubmit, isSubmitting }: MenuFormModalProps) => {
  const { data: categories = [] } = useMenuCategories()
  const [name, setName] = useState("")
  const [price, setPrice] = useState("")
  const [categoryId, setCategoryId] = useState<string>("")
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string>("")

  if (!isOpen) return null

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setImageFile(file)
      setImagePreview(URL.createObjectURL(file))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    let imageUrl: string | undefined
    
    if (imageFile) {
      try {
        imageUrl = await uploadMenuImage(imageFile, Date.now())
      } catch (error) {
        console.error("Failed to upload image:", error)
        alert("Failed to upload image. Please try again.")
        return
      }
    }

    onSubmit({
      name,
      price: Number(price),
      category_id: categoryId ? Number(categoryId) : undefined,
      image_url: imageUrl,
    })

    setName("")
    setPrice("")
    setCategoryId("")
    setImageFile(null)
    setImagePreview("")
  }

  const handleClose = () => {
    setName("")
    setPrice("")
    setCategoryId("")
    setImageFile(null)
    setImagePreview("")
    onClose()
  }

  return (
    <div className={styles.overlay} onClick={handleClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <h2 className={styles.title}>Add New Menu</h2>
          <button className={styles.closeButton} onClick={handleClose}>×</button>
        </div>
        
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.field}>
            <label className={styles.label}>Menu Name</label>
            <input
              className={styles.input}
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              placeholder="Enter menu name"
            />
          </div>
          
          <div className={styles.field}>
            <label className={styles.label}>Price</label>
            <input
              className={styles.input}
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
              placeholder="Enter price"
              min="0"
              step="0.01"
            />
          </div>
          
          <div className={styles.field}>
            <label className={styles.label}>Category (Optional)</label>
            <select
              className={styles.select}
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
            >
              <option value="">Select a category</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name || `Category ${category.id}`}
                </option>
              ))}
            </select>
          </div>
          
          <div className={styles.field}>
            <label className={styles.label}>Image</label>
            <input
              className={styles.fileInput}
              type="file"
              accept="image/*"
              onChange={handleImageChange}
            />
            {imagePreview && (
              <img className={styles.preview} src={imagePreview} alt="Preview" />
            )}
          </div>
          
          <div className={styles.actions}>
            <button type="button" className={styles.cancelButton} onClick={handleClose}>
              Cancel
            </button>
            <button type="submit" className={styles.submitButton} disabled={isSubmitting}>
              {isSubmitting ? "Adding..." : "Add Menu"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default MenuFormModal
