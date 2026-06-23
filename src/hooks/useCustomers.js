import { useState, useEffect } from 'react'
import { customerService } from '../services/customerService'

export const useCustomers = () => {
  const [customers, setCustomers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchCustomers = async () => {
    try {
      setLoading(true)
      setError(null)
      const { data, error } = await customerService.getAll()

      if (error) throw error
      setCustomers(data || [])
    } catch (err) {
      console.error('Error fetching customers:', err)
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchCustomers()
  }, [])

  return { customers, loading, error, refetch: fetchCustomers }
}

export const useCustomer = (id) => {
  const [customer, setCustomer] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchCustomer = async () => {
    try {
      setLoading(true)
      setError(null)

      if (!id) {
        setCustomer(null)
        setLoading(false)
        return
      }

      const { data, error } = await customerService.getById(id)

      if (error) throw error
      setCustomer(data)
    } catch (err) {
      console.error('Error fetching customer:', err)
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchCustomer()
  }, [id])

  return { customer, loading, error, refetch: fetchCustomer }
}
