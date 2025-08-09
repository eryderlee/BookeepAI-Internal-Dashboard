-- Database setup for Equity Tracker
-- Run this in your Supabase SQL editor

-- Create the founder_equity table
CREATE TABLE IF NOT EXISTS founder_equity (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL UNIQUE,
  department VARCHAR(255) NOT NULL,
  equity_percentage DECIMAL(5,2) NOT NULL CHECK (equity_percentage >= 0 AND equity_percentage <= 100),
  work_hours INTEGER NOT NULL DEFAULT 0 CHECK (work_hours >= 0),
  work_summary TEXT,
  last_updated TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create an index on name for faster lookups
CREATE INDEX IF NOT EXISTS idx_founder_equity_name ON founder_equity(name);

-- Create an index on last_updated for sorting
CREATE INDEX IF NOT EXISTS idx_founder_equity_last_updated ON founder_equity(last_updated DESC);

-- Insert sample data
INSERT INTO founder_equity (name, department, equity_percentage, work_hours, work_summary) VALUES
('Khan', 'Sales', 33.3, 120, 'Client outreach, pipeline management, revenue tracking'),
('Sora', 'Onboarding', 33.3, 120, 'Client onboarding, process automation, dashboard setup'),
('Eden', 'Product', 33.4, 121, 'Feature development, technical architecture, bug fixes')
ON CONFLICT (name) DO UPDATE SET
  department = EXCLUDED.department,
  equity_percentage = EXCLUDED.equity_percentage,
  work_hours = EXCLUDED.work_hours,
  work_summary = EXCLUDED.work_summary,
  last_updated = NOW();

-- Create a function to update last_updated timestamp
CREATE OR REPLACE FUNCTION update_last_updated_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.last_updated = NOW();
    RETURN NEW;
END;
$$ LANGUAGE 'plpgsql';

-- Create a trigger to automatically update last_updated
DROP TRIGGER IF EXISTS update_founder_equity_last_updated ON founder_equity;
CREATE TRIGGER update_founder_equity_last_updated
    BEFORE UPDATE ON founder_equity
    FOR EACH ROW
    EXECUTE FUNCTION update_last_updated_column();

-- Row Level Security (RLS) - Enable for security
ALTER TABLE founder_equity ENABLE ROW LEVEL SECURITY;

-- Create policy to allow all operations for authenticated users
-- Adjust this policy based on your authentication requirements
CREATE POLICY "Allow all operations for authenticated users" ON founder_equity
    FOR ALL USING (auth.role() = 'authenticated');

-- Alternative: Allow all operations for anonymous users (for demo purposes)
-- Uncomment the next line if you want to allow anonymous access
-- CREATE POLICY "Allow all operations for anonymous users" ON founder_equity FOR ALL USING (true);

-- Create a view for easier data access (optional)
CREATE OR REPLACE VIEW founder_equity_summary AS
SELECT 
    id,
    name,
    department,
    equity_percentage,
    work_hours,
    work_summary,
    last_updated,
    created_at,
    -- Calculate relative percentage for display
    ROUND((equity_percentage / 100.0) * 100, 1) as display_percentage
FROM founder_equity
ORDER BY equity_percentage DESC, name ASC;