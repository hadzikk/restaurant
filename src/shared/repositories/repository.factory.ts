import { SupabaseMenuRepository } from "./supabase/menu.repository"
import { SupabaseFloorRepository } from "./supabase/floor.repository"
import { SupabaseTableRepository } from "./supabase/table.repository"
import { SupabaseAuthRepository } from "./supabase/auth.repository"
import { SupabaseMenuCategoryRepository } from "./supabase/menu-category.repository"
import type { IMenuRepository } from "./interfaces/menu.repository.interface"
import type { IFloorRepository } from "./interfaces/floor.repository.interface"
import type { ITableRepository } from "./interfaces/table.repository.interface"
import type { IAuthRepository } from "./interfaces/auth.repository.interface"
import type { IMenuCategoryRepository } from "./interfaces/menu-category.repository.interface"

class RepositoryFactory {
  private static menuRepository: IMenuRepository | null = null
  private static floorRepository: IFloorRepository | null = null
  private static tableRepository: ITableRepository | null = null
  private static authRepository: IAuthRepository | null = null
  private static menuCategoryRepository: IMenuCategoryRepository | null = null

  static getMenuRepository(): IMenuRepository {
    if (!this.menuRepository) {
      this.menuRepository = new SupabaseMenuRepository()
    }
    return this.menuRepository
  }

  static getFloorRepository(): IFloorRepository {
    if (!this.floorRepository) {
      this.floorRepository = new SupabaseFloorRepository()
    }
    return this.floorRepository
  }

  static getTableRepository(): ITableRepository {
    if (!this.tableRepository) {
      this.tableRepository = new SupabaseTableRepository()
    }
    return this.tableRepository
  }

  static getAuthRepository(): IAuthRepository {
    if (!this.authRepository) {
      this.authRepository = new SupabaseAuthRepository()
    }
    return this.authRepository
  }

  static getMenuCategoryRepository(): IMenuCategoryRepository {
    if (!this.menuCategoryRepository) {
      this.menuCategoryRepository = new SupabaseMenuCategoryRepository()
    }
    return this.menuCategoryRepository
  }

  static reset(): void {
    this.menuRepository = null
    this.floorRepository = null
    this.tableRepository = null
    this.authRepository = null
    this.menuCategoryRepository = null
  }
}

export default RepositoryFactory
