import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { QuizProgress } from '@/components/QuizProgress';
import { QuizOption } from '@/components/QuizOption';
import { quizQuestions, archetypes, levels } from '@/data/quizData';
import { QuizAnswers, QuizResult } from '@/types/quiz';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

export const Quiz = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<QuizAnswers>({});
  const [email, setEmail] = useState('');
  const [selectedArchetype, setSelectedArchetype] = useState('');

  // Check if running in iframe - multiple methods for debugging
  const isInIframe = window !== window.parent;
  const isInIframeAlt = window.self !== window.top;
  
  // Immediate console logs (these should show up right away)
  console.log('=== QUIZ DEBUG INFO ===');
  console.log('window !== window.parent:', window !== window.parent);
  console.log('window.self !== window.top:', window.self !== window.top);
  console.log('window.frameElement:', window.frameElement);
  console.log('isInIframe:', isInIframe);
  console.log('currentStep:', currentStep);

  // Send iframe height to parent for responsive sizing
  useEffect(() => {
    console.log('useEffect running - isInIframe:', isInIframe);
    
    // Send a test message immediately
    try {
      console.log('Attempting to send test message to parent...');
      window.parent.postMessage({
        type: 'TEST_MESSAGE',
        message: 'Quiz component mounted',
        timestamp: Date.now()
      }, '*');
      console.log('Test message sent successfully');
    } catch (error) {
      console.error('Error sending test message:', error);
    }

    if (!isInIframe) {
      console.log('Not in iframe, skipping height tracking');
      return;
    }

    console.log('Setting up iframe height communication');

    const sendHeight = () => {
      const height = document.documentElement.scrollHeight;
      console.log('Sending height to parent:', height);
      try {
        window.parent.postMessage({
          type: 'RESIZE_IFRAME',
          height: height
        }, '*');
        console.log('Height message sent successfully');
      } catch (error) {
        console.error('Error sending height message:', error);
      }
    };

    // Send initial height
    sendHeight();

    // Send height on resize
    const resizeObserver = new ResizeObserver(() => {
      console.log('Height changed, sending new height');
      sendHeight();
    });
    resizeObserver.observe(document.documentElement);

    // Force rebuild - deployment fix
    return () => resizeObserver.disconnect();
  }, [isInIframe, currentStep]);

  const totalSteps = quizQuestions.length + 2; // +1 for archetype, +1 for email
  const isLastQuizStep = currentStep === quizQuestions.length;
  const isEmailStep = currentStep === quizQuestions.length + 1;
  const canProceed = currentStep < quizQuestions.length 
    ? answers[quizQuestions[currentStep].id] 
    : isLastQuizStep 
      ? selectedArchetype 
      : email;

  const handleAnswer = (questionId: string, value: string) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }));
  };

  const handleNext = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      handleSubmit();
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const calculateScore = (): number => {
    return quizQuestions.reduce((total, question) => {
      const answer = answers[question.id];
      if (answer) {
        const option = question.options.find(opt => opt.value === answer);
        return total + (option?.points || 0);
      }
      return total;
    }, 0);
  };

  const getLevel = (score: number) => {
    return levels.find(level => score >= level.minScore && score <= level.maxScore) || levels[0];
  };

  const getArchetype = () => {
    return archetypes.find(arch => arch.key === selectedArchetype);
  };

  const handleSubmit = async () => {
    const score = calculateScore();
    const level = getLevel(score);
    const archetype = getArchetype();

    if (!archetype) return;

    const result: QuizResult = {
      score,
      levelId: level.id,
      levelName: level.name,
      levelTitle: level.title,
      levelBlurb: level.blurb,
      levelHubUrl: level.hubUrl,
      archetype,
      email
    };

    // Store in sessionStorage for immediate results page access
    sessionStorage.setItem('maiven_quiz_result', JSON.stringify(result));

    // Store in Supabase database
    try {
      const { error: supabaseError } = await supabase
        .from('quiz_results')
        .insert({
          score,
          level_id: level.id,
          level_name: level.name,
          level_title: level.title,
          level_blurb: level.blurb,
          level_hub_url: level.hubUrl,
          archetype_key: archetype.key,
          archetype_label: archetype.label,
          archetype_body: archetype.body,
          email,
          answers
        });

      if (supabaseError) {
        console.error('Error storing in Supabase:', supabaseError);
      } else {
        console.log('Successfully stored in Supabase database');
      }
    } catch (error) {
      console.error('Supabase storage failed:', error);
    }

    // Submit to Klaviyo
    try {
      const { data, error } = await supabase.functions.invoke('submit-to-klaviyo', {
        body: {
          email,
          score,
          level,
          archetype,
          answers
        }
      });

      if (error) {
        console.error('Error submitting to Klaviyo:', error);
      } else {
        console.log('Successfully submitted to Klaviyo:', data);
      }
    } catch (error) {
      console.error('Klaviyo submission failed:', error);
    }

    // Send message to parent window if in iframe
    if (isInIframe) {
      console.log('Sending quiz completion message to parent:', {
        type: 'QUIZ_COMPLETED',
        level: level.id,
        result: result
      });
      window.parent.postMessage({
        type: 'QUIZ_COMPLETED',
        level: level.id,
        result: result
      }, '*');
      return; // Don't navigate when in iframe, let parent handle it
    }

    // Redirect to results (only when not in iframe)
    navigate('/results');
  };

  const renderCurrentStep = () => {
    if (currentStep < quizQuestions.length) {
      const question = quizQuestions[currentStep];
      return (
        <div className="space-y-6">
          <div className="text-center">
        <h2 className="text-2xl font-medium text-foreground mb-4">
              {question.question}
            </h2>
          </div>
          <div className="space-y-4">
            {question.options.map((option) => (
              <QuizOption
                key={option.value}
                value={option.value}
                label={option.label}
                selected={answers[question.id] === option.value}
                onSelect={(value) => handleAnswer(question.id, value)}
                name={question.id}
              />
            ))}
          </div>
        </div>
      );
    }

    if (isLastQuizStep) {
      return (
        <div className="space-y-6">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-foreground mb-4">
              Which description feels most like you right now?
            </h2>
          </div>
          <div className="space-y-4">
            {archetypes.map((archetype) => (
              <QuizOption
                key={archetype.key}
                value={archetype.key}
                label={archetype.label}
                description={archetype.body}
                selected={selectedArchetype === archetype.key}
                onSelect={setSelectedArchetype}
                name="archetype"
              />
            ))}
          </div>
        </div>
      );
    }

    if (isEmailStep) {
      return (
        <div className="space-y-6">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-foreground mb-4">
              Get your personalized results
            </h2>
            <p className="text-muted-foreground">
              Enter your email to receive your AI readiness assessment and join the Maiven community.
            </p>
          </div>
          <div className="max-w-md mx-auto space-y-4">
            <div>
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="mt-2"
                required
              />
            </div>
          </div>
        </div>
      );
    }
  };

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="max-w-3xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="font-heading text-4xl text-foreground">Find Your AI Readiness Level</h1>
          <p className="text-muted-foreground mt-8 mb-8 text-lg">
            <strong>Take the Quiz to Find Your AI Readiness Level + Archetype.</strong>
            <br />
            Get personalized insights into your AI journey and connect with a community of growth-minded women transforming their work and lives.
          </p>
        </header>
        
        <QuizProgress 
          currentStep={currentStep + 1} 
          totalSteps={totalSteps}
          className="mb-8"
        />

        <div className="card-elevated rounded-xl p-8 mb-8">
          {renderCurrentStep()}
        </div>

        <div className="flex justify-between gap-4">
          <Button
            variant="outline"
            onClick={handleBack}
            disabled={currentStep === 0}
            className="flex items-center gap-2"
          >
            <ChevronLeft className="w-4 h-4" />
            Back
          </Button>

          <Button
            onClick={handleNext}
            disabled={!canProceed}
            className="bg-secondary text-secondary-foreground hover:bg-secondary-hover border-0 rounded-full flex items-center gap-2"
          >
            {isEmailStep ? 'Get Results' : 'Next'}
            {!isEmailStep && <ChevronRight className="w-4 h-4" />}
          </Button>
        </div>
      </div>
    </div>
  );
};