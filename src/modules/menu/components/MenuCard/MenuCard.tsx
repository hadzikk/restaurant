import { elipsisOnMiddle } from "@utils/elipsis"
import { toRupiah } from "@utils/currency"
import { useCart } from "@shared/context/CartContext"
import type { Menu } from "@shared/types/database.types"
import styles from "./MenuCard.module.css"

interface MenuCardProps {
  menu: Menu
}

const MenuCard = ({ menu }: MenuCardProps) => {
  const { addItem } = useCart()

  const handleBuy = () => {
    addItem({
      menuId: menu.id,
      name: menu.name,
      price: menu.price,
    })
  }

  return (
    <article className={styles.root}>
      <img
        className={styles.picture}
        src={menu.menu_images[0]?.image_url}
        alt={menu.name}
        loading="lazy"
      />
      <div className={styles.body}>
        <p className={styles.name}>{elipsisOnMiddle(menu.name, 7, 10)}</p>
        {menu.description && (
          <p className={styles.description}>{menu.description}</p>
        )}
        <p className={styles.price}>{toRupiah(menu.price)}</p>
        <button type="button" className={styles.buy} onClick={handleBuy}>
          Add to cart
        </button>
      </div>
    </article>
  )
}

export default MenuCard
