import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import * as tableService from "../services/table.service"

export const useStaffTables = () => {
  return useQuery({
    queryKey: ["staff-tables"],
    queryFn: tableService.getAllTables,
  })
}

export const useCreateTable = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: tableService.createTable,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["staff-tables"] })
      queryClient.invalidateQueries({ queryKey: ["floor-tables"] })
    },
  })
}

export const useUpdateTable = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, payload }: {
      id: string
      payload: Parameters<typeof tableService.updateTable>[1]
    }) => tableService.updateTable(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["staff-tables"] })
      queryClient.invalidateQueries({ queryKey: ["floor-tables"] })
    },
  })
}

export const useDeleteTable = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: tableService.deleteTable,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["staff-tables"] })
      queryClient.invalidateQueries({ queryKey: ["floor-tables"] })
    },
  })
}
