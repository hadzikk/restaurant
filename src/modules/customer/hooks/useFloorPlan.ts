import { useQuery } from "@tanstack/react-query"
import * as floorService from "../services/floor.service"

export const useFloors = () => {
  return useQuery({
    queryKey: ["floors"],
    queryFn: floorService.getAllFloors,
  })
}

export const useFloorTables = (floorId: string | null) => {
  return useQuery({
    queryKey: ["floor-tables", floorId],
    queryFn: () => floorService.getTablesByFloorId(floorId!),
    enabled: !!floorId,
  })
}
