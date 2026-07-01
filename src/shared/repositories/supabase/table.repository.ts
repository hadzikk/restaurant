import { supabase } from "../../libs/supabase"
import type { RestaurantTable, TableShape, TableStatus } from "../../types/database.types"
import type { ITableRepository } from "../interfaces/table.repository.interface"
import { NetworkError } from "../../utils/errors"

export class SupabaseTableRepository implements ITableRepository {
  async getAll(): Promise<RestaurantTable[]> {
    const { data, error } = await supabase
      .from("tables")
      .select("*")
      .order("name", { ascending: true })

    if (error) {
      if (error.message.includes("Network") || error.message.includes("fetch")) {
        throw new NetworkError("Failed to fetch tables")
      }
      throw new NetworkError(error.message)
    }
    return (data as RestaurantTable[]) || []
  }

  async getById(id: string): Promise<RestaurantTable> {
    const { data, error } = await supabase
      .from("tables")
      .select("*")
      .eq("id", id)
      .single()

    if (error) {
      if (error.message.includes("Network") || error.message.includes("fetch")) {
        throw new NetworkError("Failed to fetch tables")
      }
      throw new NetworkError(error.message)
    }
    return data as RestaurantTable
  }

  async getByFloorId(floorId: string): Promise<RestaurantTable[]> {
    const { data, error } = await supabase
      .from("tables")
      .select("*")
      .eq("floor_id", floorId)
      .order("name", { ascending: true })

    if (error) {
      if (error.message.includes("Network") || error.message.includes("fetch")) {
        throw new NetworkError("Failed to fetch tables")
      }
      throw new NetworkError(error.message)
    }
    return (data as RestaurantTable[]) || []
  }

  async create(payload: {
    floor_id: string
    name: string
    capacity: number
    status: TableStatus
    x: number
    y: number
    width: number
    height: number
    shape: TableShape
  }): Promise<RestaurantTable> {
    const { data, error } = await supabase
      .from("tables")
      .insert(payload)
      .select()
      .single()

    if (error) {
      if (error.message.includes("Network") || error.message.includes("fetch")) {
        throw new NetworkError("Failed to fetch tables")
      }
      throw new NetworkError(error.message)
    }
    return data as RestaurantTable
  }

  async update(
    id: string,
    payload: Partial<{
      floor_id: string
      name: string
      capacity: number
      status: TableStatus
      x: number
      y: number
      width: number
      height: number
      shape: TableShape
    }>,
  ): Promise<RestaurantTable> {
    const { data, error } = await supabase
      .from("tables")
      .update(payload)
      .eq("id", id)
      .select()
      .single()

    if (error) {
      if (error.message.includes("Network") || error.message.includes("fetch")) {
        throw new NetworkError("Failed to fetch tables")
      }
      throw new NetworkError(error.message)
    }
    return data as RestaurantTable
  }

  async delete(id: string): Promise<void> {
    const { error } = await supabase.from("tables").delete().eq("id", id)
    if (error) {
      if (error.message.includes("Network") || error.message.includes("fetch")) {
        throw new NetworkError("Failed to fetch tables")
      }
      throw new NetworkError(error.message)
    }
  }
}
