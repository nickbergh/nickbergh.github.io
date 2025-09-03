-- Create events table to store Circle events
CREATE TABLE public.events (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  start_date TIMESTAMP WITH TIME ZONE NOT NULL,
  end_date TIMESTAMP WITH TIME ZONE,
  location TEXT,
  url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;

-- Create policy for public read access (events are public information)
CREATE POLICY "Events are publicly readable" 
ON public.events 
FOR SELECT 
USING (true);

-- Create policy for system-only writes
CREATE POLICY "Only system can manage events" 
ON public.events 
FOR ALL 
USING (false)
WITH CHECK (false);

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_events_updated_at
BEFORE UPDATE ON public.events
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create index for efficient date-based queries
CREATE INDEX idx_events_start_date ON public.events(start_date);

-- Enable pg_cron and pg_net extensions for scheduled functions
CREATE EXTENSION IF NOT EXISTS pg_cron;
CREATE EXTENSION IF NOT EXISTS pg_net;