import { useState, useEffect } from 'react'
import { orderService } from '../services/orderService'

export const useOrders = () => {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchOrders = async () => {
    try {
      setLoading(true)
      setError(null)
      const { data, error } = await orderService.getAll()

      if (error) throw error
      setOrders(data || [])
    } catch (err) {
      console.error('Error fetching orders:', err)
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchOrders()
  }, [])

  return { orders, loading, error, refetch: fetchOrders }
}

export const useUserOrders = (userId) => {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchOrders = async () => {
    try {
      setLoading(true)
      setError(null)

      if (!userId) {
        setOrders([])
        setLoading(false)
        return
      }

      const { data, error } = await orderService.getByUser(userId)

      if (error) throw error
      setOrders(data || [])
    } catch (err) {
      console.error('Error fetching user orders:', err)
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchOrders()
  }, [userId])

  return { orders, loading, error, refetch: fetchOrders }
}

export const useOrder = (orderId) => {
  const [order, setOrder] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchOrder = async () => {
    try {
      setLoading(true)
      setError(null)

      if (!orderId) {
        setOrder(null)
        setLoading(false)
        return
      }

      const { data, error } = await orderService.getById(orderId)

      if (error) throw error
      setOrder(data)
    } catch (err) {
      console.error('Error fetching order:', err)
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchOrder()
  }, [orderId])

  return { order, loading, error, refetch: fetchOrder }
}
