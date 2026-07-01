import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons"
import { useCart } from "@shared/context/CartContext"
import { toRupiah } from "@utils/currency"
import styles from "./Cart.module.css"

const Cart = () => {
  const {
    isOpen,
    closeCart,
    items,
    removeItem,
    updateQuantity,
    totalPrice,
  } = useCart()

  return (
    <div
      className={`${styles.root} ${isOpen ? styles.open : ""}`}
      onClick={closeCart}
      role="presentation"
    >
      <aside
        className={styles.panel}
        onClick={(event) => event.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label="Shopping cart"
      >
        <div className={styles.header}>
          <h2 className={styles.title}>Cart</h2>
          <button type="button" className={styles.close} onClick={closeCart}>
            Close
          </button>
        </div>

        <div className={styles.content}>
          {items.length === 0 ? (
            <p className={styles.empty}>Your cart is empty</p>
          ) : (
            <ul className={styles.list}>
              {items.map((item) => (
                <li key={item.menuId} className={styles.item}>
                  <div className={styles.info}>
                    <p className={styles.name}>{item.name}</p>
                    <p className={styles.price}>{toRupiah(item.price)}</p>
                    <button
                      type="button"
                      className={styles.remove}
                      onClick={() => removeItem(item.menuId)}
                    >
                      Remove
                    </button>
                  </div>
                  <div className={styles.controls}>
                    <div className={styles.quantity}>
                      <button
                        type="button"
                        className={styles.quantityButton}
                        onClick={() =>
                          updateQuantity(item.menuId, item.quantity - 1)
                        }
                      >
                        <FontAwesomeIcon icon={faMinus} />
                      </button>
                      <span className={styles.quantityValue}>{item.quantity}</span>
                      <button
                        type="button"
                        className={styles.quantityButton}
                        onClick={() =>
                          updateQuantity(item.menuId, item.quantity + 1)
                        }
                      >
                        <FontAwesomeIcon icon={faPlus} />
                      </button>
                    </div>
                    <p className={styles.subtotal}>
                      {toRupiah(item.price * item.quantity)}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {items.length > 0 && (
          <div className={styles.footer}>
            <div className={styles.total}>
              <span>Total</span>
              <span>{toRupiah(totalPrice)}</span>
            </div>
            <button type="button" className={styles.pay}>
              Pay
            </button>
          </div>
        )}
      </aside>
    </div>
  )
}

export default Cart
