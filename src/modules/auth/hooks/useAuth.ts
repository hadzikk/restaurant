import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import * as authService from "../services/auth.service"

export const useLogin = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: authService.loginWithPassword,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] })
      queryClient.invalidateQueries({ queryKey: ["profile"] })
    },
  })
}

export const useRegister = () => {
  return useMutation({
    mutationFn: authService.register,
  })
}

export const useLogout = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: authService.logout,
    onSuccess: () => {
      queryClient.clear()
    },
  })
}

export const useCurrentUser = () => {
  return useQuery({
    queryKey: ["user"],
    queryFn: authService.getCurrentUser,
    staleTime: 1000 * 60 * 5,
  })
}

export const useProfile = () => {
  const { data: user } = useCurrentUser()
  return useQuery({
    queryKey: ["profile", user?.id],
    queryFn: () => authService.getProfile(user!.id),
    enabled: !!user?.id,
    staleTime: 1000 * 60 * 5,
  })
}

export const useGoogleLogin = () => {
  return useMutation({
    mutationFn: authService.loginWithGoogle,
  })
}
