import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { CircleEvent, EventsResponse } from '@/types/events';

export const useCircleEvents = () => {
  const [events, setEvents] = useState<CircleEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        setError(null);

        const { data, error: functionError } = await supabase.functions.invoke('fetch-circle-events');

        if (functionError) {
          throw new Error(functionError.message);
        }

        const response = data as EventsResponse;
        
        if (response.error) {
          throw new Error(response.error);
        }

        setEvents(response.events || []);
      } catch (err) {
        console.error('Error fetching Circle events:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch events');
        setEvents([]); // Set empty array on error
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  return { events, loading, error };
};