import { createContext, useCallback, useContext, useMemo, useState } from "react"
import type { CartItem } from "@shared/types/database.types"
import { CART_CONSTANTS } from "@shared/constants/cart"

interface CartContextValue {
  isOpen: boolean
  items: CartItem[]
  openCart: () => void
  closeCart: () => void
  toggleCart: () => void
  addItem: (item: Omit<CartItem, "quantity">) => void
  removeItem: (menuId: string) => void
  updateQuantity: (menuId: string, quantity: number) => void
  totalItems: number
  totalPrice: number
}

const CartContext = createContext<CartContextValue | null>(null)

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [items, setItems] = useState<CartItem[]>([])

  const openCart = useCallback(() => setIsOpen(true), [])
  const closeCart = useCallback(() => setIsOpen(false), [])
  const toggleCart = useCallback(() => setIsOpen((prev) => !prev), [])

  const addItem = useCallback((item: Omit<CartItem, "quantity">) => {
    setItems((prev) => {
      const existing = prev.find((entry) => entry.menuId === item.menuId)
      if (existing) {
        return prev.map((entry) =>
          entry.menuId === item.menuId
            ? { ...entry, quantity: entry.quantity + 1 }
            : entry,
        )
      }
      return [...prev, { ...item, quantity: 1 }]
    })
    setIsOpen(true)
  }, [])

  const removeItem = useCallback((menuId: string) => {
    setItems((prev) => prev.filter((entry) => entry.menuId !== menuId))
  }, [])

  const updateQuantity = useCallback((menuId: string, quantity: number) => {
    if (quantity <= CART_CONSTANTS.MIN_QUANTITY) {
      setItems((prev) => prev.filter((entry) => entry.menuId !== menuId))
      return
    }
    setItems((prev) =>
      prev.map((entry) =>
        entry.menuId === menuId ? { ...entry, quantity } : entry,
      ),
    )
  }, [])

  const totalItems = useMemo(
    () => items.reduce((sum, item) => sum + item.quantity, 0),
    [items],
  )

  const totalPrice = useMemo(
    () => items.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [items],
  )

  const value = useMemo(
    () => ({
      isOpen,
      items,
      openCart,
      closeCart,
      toggleCart,
      addItem,
      removeItem,
      updateQuantity,
      totalItems,
      totalPrice,
    }),
    [
      isOpen,
      items,
      openCart,
      closeCart,
      toggleCart,
      addItem,
      removeItem,
      updateQuantity,
      totalItems,
      totalPrice,
    ],
  )

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export const useCart = () => {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error("useCart must be used within CartProvider")
  }
  return context
}
