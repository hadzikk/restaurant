import type { Menu } from "@shared/types/database.types"

export interface IMenuRepository {
  getAll(): Promise<Menu[]>
  getById(id: number): Promise<Menu>
  create(payload: { name: string; price: number; category_id?: number; image_url?: string }): Promise<Menu>
  update(id: string, payload: Partial<{ name: string; price: number; category_id?: number; image_url?: string }>): Promise<Menu>
  delete(id: string): Promise<void>
}
