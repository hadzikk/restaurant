import type { MenuCategory } from "@shared/types/database.types"

export interface IMenuCategoryRepository {
  getAll(): Promise<MenuCategory[]>
}
