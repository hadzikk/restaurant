import type { CartItem } from "../../types/database.types"

export class CartDomain {
  private items: CartItem[]

  private constructor(items: CartItem[] = []) {
    this.items = items
  }

  static create(items: CartItem[] = []): CartDomain {
    return new CartDomain(items)
  }

  addItem(item: Omit<CartItem, "quantity">): void {
    const existing = this.items.find(i => i.menuId === item.menuId)
    if (existing) {
      existing.quantity += 1
    } else {
      this.items.push({ ...item, quantity: 1 })
    }
  }

  removeItem(menuId: number): void {
    this.items = this.items.filter(i => i.menuId !== menuId)
  }

  updateQuantity(menuId: number, quantity: number): void {
    if (quantity <= 0) {
      this.removeItem(menuId)
      return
    }
    const item = this.items.find(i => i.menuId === menuId)
    if (item) {
      item.quantity = quantity
    }
  }

  getTotalItems(): number {
    return this.items.reduce((sum, item) => sum + item.quantity, 0)
  }

  getTotalPrice(): number {
    return this.items.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  }

  isEmpty(): boolean {
    return this.items.length === 0
  }

  clear(): void {
    this.items = []
  }

  toDTO(): CartItem[] {
    return [...this.items]
  }
}
