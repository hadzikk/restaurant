import { z } from "zod"

const envSchema = z.object({
  VITE_SUPABASE_URL: z.string().url("Invalid Supabase URL"),
  VITE_SUPABASE_KEY: z.string().min(1, "Supabase key is required"),
  VITE_SUPABASE_MENU_IMAGES_BUCKET: z.string().default("menu-images"),
})

export const env = envSchema.parse({
  VITE_SUPABASE_URL: import.meta.env.VITE_SUPABASE_URL,
  VITE_SUPABASE_KEY: import.meta.env.VITE_SUPABASE_KEY,
  VITE_SUPABASE_MENU_IMAGES_BUCKET: import.meta.env.VITE_SUPABASE_MENU_IMAGES_BUCKET,
})

export type Env = z.infer<typeof envSchema>
