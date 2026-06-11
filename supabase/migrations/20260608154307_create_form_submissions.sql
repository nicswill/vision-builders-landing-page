
CREATE TABLE rsvps (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  first_name text NOT NULL,
  last_name text NOT NULL,
  email text NOT NULL,
  phone text,
  bringing_a_bro boolean DEFAULT false,
  bro_name text,
  heard_from text,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE mentor_applications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  first_name text NOT NULL,
  last_name text NOT NULL,
  email text NOT NULL,
  phone text,
  city_state text,
  profession text NOT NULL,
  focus_areas text[],
  why_mentor text NOT NULL,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE sponsor_applications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  first_name text NOT NULL,
  last_name text NOT NULL,
  organization text NOT NULL,
  email text NOT NULL,
  phone text,
  partnership_level text,
  message text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE rsvps ENABLE ROW LEVEL SECURITY;
ALTER TABLE mentor_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE sponsor_applications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "insert_rsvps" ON rsvps FOR INSERT TO anon WITH CHECK (true);
CREATE POLICY "insert_mentor_applications" ON mentor_applications FOR INSERT TO anon WITH CHECK (true);
CREATE POLICY "insert_sponsor_applications" ON sponsor_applications FOR INSERT TO anon WITH CHECK (true);
