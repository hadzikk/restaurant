import { z } from "zod"

export const menuSchema = z.object({
  name: z.string().min(1, "Menu name is required").max(100, "Menu name must be less than 100 characters"),
  description: z.string().max(500, "Description must be less than 500 characters").optional(),
  price: z.number().positive("Price must be positive").min(0.01, "Price must be at least 0.01"),
  category_id: z.number().int().positive().optional(),
})

export const floorSchema = z.object({
  name: z.string().min(1, "Floor name is required").max(50, "Floor name must be less than 50 characters"),
  width: z.number().int().positive("Width must be positive").min(100, "Width must be at least 100"),
  height: z.number().int().positive("Height must be positive").min(100, "Height must be at least 100"),
})

export const tableSchema = z.object({
  floor_id: z.string().uuid("Invalid floor ID"),
  name: z.string().min(1, "Table name is required").max(50, "Table name must be less than 50 characters"),
  capacity: z.number().int().positive("Capacity must be positive").min(1, "Capacity must be at least 1").max(20, "Capacity cannot exceed 20"),
  status: z.enum(["available", "occupied", "reserved"]),
  position_x: z.number().int().nonnegative("Position X must be non-negative"),
  position_y: z.number().int().nonnegative("Position Y must be non-negative"),
  width: z.number().int().positive("Width must be positive").min(50, "Width must be at least 50"),
  height: z.number().int().positive("Height must be positive").min(50, "Height must be at least 50"),
  shape: z.enum(["rectangle", "circle", "square"]),
})

export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
})

export const registerSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters").max(100, "Password must be less than 100 characters"),
  full_name: z.string().min(1, "Full name is required").max(100, "Full name must be less than 100 characters"),
  phone: z.string().regex(/^[0-9+\-\s()]+$/, "Invalid phone number").optional(),
})

export const cartItemSchema = z.object({
  menuId: z.number().int().positive(),
  name: z.string().min(1),
  price: z.number().positive(),
  quantity: z.number().int().positive().min(1).max(99),
})

export type MenuInput = z.infer<typeof menuSchema>
export type FloorInput = z.infer<typeof floorSchema>
export type TableInput = z.infer<typeof tableSchema>
export type LoginInput = z.infer<typeof loginSchema>
export type RegisterInput = z.infer<typeof registerSchema>
export type CartItemInput = z.infer<typeof cartItemSchema>
