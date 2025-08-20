import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { QuizResult } from '@/types/quiz';
import { levels, archetypes, momentumText } from '@/data/quizData';
import { ArrowRight, RotateCcw } from 'lucide-react';
import { useCircleEvents } from '@/hooks/useCircleEvents';
import EventCard from '@/components/EventCard';

const Results = () => {
  const [result, setResult] = useState<QuizResult | null>(null);
  const { events, loading: eventsLoading, error: eventsError } = useCircleEvents();

  // Calculate progress to next level
  const calculateProgressToNextLevel = (score: number, currentLevelId: number) => {
    const currentLevel = levels.find(level => level.id === currentLevelId);
    const nextLevel = levels.find(level => level.id === currentLevelId + 1);
    
    if (!currentLevel || !nextLevel) {
      // If at max level, show 100% completion
      return 100;
    }
    
    const progressInCurrentLevel = score - currentLevel.minScore;
    const totalPointsToNextLevel = nextLevel.minScore - currentLevel.minScore;
    
    return Math.min(100, Math.max(0, (progressInCurrentLevel / totalPointsToNextLevel) * 100));
  };

  // Get progress text for next level
  const getProgressText = (score: number, currentLevelId: number) => {
    const nextLevel = levels.find(level => level.id === currentLevelId + 1);
    
    if (!nextLevel) {
      return "Max level reached";
    }
    
    const pointsNeeded = nextLevel.minScore - score;
    return `Leveling Up | ${pointsNeeded} points needed to reach ${nextLevel.name}`;
  };

  // Debug logging
  console.log('Events debug:', { events, eventsLoading, eventsError, eventsLength: events.length });

  useEffect(() => {
    const storedResult = sessionStorage.getItem('maiven_quiz_result');
    if (storedResult) {
      try {
        setResult(JSON.parse(storedResult));
      } catch (error) {
        console.error('Error parsing quiz result:', error);
        // Fallback to Level 1
        setResult({
          score: 10,
          levelId: 1,
          levelName: 'Level 1',
          levelTitle: 'Curious',
          levelBlurb: levels[0].blurb,
          levelHubUrl: levels[0].hubUrl,
          archetype: archetypes[0],
          email: ''
        });
      }
    } else {
      // Fallback to Level 1 if no data
      setResult({
        score: 10,
        levelId: 1,
        levelName: 'Level 1',
        levelTitle: 'Curious',
        levelBlurb: levels[0].blurb,
        levelHubUrl: levels[0].hubUrl,
        archetype: archetypes[0],
        email: ''
      });
    }
  }, []);

  if (!result) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 id="result-heading" className="text-4xl font-bold text-foreground mb-6">
            {result.levelName}: {result.levelTitle}
          </h1>
          <div className="momentum-text p-6 rounded-lg mx-auto max-w-2xl">
            <p className="text-lg text-foreground">
              {momentumText}
            </p>
          </div>
        </div>

        {/* Results Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Level Results */}
          <div className="result-card p-8 rounded-xl">
            <div className="text-center mb-6">
              <div className="bg-accent w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary-foreground">
                  {result.levelId}
                </span>
              </div>
              <h2 className="text-2xl font-bold text-foreground mb-2">
                Your AI Readiness Level
              </h2>
              <div className="text-sm text-muted-foreground mb-4">
                Score: <span id="score" className="font-semibold">{result.score}/30</span>
              </div>
              <div className="mb-4">
                <div className="flex justify-between text-xs text-muted-foreground mb-2">
                  <span>{getProgressText(result.score, result.levelId)}</span>
                  <span>{Math.round(calculateProgressToNextLevel(result.score, result.levelId))}%</span>
                </div>
                <Progress 
                  value={calculateProgressToNextLevel(result.score, result.levelId)} 
                  className="h-2"
                />
              </div>
            </div>
            <div id="level-blurb" className="text-foreground leading-relaxed text-center">
              {result.levelBlurb.split('\n').map((line, index) => {
                if (line.trim().startsWith('•')) {
                  return (
                    <div key={index} className="flex items-start justify-start mb-2">
                      <span className="mr-2">•</span>
                      <span className="text-left">{line.trim().substring(1).trim()}</span>
                    </div>
                  );
                }
                return <p key={index} className="mb-2 text-left">{line}</p>;
              })}
            </div>
          </div>

          {/* Archetype Results */}
          <div className="card-elevated p-8 rounded-xl">
            <div className="text-center mb-6">
              <div className="w-20 h-20 bg-accent rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🎯</span>
              </div>
              <h2 id="arch-label" className="text-2xl font-bold text-foreground mb-2">
                {result.archetype.label}
              </h2>
            </div>
            <p id="arch-body" className="text-foreground leading-relaxed text-left">
              {result.archetype.body}
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="text-center space-y-4">
          <Button 
            id="level-cta"
            asChild
            className="bg-secondary text-secondary-foreground hover:bg-secondary-hover border-0 rounded-full text-lg px-8 py-6"
          >
            <a href={result.levelHubUrl}>
              Explore your {result.levelTitle} hub
              <ArrowRight className="ml-2 w-5 h-5" />
            </a>
          </Button>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Button variant="outline" asChild>
              <Link to="/quiz">
                <RotateCcw className="mr-2 w-4 h-4" />
                Retake Assessment
              </Link>
            </Button>
            
            <Button variant="secondary" asChild>
              <Link to="/">
                Back to Home
              </Link>
            </Button>
          </div>
        </div>

        {/* Upcoming Community Events */}
        {events.length > 0 && (
          <div className="mt-16">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-foreground mb-2">
                Upcoming Community Events
              </h3>
              <p className="text-muted-foreground">
                Join your fellow AI enthusiasts at these exclusive events
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {events.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
            <div className="text-center">
              <Button variant="outline" asChild>
                <a href="#" target="_blank" rel="noopener noreferrer">
                  Join the Community to Access the Events
                  <ArrowRight className="ml-2 w-4 h-4" />
                </a>
              </Button>
            </div>
          </div>
        )}

        {eventsLoading && (
          <div className="mt-16 text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
            <p className="text-muted-foreground mt-2">Loading upcoming events...</p>
          </div>
        )}

        {eventsError && (
          <div className="mt-16 text-center">
            <p className="text-muted-foreground">
              Unable to load community events at this time.
            </p>
          </div>
        )}

        {/* Additional Info */}
        <div className="mt-16 text-center">
          <div className="max-w-2xl mx-auto">
            <h3 className="text-xl font-semibold text-foreground mb-4">
              Ready to accelerate your AI journey?
            </h3>
            <p className="text-muted-foreground mb-6">
              Join thousands of women who are transforming their work and lives with AI. 
              Connect with your community and unlock your potential.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="outline">
                Join the Community
              </Button>
              <Button variant="ghost">
                Learn More About Maiven
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Results;