import RepositoryFactory from "@shared/repositories/repository.factory"
import type { RestaurantTable, TableShape, TableStatus } from "@shared/types/database.types"

const tableRepository = RepositoryFactory.getTableRepository()

export const getAllTables = async (): Promise<RestaurantTable[]> => {
  return tableRepository.getAll()
}

export const createTable = async (payload: {
  floor_id: string
  name: string
  capacity: number
  status: TableStatus
  position_x: number
  position_y: number
  width: number
  height: number
  shape: TableShape
}) => {
  return tableRepository.create(payload)
}

export const updateTable = async (
  id: string,
  payload: Partial<{
    floor_id: string
    name: string
    capacity: number
    status: TableStatus
    position_x: number
    position_y: number
    width: number
    height: number
    shape: TableShape
  }>,
) => {
  return tableRepository.update(id, payload)
}

export const deleteTable = async (id: string) => {
  return tableRepository.delete(id)
}
