import RepositoryFactory from "@shared/repositories/repository.factory"
import type { Floor } from "@shared/types/database.types"

const floorRepository = RepositoryFactory.getFloorRepository()

export const getAllFloors = async (): Promise<Floor[]> => {
  return floorRepository.getAll()
}

export const createFloor = async (payload: {
  name: string
  width: number
  height: number
}) => {
  return floorRepository.create(payload)
}

export const updateFloor = async (
  id: string,
  payload: Partial<{ name: string; width: number; height: number }>,
) => {
  return floorRepository.update(id, payload)
}

export const deleteFloor = async (id: string) => {
  return floorRepository.delete(id)
}
