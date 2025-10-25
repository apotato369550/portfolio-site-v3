-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- GitHub Commits Table
CREATE TABLE github_commits (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  last_commit_message TEXT NOT NULL,
  date VARCHAR(100) NOT NULL,
  url VARCHAR(500) NOT NULL,
  stars INTEGER NOT NULL DEFAULT 0,
  forks INTEGER NOT NULL DEFAULT 0,
  language VARCHAR(100),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- GitHub Projects Table
CREATE TABLE github_projects (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  image VARCHAR(500) NOT NULL,
  github_url VARCHAR(500) NOT NULL,
  tech_stack JSONB NOT NULL DEFAULT '[]'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- LeetCode Submissions Table
CREATE TABLE leetcode_submissions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  problem_name VARCHAR(255) NOT NULL,
  submission_date VARCHAR(100) NOT NULL,
  submission_status VARCHAR(100) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- DataCamp Courses Table
CREATE TABLE datacamp_courses (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  course_title VARCHAR(255) NOT NULL,
  course_description TEXT NOT NULL,
  date_completed VARCHAR(100) NOT NULL,
  certificate_url VARCHAR(500) NOT NULL,
  image_url VARCHAR(500) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- DataCamp Projects Table
CREATE TABLE datacamp_projects (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_title VARCHAR(255) NOT NULL,
  project_description TEXT NOT NULL,
  project_image VARCHAR(500),
  project_url VARCHAR(500),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for common queries
CREATE INDEX idx_github_commits_date ON github_commits(date DESC);
CREATE INDEX idx_github_commits_stars ON github_commits(stars DESC);
CREATE INDEX idx_github_projects_name ON github_projects(name);
CREATE INDEX idx_leetcode_submissions_date ON leetcode_submissions(submission_date DESC);
CREATE INDEX idx_datacamp_courses_date ON datacamp_courses(date_completed DESC);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply updated_at triggers to all tables
CREATE TRIGGER update_github_commits_updated_at BEFORE UPDATE ON github_commits
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_github_projects_updated_at BEFORE UPDATE ON github_projects
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_leetcode_submissions_updated_at BEFORE UPDATE ON leetcode_submissions
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_datacamp_courses_updated_at BEFORE UPDATE ON datacamp_courses
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_datacamp_projects_updated_at BEFORE UPDATE ON datacamp_projects
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Enable RLS on all tables
ALTER TABLE github_commits ENABLE ROW LEVEL SECURITY;
ALTER TABLE github_projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE leetcode_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE datacamp_courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE datacamp_projects ENABLE ROW LEVEL SECURITY;

-- Allow public read access (portfolio is public)
CREATE POLICY "Allow public read access" ON github_commits
  FOR SELECT USING (true);

CREATE POLICY "Allow public read access" ON github_projects
  FOR SELECT USING (true);

CREATE POLICY "Allow public read access" ON leetcode_submissions
  FOR SELECT USING (true);

CREATE POLICY "Allow public read access" ON datacamp_courses
  FOR SELECT USING (true);

CREATE POLICY "Allow public read access" ON datacamp_projects
  FOR SELECT USING (true);

-- Allow service role to insert/update/delete (for API routes)
CREATE POLICY "Allow service role full access" ON github_commits
  FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "Allow service role full access" ON github_projects
  FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "Allow service role full access" ON leetcode_submissions
  FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "Allow service role full access" ON datacamp_courses
  FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "Allow service role full access" ON datacamp_projects
  FOR ALL USING (auth.role() = 'service_role');
