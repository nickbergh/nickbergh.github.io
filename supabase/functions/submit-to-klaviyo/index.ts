import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const klaviyoApiKey = Deno.env.get('KLAVIYO_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { email, score, level, archetype, answers } = await req.json();

    console.log('Submitting to Klaviyo:', { email, score, level: level.name, archetype: archetype.key });

    if (!klaviyoApiKey) {
      throw new Error('KLAVIYO_API_KEY is not configured');
    }

    // Prepare profile data with custom properties
    const profileData = {
      data: {
        type: "profile",
        attributes: {
          email: email,
          properties: {
            ai_readiness_score: score,
            ai_readiness_level: level.id,
            ai_readiness_level_name: level.name,
            ai_readiness_level_title: level.title,
            ai_readiness_level_blurb: level.blurb,
            archetype_key: archetype.key,
            archetype_label: archetype.label,
            archetype_body: archetype.body,
            quiz_completion_date: new Date().toISOString(),
            // Individual question answers for granular segmentation
            q1_answer: answers.q1,
            q2_answer: answers.q2,
            q3_answer: answers.q3,
            q4_answer: answers.q4,
            q5_answer: answers.q5,
            q6_answer: answers.q6,
          }
        }
      }
    };

    // Create or update profile in Klaviyo
    const profileResponse = await fetch('https://a.klaviyo.com/api/profiles/', {
      method: 'POST',
      headers: {
        'Authorization': `Klaviyo-API-Key ${klaviyoApiKey}`,
        'Content-Type': 'application/json',
        'revision': '2024-10-15'
      },
      body: JSON.stringify(profileData)
    });

    if (!profileResponse.ok) {
      const error = await profileResponse.text();
      console.error('Klaviyo profile creation failed:', error);
      throw new Error(`Klaviyo profile creation failed: ${profileResponse.status}`);
    }

    const profile = await profileResponse.json();
    const profileId = profile.data.id;
    console.log('Profile created/updated:', profileId);

    // Add to main quiz completers list with tags
    const listData = {
      data: [
        {
          type: "profile",
          id: profileId
        }
      ]
    };

    // Replace with your actual Klaviyo list ID for quiz completers
    const listId = 'RDLrYp'; // You'll need to update this with your actual list ID

    try {
      const listResponse = await fetch(`https://a.klaviyo.com/api/lists/${listId}/relationships/profiles/`, {
        method: 'POST',
        headers: {
          'Authorization': `Klaviyo-API-Key ${klaviyoApiKey}`,
          'Content-Type': 'application/json',
          'revision': '2024-10-15'
        },
        body: JSON.stringify(listData)
      });

      if (!listResponse.ok) {
        console.error('List subscription failed, but profile was created');
      } else {
        console.log('Profile added to quiz list successfully');
      }
    } catch (error) {
      console.error('List subscription error:', error);
    }

    // Create quiz completion event
    const eventData = {
      data: {
        type: "event",
        attributes: {
          properties: {
            score: score,
            level_id: level.id,
            level_name: level.name,
            level_title: level.title,
            archetype_key: archetype.key,
            archetype_label: archetype.label,
            answers: answers
          },
          metric: {
            data: {
              type: "metric",
              attributes: {
                name: "Quiz Completed"
              }
            }
          },
          profile: {
            data: {
              type: "profile",
              attributes: {
                email: email
              }
            }
          }
        }
      }
    };

    const eventResponse = await fetch('https://a.klaviyo.com/api/events/', {
      method: 'POST',
      headers: {
        'Authorization': `Klaviyo-API-Key ${klaviyoApiKey}`,
        'Content-Type': 'application/json',
        'revision': '2024-10-15'
      },
      body: JSON.stringify(eventData)
    });

    if (!eventResponse.ok) {
      console.error('Event creation failed, but profile was created');
    } else {
      console.log('Quiz completion event created successfully');
    }

    return new Response(JSON.stringify({ 
      success: true, 
      profileId: profileId,
      message: 'Data submitted to Klaviyo successfully' 
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in submit-to-klaviyo function:', error);
    return new Response(JSON.stringify({ 
      error: error.message || 'Failed to submit to Klaviyo' 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});