import type { Floor } from "@shared/types/database.types"

export interface IFloorRepository {
  getAll(): Promise<Floor[]>
  getById(id: string): Promise<Floor>
  create(payload: { name: string; width: number; height: number }): Promise<Floor>
  update(id: string, payload: Partial<{ name: string; width: number; height: number }>): Promise<Floor>
  delete(id: string): Promise<void>
}
