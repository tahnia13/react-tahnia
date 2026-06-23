-- ============================================================
-- TRIGGERS & FUNCTIONS - Sedap Admin Dashboard
-- Execute all scripts in Supabase SQL Editor after RLS_POLICIES.sql
-- ============================================================

-- ============================================================
-- FUNCTION: calculate_tier(points INTEGER) -> tier name
-- ============================================================
CREATE OR REPLACE FUNCTION calculate_tier(points INTEGER)
RETURNS TEXT AS $$
BEGIN
  IF points >= 1000 THEN RETURN 'Platinum';
  ELSIF points >= 500 THEN RETURN 'Gold';
  ELSIF points >= 100 THEN RETURN 'Silver';
  ELSE RETURN 'Bronze';
  END IF;
END;
$$ LANGUAGE plpgsql;

-- ============================================================
-- FUNCTION: generate_order_number() -> auto generate order number
-- ============================================================
CREATE OR REPLACE FUNCTION generate_order_number()
RETURNS TRIGGER AS $$
DECLARE
  date_part TEXT;
  seq_part TEXT;
BEGIN
  date_part := TO_CHAR(NOW(), 'YYYYMMDD');
  seq_part := LPAD((SELECT COUNT(*) + 1 FROM orders WHERE created_at::DATE = NOW()::DATE)::TEXT, 4, '0');
  NEW.order_number := 'ORD-' || date_part || '-' || seq_part;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- ============================================================
-- TRIGGER: Before INSERT on orders -> auto generate order_number
-- ============================================================
CREATE TRIGGER trigger_generate_order_number
  BEFORE INSERT ON orders
  FOR EACH ROW
  EXECUTE FUNCTION generate_order_number();

-- ============================================================
-- FUNCTION: update_user_points_and_tier()
-- Called when order status changes to 'completed'
-- ============================================================
CREATE OR REPLACE FUNCTION update_user_points_and_tier()
RETURNS TRIGGER AS $$
DECLARE
  points_earned INTEGER;
  current_tier TEXT;
  tier_rate INTEGER;
  current_points INTEGER;
BEGIN
  -- Only process if status changes to 'completed'
  IF NEW.status = 'completed' AND OLD.status != 'completed' THEN
    -- Get user's current tier
    SELECT tier INTO current_tier FROM profiles WHERE id = NEW.user_id;
    
    -- Determine tier rate
    CASE current_tier
      WHEN 'Bronze' THEN tier_rate := 5;
      WHEN 'Silver' THEN tier_rate := 10;
      WHEN 'Gold' THEN tier_rate := 15;
      WHEN 'Platinum' THEN tier_rate := 20;
      ELSE tier_rate := 5;
    END CASE;
    
    -- Calculate points earned
    points_earned := FLOOR(NEW.total_amount::NUMERIC * (tier_rate / 100.0))::INTEGER;
    
    -- Update points and tier in profiles
    UPDATE profiles 
    SET 
      points_balance = points_balance + points_earned,
      tier = calculate_tier(points_balance + points_earned),
      updated_at = NOW()
    WHERE id = NEW.user_id
    RETURNING points_balance INTO current_points;
    
    -- Insert transaction record
    INSERT INTO point_transactions (
      user_id, 
      order_id, 
      points_change, 
      description, 
      transaction_type
    ) VALUES (
      NEW.user_id,
      NEW.id,
      points_earned,
      'Earned ' || points_earned || ' points from order #' || NEW.order_number,
      'earned'
    );
    
    -- Update points_earned field in orders
    NEW.points_earned := points_earned;
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- ============================================================
-- TRIGGER: After UPDATE of status on orders
-- Trigger point calculation when order is completed
-- ============================================================
CREATE TRIGGER trigger_update_user_points
  AFTER UPDATE OF status ON orders
  FOR EACH ROW
  EXECUTE FUNCTION update_user_points_and_tier();

-- ============================================================
-- FUNCTION: handle_updated_at()
-- Auto update the updated_at timestamp on any table update
-- ============================================================
CREATE OR REPLACE FUNCTION handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at := NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- ============================================================
-- TRIGGERS: Auto update updated_at timestamps
-- ============================================================
CREATE TRIGGER trigger_profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW
  EXECUTE FUNCTION handle_updated_at();

CREATE TRIGGER trigger_products_updated_at
  BEFORE UPDATE ON products
  FOR EACH ROW
  EXECUTE FUNCTION handle_updated_at();

CREATE TRIGGER trigger_orders_updated_at
  BEFORE UPDATE ON orders
  FOR EACH ROW
  EXECUTE FUNCTION handle_updated_at();
