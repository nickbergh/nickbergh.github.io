import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface CircleEvent {
  id: string;
  name: string;
  description: string;
  start_date: string;
  end_date: string;
  location?: string;
  url?: string;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const circleApiToken = Deno.env.get('CIRCLE_API_TOKEN');
    
    if (!circleApiToken) {
      throw new Error('Circle API token not configured');
    }

    console.log('Fetching events from Circle API...');
    console.log('Using Circle API token:', circleApiToken ? 'Token present' : 'Token missing');

    // Fetch events from Circle API using correct endpoint and auth format
    const response = await fetch('https://api-headless.circle.so/admin/events', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${circleApiToken}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      console.error('Circle API error:', response.status, response.statusText);
      throw new Error(`Circle API error: ${response.status}`);
    }

    const data = await response.json();
    console.log('Circle API response:', data);

    // Filter for upcoming events and limit to 3
    const now = new Date();
    const upcomingEvents = (data.events || [])
      .filter((event: CircleEvent) => new Date(event.start_date) > now)
      .sort((a: CircleEvent, b: CircleEvent) => 
        new Date(a.start_date).getTime() - new Date(b.start_date).getTime()
      )
      .slice(0, 3);

    return new Response(JSON.stringify({ events: upcomingEvents }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in fetch-circle-events function:', error);
    return new Response(
      JSON.stringify({ 
        error: error.message,
        events: [] // Return empty array as fallback
      }), 
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});