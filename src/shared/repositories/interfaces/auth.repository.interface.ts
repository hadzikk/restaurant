import type { User } from "@shared/types/database.types"

export interface IAuthRepository {
  getProfile(userId: string): Promise<User>
}
