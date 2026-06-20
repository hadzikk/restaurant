import { elipsisOnMiddle } from "@utils/elipsis"
import styles from "./MenuCard.module.css"

const MenuCard = ({ menu }) => {
    return <div className={styles.root}>
        <img
            className={styles.picture} 
            src={menu.menu_images[0]?.image_url} 
            alt=""
            loading="lazy" 
        />
        <div className={styles.description}>
            <p className={styles.name}>{elipsisOnMiddle(menu.name, 7, 10)}</p>
            <p className={styles.price}>{menu.price}</p>
            <button className={styles.buy}>buy</button>
        </div>
    </div>
}

export default MenuCard