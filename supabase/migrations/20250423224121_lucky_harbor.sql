/*
  # Create pages table for CMS

  1. New Tables
    - `pages`
      - `id` (uuid, primary key)
      - `slug` (text, unique)
      - `title` (text)
      - `content` (text)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
      - `published` (boolean)
  2. Security
    - Enable RLS on `pages` table
    - Add policies for public read access
    - Add policies for authenticated admin write access
*/

CREATE TABLE IF NOT EXISTS pages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text UNIQUE NOT NULL,
  title text NOT NULL,
  content text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  published boolean DEFAULT false
);

ALTER TABLE pages ENABLE ROW LEVEL SECURITY;

-- Allow public read access to published pages
CREATE POLICY "Public can view published pages"
  ON pages
  FOR SELECT
  USING (published = true);

-- Allow admin users to manage pages
CREATE POLICY "Admins can manage pages"
  ON pages
  FOR ALL
  TO authenticated
  USING (auth.jwt() ->> 'role' = 'admin');