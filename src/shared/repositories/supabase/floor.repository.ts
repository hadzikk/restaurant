import { supabase } from "../../libs/supabase"
import type { Floor } from "../../types/database.types"
import type { IFloorRepository } from "../interfaces/floor.repository.interface"
import { NetworkError } from "../../utils/errors"

export class SupabaseFloorRepository implements IFloorRepository {
  async getAll(): Promise<Floor[]> {
    const { data, error } = await supabase
      .from("floors")
      .select("*")
      .order("created_at", { ascending: true })

    if (error) {
      if (error.message.includes("Network") || error.message.includes("fetch")) {
        throw new NetworkError("Failed to fetch floors")
      }
      throw new NetworkError(error.message)
    }
    return (data as Floor[]) || []
  }

  async getById(id: string): Promise<Floor> {
    const { data, error } = await supabase
      .from("floors")
      .select("*")
      .eq("id", id)
      .single()

    if (error) {
      if (error.message.includes("Network") || error.message.includes("fetch")) {
        throw new NetworkError("Failed to fetch floors")
      }
      throw new NetworkError(error.message)
    }
    return data as Floor
  }

  async create(payload: { name: string; width: number; height: number }): Promise<Floor> {
    const { data, error } = await supabase
      .from("floors")
      .insert(payload)
      .select()
      .single()

    if (error) {
      if (error.message.includes("Network") || error.message.includes("fetch")) {
        throw new NetworkError("Failed to fetch floors")
      }
      throw new NetworkError(error.message)
    }
    return data as Floor
  }

  async update(id: string, payload: Partial<{ name: string; width: number; height: number }>): Promise<Floor> {
    const { data, error } = await supabase
      .from("floors")
      .update(payload)
      .eq("id", id)
      .select()
      .single()

    if (error) {
      if (error.message.includes("Network") || error.message.includes("fetch")) {
        throw new NetworkError("Failed to fetch floors")
      }
      throw new NetworkError(error.message)
    }
    return data as Floor
  }

  async delete(id: string): Promise<void> {
    const { error } = await supabase.from("floors").delete().eq("id", id)
    if (error) {
      if (error.message.includes("Network") || error.message.includes("fetch")) {
        throw new NetworkError("Failed to fetch floors")
      }
      throw new NetworkError(error.message)
    }
  }
}
