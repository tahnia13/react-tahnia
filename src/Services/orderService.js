import { supabase } from '../lib/supabase'

export const orderService = {
  async getAll() {
    const { data, error } = await supabase
      .from('orders')
      .select(
        `
        *,
        profiles:user_id (id, full_name, email, phone),
        order_items (
          *,
          products (id, name, price)
        )
      `
      )
      .order('created_at', { ascending: false })
    return { data, error }
  },

  async getByUser(userId) {
    const { data, error } = await supabase
      .from('orders')
      .select(
        `
        *,
        order_items (
          *,
          products (id, name, price, image_url)
        )
      `
      )
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
    return { data, error }
  },

  async getById(orderId) {
    const { data, error } = await supabase
      .from('orders')
      .select(
        `
        *,
        profiles:user_id (id, full_name, email, phone, address),
        order_items (
          *,
          products (id, name, price, image_url)
        )
      `
      )
      .eq('id', orderId)
      .single()
    return { data, error }
  },

  async create(orderData, orderItems) {
    try {
      // Insert order
      const { data: order, error: orderError } = await supabase
        .from('orders')
        .insert([
          {
            user_id: orderData.user_id,
            total_amount: orderData.total_amount,
            shipping_address: orderData.shipping_address,
            notes: orderData.notes,
            status: 'pending',
          },
        ])
        .select()
        .single()

      if (orderError) throw orderError

      // Insert order items
      const itemsToInsert = orderItems.map((item) => ({
        order_id: order.id,
        product_id: item.product_id,
        quantity: item.quantity,
        price_at_time: item.price_at_time,
        subtotal: item.quantity * item.price_at_time,
      }))

      const { error: itemsError } = await supabase
        .from('order_items')
        .insert(itemsToInsert)

      if (itemsError) {
        // Rollback: Delete order if items insert fails
        await supabase.from('orders').delete().eq('id', order.id)
        throw itemsError
      }

      return { data: order, error: null }
    } catch (err) {
      return { data: null, error: err }
    }
  },

  async updateStatus(orderId, status) {
    const { data, error } = await supabase
      .from('orders')
      .update({ status, updated_at: new Date() })
      .eq('id', orderId)
      .select()
      .single()
    return { data, error }
  },

  async getOrdersByStatus(status) {
    const { data, error } = await supabase
      .from('orders')
      .select(
        `
        *,
        profiles:user_id (id, full_name, email),
        order_items (count)
      `
      )
      .eq('status', status)
      .order('created_at', { ascending: false })
    return { data, error }
  },
}
