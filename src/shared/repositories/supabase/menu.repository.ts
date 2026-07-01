import { supabase } from "../../libs/supabase"
import type { Menu } from "../../types/database.types"
import type { IMenuRepository } from "../interfaces/menu.repository.interface"
import { NetworkError, NotFoundError } from "../../utils/errors"

export class SupabaseMenuRepository implements IMenuRepository {
  async getAll(): Promise<Menu[]> {
    const { data, error } = await supabase
      .from("menus")
      .select(`
        *,
        menu_images(*),
        menu_categories(*)
      `)
      .order("created_at", { ascending: false })

    if (error) {
      if (error.message.includes("Network") || error.message.includes("fetch")) {
        throw new NetworkError("Failed to fetch menus")
      }
      throw new NetworkError(error.message)
    }
    return (data as Menu[]) || []
  }

  async getById(id: number): Promise<Menu> {
    const { data, error } = await supabase
      .from("menus")
      .select(`
        *,
        menu_images(*),
        menu_categories(*)
      `)
      .eq("id", id)
      .single()

    if (error) {
      if (error.code === "PGRST116") {
        throw new NotFoundError("Menu")
      }
      if (error.message.includes("Network") || error.message.includes("fetch")) {
        throw new NetworkError("Failed to fetch menu")
      }
      throw new NetworkError(error.message)
    }
    return data as Menu
  }

  async create(payload: { name: string; price: number; category_id?: number; image_url?: string }): Promise<Menu> {
    const { data: menuData, error: menuError } = await supabase
      .from("menus")
      .insert({ name: payload.name, price: payload.price, category_id: payload.category_id })
      .select()
      .single()

    if (menuError) {
      if (menuError.message.includes("Network") || menuError.message.includes("fetch")) {
        throw new NetworkError("Failed to create menu")
      }
      throw new NetworkError(menuError.message)
    }

    if (payload.image_url && menuData) {
      const { error: imageError } = await supabase
        .from("menu_images")
        .insert({ menu_id: menuData.id, image_url: payload.image_url })

      if (imageError) {
        console.error("Failed to attach image to menu:", imageError.message)
      }
    }

    return this.getById(menuData.id)
  }

  async update(id: string, payload: Partial<{ name: string; price: number; category_id?: number; image_url?: string }>): Promise<Menu> {
    const { data, error } = await supabase
      .from("menus")
      .update(payload)
      .eq("id", id)
      .select()
      .single()

    if (error) {
      if (error.code === "PGRST116") {
        throw new NotFoundError("Menu")
      }
      if (error.message.includes("Network") || error.message.includes("fetch")) {
        throw new NetworkError("Failed to update menu")
      }
      throw new NetworkError(error.message)
    }
    return data as Menu
  }

  async delete(id: string): Promise<void> {
    const { error } = await supabase.from("menus").delete().eq("id", id)
    if (error) {
      if (error.message.includes("Network") || error.message.includes("fetch")) {
        throw new NetworkError("Failed to delete menu")
      }
      throw new NetworkError(error.message)
    }
  }
}
