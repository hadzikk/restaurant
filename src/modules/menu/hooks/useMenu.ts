import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import * as menuService from "../services/menu.service"

export const useMenus = () => {
  return useQuery({
    queryKey: ["menus"],
    queryFn: menuService.getAllMenus,
  })
}

export const useCreateMenu = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: menuService.createMenu,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["menus"] }),
  })
}

export const useUpdateMenu = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, payload }: {
      id: string
      payload: Partial<{ name: string; price: number; category_id?: number; image_url?: string }>
    }) => menuService.updateMenu(id, payload),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["menus"] }),
  })
}

export const useDeleteMenu = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: menuService.deleteMenu,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["menus"] }),
  })
}
