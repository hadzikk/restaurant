import type { Menu } from "../../types/database.types"

export class MenuDomain {
  private menu: Menu

  private constructor(menu: Menu) {
    this.menu = menu
  }

  static create(menu: Menu): MenuDomain {
    return new MenuDomain(menu)
  }

  hasImage(): boolean {
    return this.menu.menu_images && this.menu.menu_images.length > 0
  }

  getPrimaryImage(): string | null {
    if (!this.hasImage()) return null
    return this.menu.menu_images![0].image_url
  }

  updatePrice(price: number): void {
    if (price < 0) {
      throw new Error("Price cannot be negative")
    }
    this.menu.price = price
  }

  isValid(): boolean {
    return (
      this.menu.name !== null &&
      this.menu.name.trim().length > 0 &&
      this.menu.price !== null &&
      this.menu.price >= 0
    )
  }

  toDTO(): Menu {
    return { ...this.menu }
  }
}
