-- ============================================================
-- FIX: infinite recursion detected in policy for relation "profiles"
-- Run this in Supabase SQL Editor if RLS_POLICIES.sql was already applied.
-- ============================================================

CREATE OR REPLACE FUNCTION is_admin()
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM profiles
    WHERE id = auth.uid()
      AND role = 'admin'
      AND is_active = true
  );
$$;

DROP POLICY IF EXISTS "Admin can view all profiles" ON profiles;
DROP POLICY IF EXISTS "Admin can update all profiles" ON profiles;
DROP POLICY IF EXISTS "Admin can manage products" ON products;
DROP POLICY IF EXISTS "Admin can view all orders" ON orders;
DROP POLICY IF EXISTS "Admin can update orders" ON orders;
DROP POLICY IF EXISTS "Admin can view all order_items" ON order_items;
DROP POLICY IF EXISTS "Admin can view all point_transactions" ON point_transactions;

CREATE POLICY "Admin can view all profiles" ON profiles
  FOR SELECT USING (auth.role() = 'authenticated' AND is_admin());

CREATE POLICY "Admin can update all profiles" ON profiles
  FOR UPDATE USING (is_admin());

CREATE POLICY "Admin can manage products" ON products
  FOR ALL USING (is_admin());

CREATE POLICY "Admin can view all orders" ON orders
  FOR SELECT USING (is_admin());

CREATE POLICY "Admin can update orders" ON orders
  FOR UPDATE USING (is_admin());

CREATE POLICY "Admin can view all order_items" ON order_items
  FOR SELECT USING (is_admin());

CREATE POLICY "Admin can view all point_transactions" ON point_transactions
  FOR SELECT USING (is_admin());
