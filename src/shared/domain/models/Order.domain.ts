import type { Order, OrderMenuLine, OrderTableLine } from "../../types/database.types"

export class OrderDomain {
  private order: Order
  private menuLines: OrderMenuLine[]
  private tableLines: OrderTableLine[]

  private constructor(
    order: Order,
    menuLines: OrderMenuLine[] = [],
    tableLines: OrderTableLine[] = [],
  ) {
    this.order = order
    this.menuLines = menuLines
    this.tableLines = tableLines
  }

  static create(order: Order): OrderDomain {
    return new OrderDomain(order, order.order_menu_lines || [], order.order_table_lines || [])
  }

  getTotal(): number {
    const menuTotal = this.menuLines.reduce((sum, line) => sum + (line.snapshot_price * line.quantity), 0)
    return menuTotal
  }

  addMenuLine(menuLine: OrderMenuLine): void {
    this.menuLines.push(menuLine)
    this.updateTotal()
  }

  removeMenuLine(menuLineId: number): void {
    this.menuLines = this.menuLines.filter(line => line.id !== menuLineId)
    this.updateTotal()
  }

  updateMenuLineQuantity(menuLineId: number, quantity: number): void {
    const line = this.menuLines.find(l => l.id === menuLineId)
    if (line) {
      line.quantity = quantity
      this.updateTotal()
    }
  }

  addTableLine(tableLine: OrderTableLine): void {
    this.tableLines.push(tableLine)
  }

  removeTableLine(tableLineId: number): void {
    this.tableLines = this.tableLines.filter(line => line.id !== tableLineId)
  }

  canBeCompleted(): boolean {
    return this.menuLines.length > 0 && this.getTotal() > 0
  }

  hasReservation(): boolean {
    return this.tableLines.length > 0
  }

  private updateTotal(): void {
    this.order.total = this.getTotal()
  }

  toDTO(): Order {
    return {
      ...this.order,
      order_menu_lines: this.menuLines,
      order_table_lines: this.tableLines,
    }
  }
}
