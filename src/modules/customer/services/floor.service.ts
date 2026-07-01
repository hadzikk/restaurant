import RepositoryFactory from "@shared/repositories/repository.factory"
import type { Floor, RestaurantTable } from "@shared/types/database.types"

const floorRepository = RepositoryFactory.getFloorRepository()
const tableRepository = RepositoryFactory.getTableRepository()

export const getAllFloors = async (): Promise<Floor[]> => {
  return floorRepository.getAll()
}

export const getTablesByFloorId = async (floorId: string): Promise<RestaurantTable[]> => {
  return tableRepository.getByFloorId(floorId)
}

export const getTableById = async (tableId: string): Promise<RestaurantTable> => {
  return tableRepository.getById(tableId)
}
