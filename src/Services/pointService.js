import { supabase } from '../lib/supabase'

export const pointService = {
  async getPointTransactions(userId) {
    const { data, error } = await supabase
      .from('point_transactions')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
    return { data, error }
  },

  async getUserPointsInfo(userId) {
    const { data, error } = await supabase
      .from('profiles')
      .select('points_balance, tier')
      .eq('id', userId)
      .single()
    return { data, error }
  },

  async calculateTierProgress(currentTier, currentPoints) {
    const tiers = {
      Bronze: { min: 0, max: 99, nextTier: 'Silver', nextThreshold: 100 },
      Silver: { min: 100, max: 499, nextTier: 'Gold', nextThreshold: 500 },
      Gold: { min: 500, max: 999, nextTier: 'Platinum', nextThreshold: 1000 },
      Platinum: { min: 1000, max: Infinity, nextTier: null, nextThreshold: null },
    }

    const tierInfo = tiers[currentTier]
    if (!tierInfo) return null

    const progress = tierInfo.nextThreshold
      ? Math.floor((currentPoints / tierInfo.nextThreshold) * 100)
      : 100

    return {
      currentTier,
      currentPoints,
      nextTier: tierInfo.nextTier,
      nextThreshold: tierInfo.nextThreshold,
      pointsNeeded: tierInfo.nextThreshold
        ? Math.max(0, tierInfo.nextThreshold - currentPoints)
        : 0,
      progress: Math.min(progress, 100),
    }
  },

  async getTierRates() {
    return {
      Bronze: 5,
      Silver: 10,
      Gold: 15,
      Platinum: 20,
    }
  },

  async getPointsFromOrder(totalAmount, tier) {
    const rates = await this.getTierRates()
    const rate = rates[tier] || 5
    return Math.floor(totalAmount * (rate / 100))
  },
}
