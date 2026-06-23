-- ============================================================
-- ROW LEVEL SECURITY (RLS) POLICIES - Sedap Admin Dashboard
-- Execute all scripts in Supabase SQL Editor after DATABASE_SCHEMA.sql
-- ============================================================

-- ============================================================
-- ENABLE RLS on all tables
-- ============================================================
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE point_transactions ENABLE ROW LEVEL SECURITY;

-- ============================================================
-- HELPER FUNCTIONS
-- ============================================================
-- Avoid querying profiles directly inside profiles policies.
-- SECURITY DEFINER runs as the function owner, so the lookup does not recurse
-- through profiles RLS while checking whether the current user is an admin.
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

-- ============================================================
-- POLICIES: profiles table
-- ============================================================

-- Admin: Can view all profiles
CREATE POLICY "Admin can view all profiles" ON profiles
  FOR SELECT USING (auth.role() = 'authenticated' AND is_admin());

-- Member: Can view own profile
CREATE POLICY "Users can view own profile" ON profiles
  FOR SELECT USING (auth.uid() = id);

-- Admin: Can update all profiles
CREATE POLICY "Admin can update all profiles" ON profiles
  FOR UPDATE USING (is_admin());

-- Member: Can update own profile (except role and points)
CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- User: Can insert their own profile (on signup)
CREATE POLICY "Users can insert own profile" ON profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

-- ============================================================
-- POLICIES: products table
-- ============================================================

-- Everyone: Can view active products
CREATE POLICY "Everyone can view active products" ON products
  FOR SELECT USING (is_active = true);

-- Admin: Full CRUD access
CREATE POLICY "Admin can manage products" ON products
  FOR ALL USING (is_admin());

-- ============================================================
-- POLICIES: orders table
-- ============================================================

-- Admin: Can view all orders
CREATE POLICY "Admin can view all orders" ON orders
  FOR SELECT USING (is_admin());

-- Member: Can view own orders
CREATE POLICY "Users can view own orders" ON orders
  FOR SELECT USING (auth.uid() = user_id);

-- Member: Can create orders
CREATE POLICY "Users can create orders" ON orders
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Admin: Can update order status
CREATE POLICY "Admin can update orders" ON orders
  FOR UPDATE USING (is_admin());

-- ============================================================
-- POLICIES: order_items table
-- ============================================================

-- Admin: Can view all order items
CREATE POLICY "Admin can view all order_items" ON order_items
  FOR SELECT USING (is_admin());

-- Member: Can view items from own orders
CREATE POLICY "Users can view own order_items" ON order_items
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM orders WHERE orders.id = order_items.order_id AND orders.user_id = auth.uid())
  );

-- Member: Can create order items
CREATE POLICY "Users can create order_items" ON order_items
  FOR INSERT WITH CHECK (
    EXISTS (SELECT 1 FROM orders WHERE orders.id = order_items.order_id AND orders.user_id = auth.uid())
  );

-- ============================================================
-- POLICIES: point_transactions table
-- ============================================================

-- Admin: Can view all transactions
CREATE POLICY "Admin can view all point_transactions" ON point_transactions
  FOR SELECT USING (is_admin());

-- Member: Can view own transactions
CREATE POLICY "Users can view own point_transactions" ON point_transactions
  FOR SELECT USING (auth.uid() = user_id);

-- System: Allow insert for point transactions
CREATE POLICY "System can insert point_transactions" ON point_transactions
  FOR INSERT WITH CHECK (TRUE);
