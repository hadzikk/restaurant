import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons"
import styles from "./Cart.module.css"

const Cart = () => {
    return <div className={styles.root}>
        <div className={styles.cart}>
            <div className={styles.content}>
                <p className={styles.title}>cart</p>

                <p className={styles.subtitle}>tables</p>

                <p className={styles.subtitle}>menus</p>

                {/* Ordered menu list */}
                <ul>
                    <li className={styles.order}>
                        <div className={styles.menu}>
                            <p className={styles.name}>Crombolini</p>
                            <p className={styles.price}>Rp. 50.000</p>
                            <button className={styles.remove}>remove</button>
                        </div>

                        <div className={styles.update}>
                            <div>
                                <button className={styles.edit}>
                                    <FontAwesomeIcon icon={faMinus} />
                                </button>
                                <span className={styles.quantity}>10</span>
                                <button className={styles.edit}>
                                    <FontAwesomeIcon icon={faPlus} />
                                </button>
                            </div>
                            <p className={styles.subtotal}>Rp. 500.000</p>
                        </div>
                    </li>
                </ul>
                
                <p className={styles.subtitle}>total</p>
            </div>

            <div className={styles.controls}>
                <button className={styles.control}>close</button>
                <button className={styles.control}>pay</button>
            </div>
        </div>
    </div>
}

export default Cart