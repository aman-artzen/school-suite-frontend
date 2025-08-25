-- Update user_role enum to include all required roles
ALTER TYPE user_role ADD VALUE IF NOT EXISTS 'accountant';
ALTER TYPE user_role ADD VALUE IF NOT EXISTS 'librarian';
ALTER TYPE user_role ADD VALUE IF NOT EXISTS 'transport_manager';