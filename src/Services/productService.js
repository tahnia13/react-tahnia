import { supabase } from '../lib/supabase'

export const productService = {
  async getAll() {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('is_active', true)
      .order('created_at', { ascending: false })
    return { data, error }
  },

  async getById(id) {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('id', id)
      .single()
    return { data, error }
  },

  async create(productData) {
    const { data, error } = await supabase
      .from('products')
      .insert([productData])
      .select()
      .single()
    return { data, error }
  },

  async update(id, productData) {
    const { data, error } = await supabase
      .from('products')
      .update(productData)
      .eq('id', id)
      .select()
      .single()
    return { data, error }
  },

  async delete(id) {
    const { data, error } = await supabase
      .from('products')
      .update({ is_active: false })
      .eq('id', id)
      .select()
      .single()
    return { data, error }
  },

  async checkStock(productId, quantity) {
    const { data, error } = await supabase
      .from('products')
      .select('stock')
      .eq('id', productId)
      .single()

    if (error) return { available: false, error }
    return { available: data.stock >= quantity, currentStock: data.stock }
  },
}
