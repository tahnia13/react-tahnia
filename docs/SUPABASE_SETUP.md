# Supabase Setup Instructions

Sebelum menjalankan aplikasi, ikuti langkah-langkah ini untuk setup Supabase:

## Step 1: Create Supabase Project

1. Buka [Supabase Console](https://app.supabase.com)
2. Buat project baru
3. Tunggu project siap

## Step 2: Get Credentials

1. Buka Settings → API
2. Copy `Project URL` dan `anon public key`
3. Paste ke file `.env`:
   ```
   VITE_SUPABASE_URL=your_project_url
   VITE_SUPABASE_ANON_KEY=your_anon_key
   ```

## Step 3: Create Database Schema

1. Buka Supabase Console → SQL Editor
2. Buat query baru
3. Copy semua SQL dari file `docs/DATABASE_SCHEMA.sql`
4. Jalankan (Run)
5. Tunggu berhasil

## Step 4: Setup RLS Policies

1. Buka SQL Editor lagi
2. Copy semua SQL dari file `docs/RLS_POLICIES.sql`
3. Jalankan

## Step 5: Setup Triggers & Functions

1. Buka SQL Editor lagi
2. Copy semua SQL dari file `docs/TRIGGERS_AND_FUNCTIONS.sql`
3. Jalankan

## Step 6: (Optional) Seed Data

Untuk testing, jalankan SQL seed data dari file `docs/SEED_DATA.sql`

## Step 7: Run Application

```bash
npm install
npm run dev
```

## Testing Akun

**Admin:**
- Email: admin@example.com
- Password: admin123 (atau yang Anda set)

**Member:**
- Daftar via aplikasi di `/register`
- Login di `/login`

## Troubleshooting

### Error: VITE_SUPABASE_URL is missing
- Pastikan file `.env` sudah dibuat
- Restart dev server setelah update `.env`

### Error: Tables not found
- Pastikan semua SQL scripts sudah dijalankan di order yang benar
- Check Supabase console untuk melihat tables yang dibuat

### Error: RLS Policy denied
- Pastikan RLS policies sudah di-enable
- Check Auth settings di Supabase

---

**Status:** ✅ Ready to setup
