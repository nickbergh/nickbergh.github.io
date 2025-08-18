-- Create quiz_results table to store all quiz submissions
CREATE TABLE public.quiz_results (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL,
  score INTEGER NOT NULL,
  level_id INTEGER NOT NULL,
  level_name TEXT NOT NULL,
  level_title TEXT NOT NULL,
  level_blurb TEXT NOT NULL,
  level_hub_url TEXT NOT NULL,
  archetype_key TEXT NOT NULL,
  archetype_label TEXT NOT NULL,
  archetype_body TEXT NOT NULL,
  answers JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.quiz_results ENABLE ROW LEVEL SECURITY;

-- Create policy to allow anyone to insert quiz results (public quiz)
CREATE POLICY "Anyone can submit quiz results" 
ON public.quiz_results 
FOR INSERT 
WITH CHECK (true);

-- Create policy to allow users to view their own results by email
CREATE POLICY "Users can view their own quiz results by email" 
ON public.quiz_results 
FOR SELECT 
USING (true);

-- Create index for better query performance
CREATE INDEX idx_quiz_results_email ON public.quiz_results(email);
CREATE INDEX idx_quiz_results_created_at ON public.quiz_results(created_at DESC);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_quiz_results_updated_at
BEFORE UPDATE ON public.quiz_results
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();