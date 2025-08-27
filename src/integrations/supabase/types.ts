export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface ProductVariant {
  id?: string
  product_id?: string
  variant_name: string
  price: number
  price_adjustment: number
  discount_percentage?: number | null
  is_available: boolean
  created_at?: string
  updated_at?: string
}

export interface Product {
  id: string
  name: string
  price: number
  discount: boolean
  discount_percentage?: number | null
  description?: string | null
  images?: string[] | null
  created_at: string
  updated_at?: string
  variants?: ProductVariant[]
  product_type?: 'premium_app' | 'digital_service' | 'digital_product'
}

export interface ProductWithVariants extends Product {
  variants: ProductVariant[]
}

export type Database = {
  public: {
    Tables: {
      products: {
        Row: {
          id: string
          name: string
          price: number
          discount: boolean | null
          discount_percentage?: number | null
          description: string | null
          images: string[] | null
          created_at: string
          updated_at: string
          product_type: 'premium_app' | 'digital_service' | 'digital_product'
          is_available: boolean
        }
        Insert: {
          id?: string
          name: string
          price: number
          discount?: boolean | null
          discount_percentage?: number | null
          description?: string | null
          images?: string[] | null
          created_at?: string
          updated_at?: string
          product_type?: 'premium_app' | 'digital_service' | 'digital_product'
          is_available?: boolean
        }
        Update: {
          id?: string
          name?: string
          price?: number
          discount?: boolean | null
          discount_percentage?: number | null
          description?: string | null
          images?: string[] | null
          updated_at?: string
          product_type?: 'premium_app' | 'digital_service' | 'digital_product'
          is_available?: boolean
        }
        Relationships: []
      }
      product_variants: {
        Row: {
          id: string
          product_id: string
          variant_name: string
          price: number
          price_adjustment: number
          discount_percentage: number | null
          is_available: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          product_id: string
          variant_name: string
          price: number
          price_adjustment: number
          discount_percentage?: number | null
          is_available?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          product_id?: string
          variant_name?: string
          price?: number
          price_adjustment?: number
          discount_percentage?: number | null
          is_available?: boolean
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "product_variants_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: Record<string, never>
    Functions: Record<string, never>
    Enums: Record<string, never>
    CompositeTypes: Record<string, never>
  }
}

// Utility Types
type Schema = Database["public"]

export type Tables<T extends keyof Schema["Tables"]> =
  Schema["Tables"][T]["Row"]

export type TablesInsert<T extends keyof Schema["Tables"]> =
  Schema["Tables"][T]["Insert"]

export type TablesUpdate<T extends keyof Schema["Tables"]> =
  Schema["Tables"][T]["Update"]

export type Enums<T extends keyof Schema["Enums"]> = Schema["Enums"][T]

export type CompositeTypes<T extends keyof Schema["CompositeTypes"]> =
  Schema["CompositeTypes"][T]

export const Constants = {
  public: { Enums: {} },
} as const

// Additional utility types for the frontend
export interface ProductCardProps {
  id: string
  name: string
  price: number
  discount?: {
    enabled: boolean
    value: number
  }
  description: string
  image: string
  variants?: ProductVariant[]
}

export interface AdminFormData {
  name: string
  price: string
  discount: boolean
  discount_percentage: string
  description: string
  images: string[]
  variants: ProductVariant[]
}