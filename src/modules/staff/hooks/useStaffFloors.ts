import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import * as floorService from "../services/floor.service"

export const useStaffFloors = () => {
  return useQuery({
    queryKey: ["staff-floors"],
    queryFn: floorService.getAllFloors,
  })
}

export const useCreateFloor = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: floorService.createFloor,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["staff-floors"] })
      queryClient.invalidateQueries({ queryKey: ["floors"] })
    },
  })
}

export const useUpdateFloor = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, payload }: {
      id: string
      payload: Partial<{ name: string; width: number; height: number }>
    }) => floorService.updateFloor(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["staff-floors"] })
      queryClient.invalidateQueries({ queryKey: ["floors"] })
    },
  })
}

export const useDeleteFloor = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: floorService.deleteFloor,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["staff-floors"] })
      queryClient.invalidateQueries({ queryKey: ["floors"] })
    },
  })
}
