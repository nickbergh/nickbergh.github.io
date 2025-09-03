-- Create a daily cron job to sync Circle events at 6 AM UTC
SELECT cron.schedule(
  'sync-circle-events-daily',
  '0 6 * * *', -- Daily at 6:00 AM UTC
  $$
  SELECT
    net.http_post(
        url:='https://mnfuhzczviyrutrhrvan.supabase.co/functions/v1/sync-circle-events',
        headers:='{"Content-Type": "application/json", "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1uZnVoemN6dml5cnV0cmhydmFuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU1NDQyNzgsImV4cCI6MjA3MTEyMDI3OH0.gcg1vpZdhaGCC764i9cx99e2Si2yFrvTsKd0HkDD7BI"}'::jsonb,
        body:='{"triggered_by": "cron", "time": "' || now() || '"}'::jsonb
    ) as request_id;
  $$
);