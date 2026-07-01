import type { RestaurantTable, TableShape, TableStatus } from "@shared/types/database.types"

export interface ITableRepository {
  getAll(): Promise<RestaurantTable[]>
  getById(id: string): Promise<RestaurantTable>
  getByFloorId(floorId: string): Promise<RestaurantTable[]>
  create(payload: {
    floor_id: string
    name: string
    capacity: number
    status: TableStatus
    x: number
    y: number
    width: number
    height: number
    shape: TableShape
  }): Promise<RestaurantTable>
  update(
    id: string,
    payload: Partial<{
      floor_id: string
      name: string
      capacity: number
      status: TableStatus
      x: number
      y: number
      width: number
      height: number
      shape: TableShape
    }>,
  ): Promise<RestaurantTable>
  delete(id: string): Promise<void>
}
