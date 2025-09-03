import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.55.0'

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
    console.log('Fetching events from database...');

    // Initialize Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseAnonKey = Deno.env.get('SUPABASE_ANON_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseAnonKey);

    // Try to fetch events from database first
    const { data: dbEvents, error: dbError } = await supabase
      .from('events')
      .select('*')
      .gte('start_date', new Date().toISOString())
      .order('start_date', { ascending: true })
      .limit(3);

    if (dbError) {
      console.error('Database error:', dbError);
      throw dbError;
    }

    let events: CircleEvent[] = [];

    if (dbEvents && dbEvents.length > 0) {
      console.log(`Found ${dbEvents.length} events in database`);
      events = dbEvents;
    } else {
      console.log('No events in database, falling back to API/mock data...');
      
      const circleApiToken = Deno.env.get('CIRCLE_API_TOKEN');
      console.log('Circle API token status:', circleApiToken ? 'Token present' : 'Token missing');

      if (circleApiToken) {
        console.log('Attempting to fetch events from Circle API...');
        
        // Try Circle API endpoints with proper authentication
        const endpoints = [
          {
            url: 'https://app.circle.so/api/v1/events',
            authHeader: `Token ${circleApiToken}`
          },
          {
            url: 'https://api-headless.circle.so/admin/events', 
            authHeader: `Bearer ${circleApiToken}`
          },
          {
            url: 'https://api-v1.circle.so/events',
            authHeader: `Token ${circleApiToken}`
          }
        ];

        let lastError = null;
        let data = null;

        for (const { url, authHeader } of endpoints) {
          try {
            console.log(`Trying endpoint: ${url} with auth format: ${authHeader.split(' ')[0]}`);
            
            const response = await fetch(url, {
              method: 'GET',
              headers: {
                'Authorization': authHeader,
                'Content-Type': 'application/json',
                'Accept': 'application/json'
              },
            });

            console.log(`Response status for ${url}: ${response.status}`);

            if (!response.ok) {
              const errorText = await response.text();
              console.error(`Circle API error for ${url}:`, response.status, response.statusText, errorText);
              lastError = new Error(`Circle API error: ${response.status} - ${errorText}`);
              continue;
            }

            const responseText = await response.text();
            console.log(`Raw response from ${url}:`, responseText.substring(0, 500));

            try {
              const parsedData = JSON.parse(responseText);
              console.log(`Successfully parsed response from ${url}:`, Object.keys(parsedData));
              
              // Handle different possible response formats
              if (Array.isArray(parsedData)) {
                data = { events: parsedData };
              } else if (parsedData.events) {
                data = parsedData;
              } else if (parsedData.data?.events) {
                data = { events: parsedData.data.events };
              } else {
                data = parsedData;
              }
              
              console.log(`Processed data structure:`, data);
              break; // Success, exit the loop
            } catch (parseError) {
              console.error(`JSON parse error for ${url}:`, parseError);
              lastError = new Error(`JSON parse error: ${parseError.message}`);
              continue;
            }
          } catch (fetchError) {
            console.error(`Fetch error for ${url}:`, fetchError);
            lastError = fetchError;
            continue;
          }
        }

        if (data) {
          events = data.events || [];
        }
      }

      // If Circle API failed or no token, use rotating mock data
      if (events.length === 0) {
        console.log('Using rotating mock events data...');
        
        // Generate rotating mock events based on current date
        const now = new Date();
        const nextWeek = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
        const nextMonth = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);
        const twoMonths = new Date(now.getTime() + 60 * 24 * 60 * 60 * 1000);

        events = [
          {
            id: 'ai-automation-intro',
            name: 'Introduction to AI Automation for Families',
            description: 'Learn how to implement simple AI automation tools that can help streamline your family\'s daily routines, from managing calendars to organizing household tasks.',
            start_date: nextWeek.toISOString(),
            end_date: new Date(nextWeek.getTime() + 2 * 60 * 60 * 1000).toISOString(),
            location: 'Virtual Event - Zoom',
            url: 'https://example.com/events/ai-automation-intro'
          },
          {
            id: 'kids-ai-safety-workshop',
            name: 'AI Safety & Digital Literacy for Kids',
            description: 'A comprehensive workshop for parents and children (ages 8-16) covering AI safety, privacy, and developing healthy relationships with AI tools.',
            start_date: nextMonth.toISOString(),
            end_date: new Date(nextMonth.getTime() + 1.5 * 60 * 60 * 1000).toISOString(),
            location: 'Community Center - Main Hall',
            url: 'https://example.com/events/kids-ai-safety'
          },
          {
            id: 'family-tech-planning',
            name: 'Family Technology Planning Session',
            description: 'Interactive session to help families create personalized technology adoption plans that align with their values and goals.',
            start_date: twoMonths.toISOString(),
            end_date: new Date(twoMonths.getTime() + 3 * 60 * 60 * 1000).toISOString(),
            location: 'Virtual Event - Zoom',
            url: 'https://example.com/events/family-tech-planning'
          }
        ];
      }

      // Filter for upcoming events and sort by start date
      events = events
        .filter(event => new Date(event.start_date) > new Date())
        .sort((a, b) => new Date(a.start_date).getTime() - new Date(b.start_date).getTime())
        .slice(0, 3);
    }

    console.log(`Returning ${events.length} upcoming events`);

    return new Response(JSON.stringify({ events }), {
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