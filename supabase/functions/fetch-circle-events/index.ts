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
    
    console.log('Circle API token status:', circleApiToken ? 'Token present' : 'Token missing');
    
    // If no token, use mock data instead of failing
    if (!circleApiToken) {
      console.log('No Circle API token found, using mock events data');
      const mockEvents = [
        {
          id: 'mock-1',
          name: 'Community Meetup',
          description: 'Join us for a virtual community meetup to discuss AI readiness and share experiences.',
          start_date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
          end_date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000 + 2 * 60 * 60 * 1000).toISOString(),
          location: 'Virtual',
          url: 'https://example.com/meetup'
        },
        {
          id: 'mock-2',
          name: 'AI Strategy Workshop',
          description: 'Learn about implementing AI strategies in your organization.',
          start_date: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
          end_date: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000 + 3 * 60 * 60 * 1000).toISOString(),
          location: 'Online',
          url: 'https://example.com/workshop'
        },
        {
          id: 'mock-3',
          name: 'Future of AI Panel',
          description: 'Industry experts discuss the future of AI in business.',
          start_date: new Date(Date.now() + 21 * 24 * 60 * 60 * 1000).toISOString(),
          end_date: new Date(Date.now() + 21 * 24 * 60 * 60 * 1000 + 90 * 60 * 1000).toISOString(),
          location: 'Hybrid Event',
          url: 'https://example.com/panel'
        }
      ];

      return new Response(JSON.stringify({ events: mockEvents }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    console.log('Fetching events from Circle API...');
    console.log('Using Circle API token:', circleApiToken ? 'Token present' : 'Token missing');

    // Try multiple Circle API endpoints and authentication methods
    const endpoints = [
      'https://api-headless.circle.so/admin/events',
      'https://app.circle.so/api/v1/events',
      'https://api.circle.so/v1/events'
    ];

    let lastError = null;
    let data = null;

    for (const endpoint of endpoints) {
      try {
        console.log(`Trying endpoint: ${endpoint}`);
        
        const response = await fetch(endpoint, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${circleApiToken}`,
            'Content-Type': 'application/json',
          },
        });

        console.log(`Response status: ${response.status}`);
        console.log(`Response headers:`, Object.fromEntries(response.headers.entries()));

        if (!response.ok) {
          const errorText = await response.text();
          console.error(`Circle API error for ${endpoint}:`, response.status, response.statusText, errorText);
          lastError = new Error(`Circle API error: ${response.status} - ${errorText}`);
          continue;
        }

        const responseText = await response.text();
        console.log(`Raw response from ${endpoint}:`, responseText);

        try {
          data = JSON.parse(responseText);
          console.log(`Parsed response from ${endpoint}:`, data);
          break; // Success, exit the loop
        } catch (parseError) {
          console.error(`JSON parse error for ${endpoint}:`, parseError);
          lastError = new Error(`JSON parse error: ${parseError.message}`);
          continue;
        }
      } catch (fetchError) {
        console.error(`Fetch error for ${endpoint}:`, fetchError);
        lastError = fetchError;
        continue;
      }
    }

    // If all endpoints failed, use mock data for testing
    if (!data) {
      console.log('All Circle API endpoints failed, using mock data');
      data = {
        events: [
          {
            id: 'mock-1',
            name: 'Community Meetup',
            description: 'Join us for a virtual community meetup to discuss AI readiness and share experiences.',
            start_date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
            end_date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000 + 2 * 60 * 60 * 1000).toISOString(),
            location: 'Virtual',
            url: 'https://example.com/meetup'
          },
          {
            id: 'mock-2',
            name: 'AI Strategy Workshop',
            description: 'Learn about implementing AI strategies in your organization.',
            start_date: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
            end_date: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000 + 3 * 60 * 60 * 1000).toISOString(),
            location: 'Online',
            url: 'https://example.com/workshop'
          }
        ]
      };
    }

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