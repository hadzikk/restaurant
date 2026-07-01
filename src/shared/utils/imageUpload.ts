import { supabase } from "../libs/supabase"
import { env } from "../libs/env"

export const uploadMenuImage = async (file: File, menuId: number): Promise<string> => {
  const fileExt = file.name.split(".").pop()
  const fileName = `${menuId}/${Date.now()}.${fileExt}`
  
  const { data, error } = await supabase.storage
    .from(env.VITE_SUPABASE_MENU_IMAGES_BUCKET)
    .upload(fileName, file)

  if (error) {
    throw new Error(`Failed to upload image: ${error.message}`)
  }

  const { data: { publicUrl } } = supabase.storage
    .from(env.VITE_SUPABASE_MENU_IMAGES_BUCKET)
    .getPublicUrl(fileName)

  return publicUrl
}

export const deleteMenuImage = async (imageUrl: string): Promise<void> => {
  try {
    const url = new URL(imageUrl)
    const pathParts = url.pathname.split(`/`)
    const fileName = pathParts[pathParts.length - 2] + "/" + pathParts[pathParts.length - 1]
    
    const { error } = await supabase.storage
      .from(env.VITE_SUPABASE_MENU_IMAGES_BUCKET)
      .remove([fileName])

    if (error) {
      console.error("Failed to delete image:", error.message)
    }
  } catch (error) {
    console.error("Failed to parse image URL for deletion:", error)
  }
}
