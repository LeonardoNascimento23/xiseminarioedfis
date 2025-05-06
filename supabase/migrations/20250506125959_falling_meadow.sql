/*
  # Content Management System Tables

  1. New Tables
    - `lectures`
      - `id` (uuid, primary key)
      - `title` (text)
      - `speaker` (text)
      - `speaker_bio` (text)
      - `description` (text)
      - `date` (date)
      - `time` (text)
      - `location` (text)
      - `image_url` (text)
      - `max_participants` (integer)
      - `current_participants` (integer)
      - `learning_points` (text[])
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
      - `published` (boolean)

    - `news`
      - `id` (uuid, primary key)
      - `title` (text)
      - `content` (text)
      - `summary` (text)
      - `date` (date)
      - `author` (text)
      - `category` (text)
      - `image_url` (text)
      - `tags` (text[])
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
      - `published` (boolean)

    - `gallery`
      - `id` (uuid, primary key)
      - `url` (text)
      - `description` (text)
      - `category` (text)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for public read access to published content
    - Add policies for admin write access
*/

-- Lectures table
CREATE TABLE IF NOT EXISTS lectures (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  speaker text NOT NULL,
  speaker_bio text,
  description text NOT NULL,
  date date NOT NULL,
  time text NOT NULL,
  location text NOT NULL,
  image_url text,
  max_participants integer NOT NULL DEFAULT 0,
  current_participants integer NOT NULL DEFAULT 0,
  learning_points text[],
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  published boolean DEFAULT false
);

ALTER TABLE lectures ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view published lectures"
  ON lectures
  FOR SELECT
  USING (published = true);

CREATE POLICY "Admins can manage lectures"
  ON lectures
  FOR ALL
  TO authenticated
  USING ((auth.jwt() ->> 'role'::text) = 'admin'::text);

-- News table
CREATE TABLE IF NOT EXISTS news (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  content text NOT NULL,
  summary text,
  date date NOT NULL,
  author text NOT NULL,
  category text NOT NULL,
  image_url text,
  tags text[],
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  published boolean DEFAULT false
);

ALTER TABLE news ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view published news"
  ON news
  FOR SELECT
  USING (published = true);

CREATE POLICY "Admins can manage news"
  ON news
  FOR ALL
  TO authenticated
  USING ((auth.jwt() ->> 'role'::text) = 'admin'::text);

-- Gallery table
CREATE TABLE IF NOT EXISTS gallery (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  url text NOT NULL,
  description text,
  category text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE gallery ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view gallery items"
  ON gallery
  FOR SELECT
  USING (true);

CREATE POLICY "Admins can manage gallery"
  ON gallery
  FOR ALL
  TO authenticated
  USING ((auth.jwt() ->> 'role'::text) = 'admin'::text);