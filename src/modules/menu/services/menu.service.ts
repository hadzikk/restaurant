import { supabase } from "@libs/supabase"

export class MenuService {
    public static async getAllMenu() {
        const { data, error } = await supabase
            .from('menus')
            .select(`
                *,
                menu_images(*)
            `)
            .order('created_at', { ascending: false })
        if (error) throw new Error(error.message)
        return data || []
    }
}