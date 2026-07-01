import { useQuery } from "@tanstack/react-query"
import * as menuCategoryService from "../services/menu-category.service"

export const useMenuCategories = () => {
  return useQuery({
    queryKey: ["menuCategories"],
    queryFn: menuCategoryService.getAllMenuCategories,
  })
}
