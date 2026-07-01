import type { RestaurantTable } from "../../types/database.types"

export class TableDomain {
  private table: RestaurantTable

  private constructor(table: RestaurantTable) {
    this.table = table
  }

  static create(table: RestaurantTable): TableDomain {
    return new TableDomain(table)
  }

  isAvailable(): boolean {
    return this.table.status === "available"
  }

  isOccupied(): boolean {
    return this.table.status === "occupied"
  }

  isReserved(): boolean {
    return this.table.status === "reserved"
  }

  canBeReserved(): boolean {
    return this.isAvailable()
  }

  markAsAvailable(): void {
    this.table.status = "available"
  }

  markAsOccupied(): void {
    this.table.status = "occupied"
  }

  markAsReserved(): void {
    this.table.status = "reserved"
  }

  updatePosition(x: number, y: number): void {
    this.table.position_x = x
    this.table.position_y = y
  }

  updateDimensions(width: number, height: number): void {
    this.table.width = width
    this.table.height = height
  }

  updateCapacity(capacity: number): void {
    if (capacity <= 0) {
      throw new Error("Capacity must be greater than 0")
    }
    this.table.capacity = capacity
  }

  isWithinBounds(floorWidth: number, floorHeight: number): boolean {
    const rightEdge = this.table.position_x + this.table.width
    const bottomEdge = this.table.position_y + this.table.height
    
    return (
      this.table.position_x >= 0 &&
      this.table.position_y >= 0 &&
      rightEdge <= floorWidth &&
      bottomEdge <= floorHeight
    )
  }

  overlapsWith(otherTable: TableDomain): boolean {
    const thisLeft = this.table.position_x
    const thisRight = this.table.position_x + this.table.width
    const thisTop = this.table.position_y
    const thisBottom = this.table.position_y + this.table.height

    const otherLeft = otherTable.table.position_x
    const otherRight = otherTable.table.position_x + otherTable.table.width
    const otherTop = otherTable.table.position_y
    const otherBottom = otherTable.table.position_y + otherTable.table.height

    return !(
      thisRight <= otherLeft ||
      thisLeft >= otherRight ||
      thisBottom <= otherTop ||
      thisTop >= otherBottom
    )
  }

  toDTO(): RestaurantTable {
    return { ...this.table }
  }
}
