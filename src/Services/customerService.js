import { supabase } from '../lib/supabase'

export const customerService = {
  async getAll() {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('role', 'member')
      .eq('is_active', true)
      .order('created_at', { ascending: false })
    return { data, error }
  },

  async getById(id) {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', id)
      .single()
    return { data, error }
  },

  async create(customerData) {
    const { data, error } = await supabase.from('profiles').insert([
      {
        ...customerData,
        role: 'member',
        points_balance: 0,
        tier: 'Bronze',
        is_active: true,
      },
    ])
    return { data, error }
  },

  async update(id, customerData) {
    const { data, error } = await supabase
      .from('profiles')
      .update(customerData)
      .eq('id', id)
      .select()
      .single()
    return { data, error }
  },

  async delete(id) {
    const { data, error } = await supabase
      .from('profiles')
      .update({ is_active: false })
      .eq('id', id)
      .select()
      .single()
    return { data, error }
  },

  async getCustomerOrders(customerId) {
    const { data, error } = await supabase
      .from('orders')
      .select(
        `
        *,
        order_items (count)
      `
      )
      .eq('user_id', customerId)
      .order('created_at', { ascending: false })
    return { data, error }
  },

  async searchCustomers(searchTerm) {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('role', 'member')
      .eq('is_active', true)
      .or(
        `full_name.ilike.%${searchTerm}%,email.ilike.%${searchTerm}%,phone.ilike.%${searchTerm}%`
      )
    return { data, error }
  },
}
