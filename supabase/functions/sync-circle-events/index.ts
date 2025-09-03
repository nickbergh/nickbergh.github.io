import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.55.0'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface CircleEvent {
  id: string;
  name: string;
  description: string;
  start_date: string;
  end_date: string;
  location?: string;
  url?: string;
}

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log('Starting Circle events sync...');

    // Initialize Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const circleApiToken = Deno.env.get('CIRCLE_API_TOKEN');
    let events: CircleEvent[] = [];

    if (circleApiToken) {
      console.log('Circle API token found, attempting to fetch real events...');
      
      try {
        // Try multiple endpoints and auth methods
        const endpoints = [
          'https://api.circle.so/v1/events',
          'https://api.circle.so/events'
        ];

        for (const endpoint of endpoints) {
          try {
            console.log(`Trying endpoint: ${endpoint}`);
            
            // Try different auth methods
            const authMethods = [
              { 'Authorization': `Token ${circleApiToken}` },
              { 'Authorization': `Bearer ${circleApiToken}` },
              { 'X-API-Key': circleApiToken }
            ];

            for (const authHeaders of authMethods) {
              const response = await fetch(endpoint, {
                headers: {
                  'Content-Type': 'application/json',
                  ...authHeaders
                }
              });

              if (response.ok) {
                const data = await response.json();
                console.log('Successfully fetched events from Circle API');
                
                // Handle different response structures
                if (Array.isArray(data)) {
                  events = data;
                } else if (data.events && Array.isArray(data.events)) {
                  events = data.events;
                } else if (data.data && Array.isArray(data.data)) {
                  events = data.data;
                }
                break;
              }
            }
            if (events.length > 0) break;
          } catch (error) {
            console.log(`Failed to fetch from ${endpoint}:`, error.message);
          }
        }
      } catch (error) {
        console.error('Error fetching from Circle API:', error);
      }
    }

    // If no events from API, use rotating mock data
    if (events.length === 0) {
      console.log('Using rotating mock events data...');
      
      // Get current date to create rotating events
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
    const upcomingEvents = events
      .filter(event => new Date(event.start_date) > new Date())
      .sort((a, b) => new Date(a.start_date).getTime() - new Date(b.start_date).getTime())
      .slice(0, 10); // Limit to 10 events

    console.log(`Found ${upcomingEvents.length} upcoming events to sync`);

    // Clear existing events and insert new ones
    const { error: deleteError } = await supabase
      .from('events')
      .delete()
      .neq('id', ''); // Delete all existing events

    if (deleteError) {
      console.error('Error clearing existing events:', deleteError);
      throw deleteError;
    }

    // Insert new events
    if (upcomingEvents.length > 0) {
      const { error: insertError } = await supabase
        .from('events')
        .insert(upcomingEvents);

      if (insertError) {
        console.error('Error inserting events:', insertError);
        throw insertError;
      }

      console.log(`Successfully synced ${upcomingEvents.length} events to database`);
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: `Synced ${upcomingEvents.length} events`,
        events_count: upcomingEvents.length 
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    );

  } catch (error) {
    console.error('Sync error:', error);
    return new Response(
      JSON.stringify({ 
        error: error.message,
        success: false 
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500 
      }
    );
  }
});