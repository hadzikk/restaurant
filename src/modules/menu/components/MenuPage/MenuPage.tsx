import useMenu  from "../../hooks/useMenu"
import MenuCard from "../MenuCard/MenuCard"
import styles from "./MenuPage.module.css"

const MenuPage = () => {
    const { menus } = useMenu()

    return (
        <section className={styles.root}>
            <div className={styles.menu}>
                {menus.map((menu) => (
                    <MenuCard 
                        key={menu.id}
                        menu={menu}
                    />
                ))}
            </div>
        </section>
    )
}

export default MenuPage