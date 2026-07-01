import RepositoryFactory from "@shared/repositories/repository.factory"
import type { MenuCategory } from "@shared/types/database.types"

const menuCategoryRepository = RepositoryFactory.getMenuCategoryRepository()

export const getAllMenuCategories = async (): Promise<MenuCategory[]> => {
  return menuCategoryRepository.getAll()
}
