import { supabase } from "../../libs/supabase"
import type { User } from "../../types/database.types"
import type { IAuthRepository } from "../interfaces/auth.repository.interface"
import { ROLE, getRoleIdFromName } from "../../constants/roles"
import { NetworkError, AuthenticationError } from "../../utils/errors"

export class SupabaseAuthRepository implements IAuthRepository {
  async getProfile(userId: string): Promise<User> {
    const { data, error } = await supabase
      .from("users")
      .select("*, roles(id, name)")
      .eq("id", userId)
      .maybeSingle()

    if (data) return data as User

    const { data: { user } } = await supabase.auth.getUser()
    if (error && !user) {
      if (error.message.includes("Network") || error.message.includes("fetch")) {
        throw new NetworkError("Failed to fetch user profile")
      }
      throw new AuthenticationError(error.message)
    }

    const metadataRoleId = user?.user_metadata?.role_id
    const metadataRoleName = user?.user_metadata?.role
    
    let roleId: number = ROLE.CUSTOMER
    
    if (typeof metadataRoleId === 'number') {
      roleId = metadataRoleId as number
    } else if (metadataRoleName) {
      roleId = getRoleIdFromName(metadataRoleName as string)
    }

    return {
      id: userId,
      role_id: roleId,
      email: (user?.email as string) ?? null,
      full_name: (user?.user_metadata?.full_name as string) ?? null,
      birthday: null,
      phone: (user?.user_metadata?.phone as string) ?? null,
      gender: null,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      roles: null,
    }
  }
}
