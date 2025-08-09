# Supabase Setup for Equity Tracker

This guide will help you set up Supabase integration for the Equity Tracker feature.

## Prerequisites

1. A Supabase account ([sign up here](https://supabase.com))
2. A Supabase project created

## Setup Steps

### 1. Create Supabase Project

1. Go to [Supabase Dashboard](https://supabase.com/dashboard)
2. Click "New project"
3. Fill in your project details
4. Wait for the project to be ready

### 2. Get Your Project Credentials

1. Go to your project settings
2. Navigate to "API" section
3. Copy the following values:
   - **Project URL** (something like `https://your-project-ref.supabase.co`)
   - **Anon key** (public key starting with `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`)

### 3. Configure Environment Variables

1. Open the `.env.local` file in the project root
2. Replace the placeholder values:

```env
# Supabase Configuration
VITE_SUPABASE_URL=https://your-project-ref.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...your-anon-key
```

### 4. Set Up the Database

1. Go to your Supabase project dashboard
2. Navigate to "SQL Editor"
3. Copy the contents of `database-setup.sql` and run it
4. This will create:
   - `founder_equity` table with the proper schema
   - Sample data for Khan, Sora, and Eden
   - Proper indexes and triggers
   - Row Level Security policies

### 5. Test the Integration

1. Start your development server: `npm run dev`
2. Navigate to `/equity` in your application
3. You should see the equity data loaded from Supabase
4. Try refreshing the page - data should persist

## Features

### Real-time Updates
- The component automatically subscribes to database changes
- Any updates to the `founder_equity` table will be reflected immediately
- Multiple users can view real-time updates simultaneously

### Available Operations
- **Read**: Fetch all founder equity data
- **Update**: Modify work hours, summaries, and equity percentages
- **Insert**: Add new founders
- **Delete**: Remove founders
- **Real-time subscriptions**: Live updates

### Database Schema

```sql
founder_equity (
  id UUID PRIMARY KEY,
  name VARCHAR(255) UNIQUE,
  department VARCHAR(255),
  equity_percentage DECIMAL(5,2),
  work_hours INTEGER,
  work_summary TEXT,
  last_updated TIMESTAMPTZ,
  created_at TIMESTAMPTZ
)
```

## Troubleshooting

### Common Issues

1. **"Missing Supabase environment variables" error**
   - Check that your `.env.local` file has the correct values
   - Restart your development server after changing environment variables

2. **"Database Connection Error"**
   - Verify your Supabase URL and API key are correct
   - Check that your project is active and not paused
   - Ensure the database table exists (run the SQL setup)

3. **"Permission denied" errors**
   - Check your Row Level Security policies
   - For development, you can temporarily use the anonymous access policy

### Development vs Production

For development, the current setup allows anonymous access to the data. For production, you should:

1. Set up Supabase authentication
2. Update the RLS policies to require authentication
3. Add proper user management

## Next Steps

- Set up Supabase authentication for user management
- Add data validation and constraints
- Implement audit logging for equity changes
- Add backup and recovery procedures