import { useMenus } from "../../hooks/useMenu"
import MenuCard from "../MenuCard/MenuCard"
import styles from "./MenuPage.module.css"

const MenuPage = () => {
  const { data: menus = [], isLoading, error } = useMenus()

  return (
    <section className={styles.root}>
      <header className={styles.header}>
        <h1 className={styles.title}>Menu</h1>
        <p className={styles.subtitle}>Browse and add items to your cart</p>
      </header>

      {isLoading && <p className={styles.state}>Loading menu...</p>}
      {error && <p className={styles.state}>{error.message}</p>}
      {!isLoading && !error && menus.length === 0 && (
        <p className={styles.state}>No menu items available</p>
      )}

      <div className={styles.menu}>
        {menus.map((menu) => (
          <MenuCard key={menu.id} menu={menu} />
        ))}
      </div>
    </section>
  )
}

export default MenuPage
