-- Optional: Create cron execution logs table
CREATE TABLE cron_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  job_name VARCHAR(100) NOT NULL,
  status VARCHAR(20) NOT NULL,
  details TEXT,
  executed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for common queries
CREATE INDEX idx_cron_logs_executed_at ON cron_logs(executed_at DESC);
CREATE INDEX idx_cron_logs_job_name ON cron_logs(job_name);

-- Enable RLS
ALTER TABLE cron_logs ENABLE ROW LEVEL SECURITY;

-- Only service role can access
CREATE POLICY "Only service role can access" ON cron_logs
  FOR ALL USING (auth.role() = 'service_role');
