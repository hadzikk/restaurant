export interface Role {
  id: number
  name: string
  created_at: string
  updated_at: string
}

export type TableStatus = "available" | "occupied" | "reserved"

export interface User {
  id: string
  role_id: number
  email: string | null
  full_name: string | null
  birthday: string | null
  phone: string | null
  gender: string | null
  created_at: string
  updated_at: string
  roles?: Role | null
}

export interface MenuCategory {
  id: number
  name: string | null
  created_at: string
  updated_at: string
}

export interface MenuImage {
  id: number
  menu_id: number | null
  image_url: string | null
  created_at: string
  updated_at: string
}

export interface Menu {
  id: number
  category_id: number | null
  name: string | null
  price: number | null
  created_at: string
  updated_at: string
  menu_images?: MenuImage[]
  menu_categories?: MenuCategory | null
}

export interface Table {
  id: number
  name: string
  status: string
  width: number | null
  height: number | null
  top: number | null
  left: number | null
  created_at: string
  updated_at: string
}

export interface CartItem {
  menuId: number
  name: string
  price: number
  quantity: number
}

export type TableShape = "rectangle" | "circle" | "square"

export interface Floor {
  id: string
  name: string
  width: number
  height: number
  created_at: string
  updated_at: string
}

export interface RestaurantTable {
  id: string
  floor_id: string
  name: string
  capacity: number
  status: TableStatus
  position_x: number
  position_y: number
  width: number
  height: number
  shape: TableShape
  created_at: string
  updated_at: string
}

export interface TableSize {
  id: number
  name: string
  created_at: string
  updated_at: string
}

export interface TableFeature {
  id: number
  detail_id: number
  name: string
  description: string | null
  created_at: string
  updated_at: string
}

export interface TableImage {
  id: number
  detail_id: number
  image_url: string
  created_at: string
  updated_at: string
}

export interface TableDetail {
  id: number
  table_id: number
  location_id: number | null
  size_id: number | null
  capacity: number
  created_at: string
  updated_at: string
  table_features?: TableFeature[]
  table_images?: TableImage[]
}

export interface OrderMenuLine {
  id: number
  order_id: string
  menu_id: number
  quantity: number
  snapshot_price: number
  created_at: string
  updated_at: string
}

export interface OrderTableLine {
  id: number
  order_id: string
  table_id: number
  table_name: string
  reservation_date: string
  reservation_time: string
  guest_count: number
  created_at: string
}

export interface Order {
  id: string
  user_id: string
  total: number
  reservation_date: string | null
  reservation_time: string | null
  created_at: string
  updated_at: string
  order_menu_lines?: OrderMenuLine[]
  order_table_lines?: OrderTableLine[]
}

export interface Transaction {
  id: number
  user_id: string
  transaction_id: string
  total_amount: number
  payment_method: string
  payment_status: string
  transaction_date: string
  receipt_file_name: string | null
  order_snapshot: any
  created_at: string
  itemsets: any[]
}
