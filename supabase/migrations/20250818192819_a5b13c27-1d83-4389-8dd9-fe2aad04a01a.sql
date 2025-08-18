-- Drop the overly permissive SELECT policy
DROP POLICY "Users can view their own quiz results by email" ON public.quiz_results;

-- Create a new restrictive SELECT policy that only allows admins/system to read data
-- For a public quiz, regular users don't need to query their results via the API
CREATE POLICY "Only system can view quiz results" 
ON public.quiz_results 
FOR SELECT 
USING (false); -- No public SELECT access

-- The INSERT policy remains the same (anyone can submit quiz results)
-- This maintains the public quiz functionality while protecting user data