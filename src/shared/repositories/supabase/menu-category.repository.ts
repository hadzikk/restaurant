import { supabase } from "../../libs/supabase"
import type { MenuCategory } from "../../types/database.types"
import type { IMenuCategoryRepository } from "../interfaces/menu-category.repository.interface"
import { NetworkError } from "../../utils/errors"

export class SupabaseMenuCategoryRepository implements IMenuCategoryRepository {
  async getAll(): Promise<MenuCategory[]> {
    const { data, error } = await supabase
      .from("menu_categories")
      .select("*")
      .order("name", { ascending: true })

    if (error) {
      if (error.message.includes("Network") || error.message.includes("fetch")) {
        throw new NetworkError("Failed to fetch menu categories")
      }
      throw new NetworkError(error.message)
    }
    return (data as MenuCategory[]) || []
  }
}
