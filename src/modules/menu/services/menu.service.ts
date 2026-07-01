import RepositoryFactory from "@shared/repositories/repository.factory"
import type { Menu } from "@shared/types/database.types"

const menuRepository = RepositoryFactory.getMenuRepository()

export const getAllMenus = async (): Promise<Menu[]> => {
  return menuRepository.getAll()
}

export const createMenu = async (payload: {
  name: string
  price: number
  category_id?: number
  image_url?: string
}) => {
  return menuRepository.create(payload)
}

export const updateMenu = async (
  id: string,
  payload: Partial<{ name: string; price: number; category_id?: number; image_url?: string }>,
) => {
  return menuRepository.update(id, payload)
}

export const deleteMenu = async (id: string) => {
  return menuRepository.delete(id)
}
