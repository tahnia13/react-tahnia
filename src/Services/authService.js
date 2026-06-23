import { supabase } from '../lib/supabase'

export const authService = {
  async createProfile(userId, profileData) {
    const { data, error } = await supabase.from('profiles').insert([
      {
        id: userId,
        ...profileData,
      },
    ])
    return { data, error }
  },

  async getProfile(userId) {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single()
    return { data, error }
  },

  async updateProfile(userId, updates) {
    const { data, error } = await supabase
      .from('profiles')
      .update(updates)
      .eq('id', userId)
      .select()
      .single()
    return { data, error }
  },

  async getAllCustomers() {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('role', 'member')
      .eq('is_active', true)
      .order('created_at', { ascending: false })
    return { data, error }
  },

  async getUserPoints(userId) {
    const { data, error } = await supabase
      .from('profiles')
      .select('points_balance, tier')
      .eq('id', userId)
      .single()
    return { data, error }
  },
}
