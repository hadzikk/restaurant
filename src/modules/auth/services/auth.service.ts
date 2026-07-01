import { supabase } from "@libs/supabase"
import RepositoryFactory from "@shared/repositories/repository.factory"
import { ROLE } from "@shared/constants/roles"
import type { User } from "@shared/types/database.types"

const authRepository = RepositoryFactory.getAuthRepository()

interface RegisterPayload {
  email: string
  full_name: string
  phone: string
  password: string
}

interface LoginPayload {
  email: string
  password: string
}

export const loginWithPassword = async ({ email, password }: LoginPayload) => {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password })
  if (error) throw error
  return data
}

export const loginWithGoogle = async () => {
  const { error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: window.location.origin,
    },
  })
  if (error) throw error
}

export const register = async ({ email, full_name, phone, password }: RegisterPayload) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name,
        phone,
        role_id: ROLE.CUSTOMER,
      },
    },
  })
  if (error) throw error
  return data
}

export const logout = async () => {
  const { error } = await supabase.auth.signOut()
  if (error) throw error
}

export const getCurrentUser = async () => {
  const { data: { user } } = await supabase.auth.getUser()
  return user
}

export const getProfile = async (userId: string): Promise<User> => {
  return authRepository.getProfile(userId)
}
