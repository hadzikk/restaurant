import { useState, useEffect } from "react"
import { MenuService } from "../services/menu.service"

const useMenu = () => {
    const [menus, setMenus] = useState([])
    const [error, setError] = useState("")
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const fetchMenus = async () => {
            try {
                const data = await MenuService.getAllMenu()
                setMenus(data)
            } catch (error) {
                setError(error instanceof Error ? error.message : "An error occured when fetching menus")
            } finally {
                setIsLoading(false)
            }
        }

        fetchMenus()
    }, [])

    return { menus, error, isLoading }
}

export default useMenu